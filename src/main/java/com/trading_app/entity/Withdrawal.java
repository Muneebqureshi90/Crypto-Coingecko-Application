package com.trading_app.entity;

import com.trading_app.domain.WithdrawalStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Withdrawal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private WithdrawalStatus status;
    private Long amount;
    @ManyToOne
    private User user;
    private LocalDateTime date = LocalDateTime.now();
}
