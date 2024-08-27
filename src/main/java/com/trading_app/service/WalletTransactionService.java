package com.trading_app.service;

import com.trading_app.domain.WalletTransactionType;
import com.trading_app.entity.Wallet;
import com.trading_app.entity.WalletTransaction;

import java.util.List;

public interface WalletTransactionService {

    List<WalletTransaction> getTransactionByWallet(Wallet wallet);
    WalletTransaction createTransaction(Wallet wallet, WalletTransactionType type, String transferId, String purpose, Long amount);

}
