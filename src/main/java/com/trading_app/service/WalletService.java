package com.trading_app.service;

import com.trading_app.entity.Order;
import com.trading_app.entity.User;
import com.trading_app.entity.Wallet;

public interface WalletService {
    Wallet getUserWallet(User user);

    Wallet addBalance(Wallet wallet, Long amount);

    Wallet findWalletById(Long id);

    Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount);

    Wallet payOrderPayment(Order order, User user);
}
