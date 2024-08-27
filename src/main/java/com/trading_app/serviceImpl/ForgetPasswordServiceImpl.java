package com.trading_app.serviceImpl;

import com.trading_app.entity.ForgetPasswordToken;
import com.trading_app.entity.User;
import com.trading_app.domain.VerificationType;
import com.trading_app.repository.ForgetPasswordRepository;
import com.trading_app.service.ForgetPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForgetPasswordServiceImpl implements ForgetPasswordService {
    @Autowired
    private ForgetPasswordRepository forgetPasswordRepository;


    @Override
    public ForgetPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo) {
        ForgetPasswordToken token = new ForgetPasswordToken();
        token.setUser(user);
        token.setSendTo(sendTo);
        token.setVerificationType(verificationType);
        token.setOtp(otp);
        return forgetPasswordRepository.save(token);
    }

    @Override
    public ForgetPasswordToken findById(Long id) {
        Optional<ForgetPasswordToken> token = forgetPasswordRepository.findById(id);
        return token.orElse(null);

    }

    @Override
    public ForgetPasswordToken findByUser(Long userId) {
        return forgetPasswordRepository.findByUserId(userId);
    }

    @Override
    public void deleteToken(ForgetPasswordToken token) {
        forgetPasswordRepository.delete(token);
    }
}
