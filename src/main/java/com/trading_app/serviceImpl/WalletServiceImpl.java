package com.trading_app.serviceImpl;

import com.trading_app.domain.WalletTransactionType;
import com.trading_app.entity.Order;
import com.trading_app.domain.OrderType;
import com.trading_app.entity.User;
import com.trading_app.entity.Wallet;
import com.trading_app.repository.WalletRepository;
import com.trading_app.service.WalletService;
import com.trading_app.service.WalletTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class WalletServiceImpl implements WalletService {
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private WalletTransactionService walletTransactionService;

    @Override
    public Wallet getUserWallet(User user) {
        Wallet wallet = walletRepository.findByUserId(user.getId());
        if (wallet == null) {
            wallet = new Wallet();
            wallet.setUser(user);
            walletRepository.save(wallet);
        }


        return wallet;
    }

    @Override
    public Wallet addBalance(Wallet wallet, Long amount) {
        BigDecimal balance = wallet.getBalance();
        BigDecimal newBalance = balance.add(BigDecimal.valueOf(amount));

        wallet.setBalance(newBalance);

        return walletRepository.save(wallet);
    }

    @Override
    public Wallet findWalletById(Long id) {
        // Find and return the wallet by its ID
        return walletRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Wallet not found for ID: " + id));
    }


    @Override
    public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) {
        Wallet senderWallet = getUserWallet(sender);
        if (senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new RuntimeException("Insufficient funds");
        }
        BigDecimal balance = senderWallet.getBalance().subtract(BigDecimal.valueOf(amount));
        senderWallet.setBalance(balance);
        walletRepository.save(senderWallet);

        BigDecimal receiverBalance = receiverWallet.getBalance().add(BigDecimal.valueOf(amount));
        receiverWallet.setBalance(receiverBalance);
        walletRepository.save(receiverWallet);
        // Create and save the transaction
        String transferId = UUID.randomUUID().toString(); // Generate transfer ID
        walletTransactionService.createTransaction(senderWallet, WalletTransactionType.WITHDRAWAL, transferId, "bank amount withdrawal", amount);
        walletTransactionService.createTransaction(receiverWallet, WalletTransactionType.ADD_MONEY, transferId, "bank amount Add Balance", amount);

        return senderWallet;
    }

    @Override
    public Wallet payOrderPayment(Order order, User user) {
        // Retrieve user's wallet
        Wallet wallet = getUserWallet(user);

        // Check if the wallet has enough balance
        if (order.getOrderType().equals(OrderType.BUY)) {
            BigDecimal newBalance = wallet.getBalance().subtract(order.getPrice());
            if (newBalance.compareTo(order.getPrice()) < 0) {
                throw new RuntimeException("Insufficient funds for the transaction");
            }
            wallet.setBalance(newBalance);
        } else {
            BigDecimal bigDecimal = wallet.getBalance().add(order.getPrice());
            wallet.setBalance(bigDecimal);
        }

        // Deduct amount for order payment
        walletRepository.save(wallet);
        return wallet;
    }
}
