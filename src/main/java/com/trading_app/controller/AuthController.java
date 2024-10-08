package com.trading_app.controller;

import com.trading_app.domain.VerificationType;
import com.trading_app.entity.*;
import com.trading_app.request.ForgetPasswordTokenRequest;
import com.trading_app.repository.UserRepository;
import com.trading_app.request.ResetPasswordRequest;
import com.trading_app.response.ApiResponse;
import com.trading_app.security.JwtProvider;
import com.trading_app.response.AuthResponse;
import com.trading_app.service.*;
import com.trading_app.utils.OTPUtils;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@SecurityRequirement(name = "scheme1")
@CrossOrigin(origins = "*")

@Tag(name = "Address Controller", description = "This is Address Controller")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private TwoFactorOTPService twoFactorOTPService;

    private String jwt;

    @Autowired
    private VerificationCodeService verificationCodeService;
    @Autowired
    private ImageService imageService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @Autowired
    private ForgetPasswordService forgetPasswordService;
    @Autowired
    private WatchlistService watchlistService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> registerUser( @RequestBody User user) throws Exception {


        User isExistByEmail = userRepository.findByEmail(user.getEmail());
        if (isExistByEmail != null) {
            throw new Exception("Email Already Exist");
        }
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        newUser.setFullName(user.getFullName());
        newUser.setPostalCode(user.getPostalCode());
        newUser.setCity(user.getCity());
        newUser.setAddress(user.getAddress());
        newUser.setCountry(user.getCountry());
        newUser.setNationality(user.getNationality());
        newUser.setDateOfBirth(user.getDateOfBirth());

        String defaultImagePath = "default.jpeg";
        newUser.setProfileImage(defaultImagePath);
        User savedUser = userRepository.save(newUser);

        watchlistService.createWatchlist(savedUser);
        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("Register Success");
        res.setUserId(String.valueOf(savedUser.getId())); // Convert long to String

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/user/{userId}/upload-image")
    public ResponseEntity<String> uploadUserImage(@PathVariable long userId, @RequestParam("file") MultipartFile file) {
        try {
            String fileName = imageService.uploadImage(file);
            userService.updateUserProfileImage(userId, fileName);
            return ResponseEntity.status(HttpStatus.OK).body("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload image: " + e.getMessage());
        }
    }
    @GetMapping("/user/{userId}/image")
    public ResponseEntity<byte[]> getUserImage(@PathVariable Long userId) {
        try {
            String imagePath = userService.getUserProfileImage(userId);
            byte[] imageBytes = imageService.getImage(imagePath);

            // Determine content type based on file extension
            String contentType = getContentType(imagePath);

            return ResponseEntity.ok()
                    .header("Content-Type", contentType) // Adjust content type based on your image type
                    .body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Image not found".getBytes()); // Respond with NOT_FOUND if the image isn't found
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private String getContentType(String imagePath) {
        if (imagePath.endsWith(".png")) {
            return "image/png";
        } else if (imagePath.endsWith(".jpg") || imagePath.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (imagePath.endsWith(".gif")) {
            return "image/gif";
        } else {
            return "application/octet-stream"; // Default content type
        }
    }



    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {

        String username = user.getEmail();
        String password = user.getPassword();

        Authentication auth = authenticated(username, password);
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        User authUser = userRepository.findByEmail(username);
        if (user.getTwoFactorAuth().isEnabled()) {
            AuthResponse res = new AuthResponse();
            res.setMessage("Two factor auth enabled");
            res.setTwoFactorAuthEnabled(true);
            String otp = OTPUtils.generateOTP();

            TwoFactorOTP oldTwoFactorOTP = twoFactorOTPService.findByUser(authUser.getId()); // Fixed line
            if (oldTwoFactorOTP != null) {
                twoFactorOTPService.deleteTwoFactorOTP(oldTwoFactorOTP);
            }

            TwoFactorOTP newTwoFactorOTP = twoFactorOTPService.createTwoFactorOTP(authUser, otp, jwt);
            emailService.sendVerficationOtpEmail(username, otp);
            res.setSession(newTwoFactorOTP.getId());

            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("Login Success");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    private Authentication authenticated(String username, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        if (username == null) {
            throw new BadCredentialsException("User not found || invalid user");
        }
        if (!password.equals(userDetails.getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifySignOtp(@PathVariable String otp, @RequestParam String id) throws Exception {

        TwoFactorOTP twoFactorOTP = twoFactorOTPService.findById(id);
        if (twoFactorOTPService.verifyTwoFactorOTP(twoFactorOTP, otp)) {

            AuthResponse res = new AuthResponse();
            res.setMessage("Two factor auth verified");
            res.setTwoFactorAuthEnabled(true);
            res.setJwt(twoFactorOTP.getJwt());
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        throw new Exception("Invalid OTP");
    }

    @PostMapping("/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgetPasswordOtp(

            @RequestBody ForgetPasswordTokenRequest request
    ) throws Exception {
        try {

            User user = userService.findUserByEmail(request.getSendTo());
            String otp = OTPUtils.generateOTP();
            UUID uuid = UUID.randomUUID();
            String id = uuid.toString();

            ForgetPasswordToken token = forgetPasswordService.findByUser(user.getId());
            if (token != null) {
                token = forgetPasswordService.createToken(user, id, otp, request.getVerificationType(), request.getSendTo());
            }
            if (request.getVerificationType().equals(VerificationType.EMAIL)) {
                emailService.sendVerficationOtpEmail(user.getEmail(), token.getOtp());
            }
            AuthResponse res = new AuthResponse();
            res.setSession(token.getId().toString());
            res.setMessage("Reset Password Success");

            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PatchMapping("/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(@RequestParam Long id, @RequestBody ResetPasswordRequest req, @RequestHeader("Authorization") String jwt


    ) {
        try {
            ForgetPasswordToken forgetPasswordToken = forgetPasswordService.findById(id);

            boolean isVerified = forgetPasswordToken.getOtp().equals(req.getOtp());
            if (isVerified) {
                userService.updatePassword(forgetPasswordToken.getUser(), req.getPassword());
                ApiResponse res = new ApiResponse();
                res.setMessage("password is updated successfully");
                return new ResponseEntity<>(res, HttpStatus.OK);
            }

            throw new Exception("Wrong Otp");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
