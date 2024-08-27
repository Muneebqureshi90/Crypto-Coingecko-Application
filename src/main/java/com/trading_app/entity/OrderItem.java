package com.trading_app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double buyPrice;
    private double sellPrice;
    private double quantity;
    @ManyToOne
    private Coin coin;
    @JsonIgnore
    @OneToOne
    private Order order;
}
