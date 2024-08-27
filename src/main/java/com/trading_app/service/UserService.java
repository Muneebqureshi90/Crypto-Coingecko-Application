package com.trading_app.service;

import com.trading_app.entity.User;
import com.trading_app.domain.VerificationType;

public interface UserService {
    User findUserProfileByJwt(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;

    User findUserById(Long userId) throws Exception;

    User enableTwoFactorAuthentication(VerificationType verificationType,String sendTo, User user);

    User updatePassword(User user, String newPassword);
}
