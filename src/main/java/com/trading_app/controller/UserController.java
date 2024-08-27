package com.trading_app.controller;

import com.trading_app.entity.User;
import com.trading_app.entity.VerificationCode;
import com.trading_app.domain.VerificationType;
import com.trading_app.service.EmailService;
import com.trading_app.service.UserService;
import com.trading_app.service.VerificationCodeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@SecurityRequirement(name = "scheme1")
@CrossOrigin(origins = "*")

@Tag(name = "Address Controller", description = "This is Address Controller")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;
    private String jwt;
    @Autowired
    private VerificationCodeService verificationCodeService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.findUserProfileByJwt(jwt);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        try {
            User user = userService.findUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{userId}/details")
    public ResponseEntity<User> getUserDetailsById(@PathVariable Long userId) {
        try {
            User user = userService.findUserById(userId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(
            @RequestHeader("Authorization") String jwt,
            @PathVariable VerificationType verificationType
    ) throws Exception {
        try {

            User user = userService.findUserProfileByJwt(jwt);
            VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());
            if (verificationCode == null) {
                verificationCodeService.sendVerificationCode(user, verificationType);
            }
            if (verificationType.equals(VerificationType.EMAIL)) {
                emailService.sendVerficationOtpEmail(user.getEmail(), verificationCode.getOtp());
            }
            return new ResponseEntity<>("verification code sent successfully", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PatchMapping("/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuth(@PathVariable String otp, @RequestHeader("Authorization") String jwt
    ) {
        try {
            User user = userService.findUserProfileByJwt(jwt);
            VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());
            String actualSendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL) ?
                    verificationCode.getEmail() : verificationCode.getMobile();

            boolean isVerified = verificationCode.getOtp().equals(actualSendTo);
            if (isVerified) {
                User updateUser = userService.enableTwoFactorAuthentication(verificationCode.getVerificationType(), actualSendTo, user);
                verificationCodeService.deleteVerificationCodeById(verificationCode);
                return new ResponseEntity<>(updateUser, HttpStatus.OK);
            }

            throw new Exception("Wrong Otp");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{userId}/update-password")
    public ResponseEntity<String> updatePassword(
            @PathVariable Long userId,
            @RequestParam("newPassword") String newPassword) {
        try {
            User user = userService.findUserById(userId);
            userService.updatePassword(user, newPassword);
            emailService.sendPasswordUpdateEmail(user.getEmail());
            return ResponseEntity.ok("Password updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating password");
        }
    }

}
