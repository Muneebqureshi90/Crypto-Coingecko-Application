package com.trading_app.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.trading_app.domain.USER_ROLE;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String fullName;
    private String email;
    private String nationality;
    private String address;
    private String city;
    private String postalCode;
    private String country;
    private String profileImage;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;
    @Embedded
    private TwoFactorAuth twoFactorAuth = new TwoFactorAuth();

}
