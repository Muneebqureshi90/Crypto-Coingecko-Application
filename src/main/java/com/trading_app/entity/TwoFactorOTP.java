package com.trading_app.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TwoFactorOTP {
    @Id
    public String id;
    public String otp;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToOne
    public User user;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String jwt;
}
