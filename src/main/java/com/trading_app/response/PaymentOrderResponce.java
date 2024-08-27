package com.trading_app.response;

import lombok.Data;

@Data
public class PaymentOrderResponce {
private String payment_url;
    private String paymentId;  // Add this field

}
