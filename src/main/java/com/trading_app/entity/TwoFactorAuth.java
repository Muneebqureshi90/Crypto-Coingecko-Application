package com.trading_app.entity;

import com.trading_app.domain.VerificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TwoFactorAuth {
    private boolean isEnabled = false;
    private VerificationType sendTo;
}
