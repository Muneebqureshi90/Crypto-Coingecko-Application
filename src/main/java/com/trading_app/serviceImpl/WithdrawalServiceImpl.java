package com.trading_app.serviceImpl;

import com.trading_app.entity.User;
import com.trading_app.entity.Withdrawal;
import com.trading_app.domain.WithdrawalStatus;
import com.trading_app.repository.WithdrawalRepository;
import com.trading_app.service.WithdrawalService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WithdrawalServiceImpl implements WithdrawalService {

    @Autowired
    private WithdrawalRepository withdrawalRepository;

    @Override
    public Withdrawal requestWithdrawal(Long amount, User user) {
        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setAmount(amount);
        withdrawal.setUser(user);
        withdrawal.setStatus(WithdrawalStatus.PENDING);
        System.out.println("Withdrawal Status before save: " + withdrawal.getStatus());
        return withdrawalRepository.save(withdrawal);
    }

    @Override
    public Withdrawal procedWithWithdrawal(Long withdrawalId, boolean accept) {
        Optional<Withdrawal> withdrawal = withdrawalRepository.findById(withdrawalId);
        if (withdrawal.isEmpty()) {
            throw new EntityNotFoundException("Withdrawal with id " + withdrawalId + " not found");
        }
        Withdrawal with = withdrawal.get();
        with.setDate(LocalDateTime.now());
        if (accept) {
            with.setStatus(WithdrawalStatus.SUCCESS);
        } else {
            with.setStatus(WithdrawalStatus.PENDING);
        }
        return withdrawalRepository.save(with);
    }

    @Override
    public List<Withdrawal> getUserWithdrawalHistory(User user) {
        return withdrawalRepository.findByUserId(user.getId());
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequest() {
        return withdrawalRepository.findAll();
    }
}
