package com.trading_app.service;

import com.trading_app.entity.ForgetPasswordToken;
import com.trading_app.entity.User;
import com.trading_app.domain.VerificationType;

public interface ForgetPasswordService {
    ForgetPasswordToken createToken(User user,
                                    String id, String otp, VerificationType verificationType,
                                    String sendTo);

    ForgetPasswordToken findById(Long id);

    ForgetPasswordToken findByUser(Long userId);

    void deleteToken(ForgetPasswordToken token);

}
