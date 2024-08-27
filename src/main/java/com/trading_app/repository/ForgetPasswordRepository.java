package com.trading_app.repository;

import com.trading_app.entity.ForgetPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForgetPasswordRepository extends JpaRepository<ForgetPasswordToken, Long> {
    ForgetPasswordToken findByUserId(Long userId);
}
