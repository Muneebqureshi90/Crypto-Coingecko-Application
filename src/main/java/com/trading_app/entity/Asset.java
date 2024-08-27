package com.trading_app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double buyPrice;
    private double quantity;
    @ManyToOne
    private Coin coin;
    @ManyToOne
    private User user;

}
