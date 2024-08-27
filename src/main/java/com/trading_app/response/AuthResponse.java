package com.trading_app.response;

import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private Boolean status;
    private String message;
    private boolean isTwoFactorAuthEnabled;
    private String session;
}
