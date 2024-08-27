package com.trading_app.serviceImpl;

import com.trading_app.entity.User;
import com.trading_app.entity.VerificationCode;
import com.trading_app.domain.VerificationType;
import com.trading_app.repository.VerificationCodeRepository;
import com.trading_app.service.VerificationCodeService;
import com.trading_app.utils.OTPUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService {
    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    @Override
    public VerificationCode sendVerificationCode(User user, VerificationType verificationType) {
        VerificationCode verificationCode1 = new VerificationCode();
        verificationCode1.setOtp(OTPUtils.generateOTP());
        verificationCode1.setVerificationType(verificationType);
        verificationCode1.setUser(user);

        return verificationCodeRepository.save(verificationCode1);
    }

    @Override
    public VerificationCode getVerificationCodeById(Long id) throws Exception {
        Optional<VerificationCode> verificationCodeOptional = verificationCodeRepository.findById(id);
        if (verificationCodeOptional.isPresent()) {
            return verificationCodeOptional.get();
        }
        throw new Exception("Verification is code is failed");
    }

    @Override
    public VerificationCode getVerificationCodeByUser(Long userId) {
        return verificationCodeRepository.findByUserId(userId);
    }

    @Override
    public void deleteVerificationCodeById(VerificationCode verificationCode) {
        verificationCodeRepository.delete(verificationCode);
    }

    @Override
    public Boolean verifyOtp(String otp, VerificationCode verificationCode) {
        return null;
    }
}
