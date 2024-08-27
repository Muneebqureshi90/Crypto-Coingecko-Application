package com.trading_app.request;

import com.trading_app.domain.VerificationType;
import lombok.Data;

@Data
public class ForgetPasswordTokenRequest {
    private String sendTo;

    private VerificationType verificationType;
}
