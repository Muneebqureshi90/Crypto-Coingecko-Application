package com.trading_app.service;

import com.trading_app.entity.User;
import com.trading_app.entity.VerificationCode;
import com.trading_app.domain.VerificationType;

public interface VerificationCodeService {
    VerificationCode sendVerificationCode(User user, VerificationType verificationType);

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUser(Long userId);

    void deleteVerificationCodeById(VerificationCode verificationCode);

    Boolean verifyOtp(String otp, VerificationCode verificationCode);
}
