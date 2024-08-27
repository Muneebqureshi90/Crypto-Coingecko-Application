package com.trading_app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Roi {
    @JsonProperty("times")
    private double times;

    @JsonProperty("currency")
    private String currency;

    @JsonProperty("percentage")
    private double percentage;
}
