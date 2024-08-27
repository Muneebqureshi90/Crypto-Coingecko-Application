package com.trading_app.entity.PaymentApiIntegra;

import com.trading_app.entity.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long amount;
    private PaymentOrderStatus paymentOrderStatus;
    private PaymentMethod paymentMethod;
    @ManyToOne
    private User user;
}
