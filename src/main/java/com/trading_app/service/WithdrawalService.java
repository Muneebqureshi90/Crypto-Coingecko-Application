package com.trading_app.service;

import com.trading_app.entity.User;
import com.trading_app.entity.Withdrawal;

import java.util.List;

public interface WithdrawalService {

    Withdrawal requestWithdrawal(Long amount, User user);
    Withdrawal procedWithWithdrawal(Long withdrawalId, boolean accept);
    List<Withdrawal> getUserWithdrawalHistory(User user);
    List<Withdrawal> getAllWithdrawalRequest();
}
