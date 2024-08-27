package com.trading_app.utils;

import java.util.Random;

public class OTPUtils {

    public static String generateOTP() {
        int otpLength = 6; // length of the OTP
        Random rand = new Random();
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < otpLength; i++) {
            otp.append(rand.nextInt(10));
        }

        return otp.toString();
    }
}
