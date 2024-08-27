package com.trading_app.entity;

import com.trading_app.domain.VerificationType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VerificationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String otp;
    @OneToOne
    private User user;
    private String mobile;
    private String email;

    private VerificationType verificationType;

}
