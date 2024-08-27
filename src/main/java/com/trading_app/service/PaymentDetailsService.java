package com.trading_app.service;

import com.trading_app.entity.PaymentDetails;
import com.trading_app.entity.User;

public interface PaymentDetailsService {
    PaymentDetails addPaymentDetails(String accountNumber,
                                     String accountHolderName,
                                     String ifsc,
                                     String bankName,
                                     User user);
    PaymentDetails getUserPaymentDetails(User user);
}
