package com.trading_app.service;

import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.trading_app.entity.PaymentApiIntegra.PaymentMethod;
import com.trading_app.entity.PaymentApiIntegra.PaymentOrder;
import com.trading_app.entity.User;
import com.trading_app.response.PaymentOrderResponce;

public interface PaymentOrderService {
    PaymentOrder createPaymentOrder(User user, Long amount,
                                    PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException, StripeException;

    PaymentOrderResponce createRazorpayPaymentLing(User user, Long amount);

    PaymentOrderResponce createStripePaymentLing(User user, Long amount, Long orderId) throws Exception;
}
