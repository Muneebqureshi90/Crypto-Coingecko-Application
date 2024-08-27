package com.trading_app.serviceImpl;

import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.trading_app.entity.PaymentApiIntegra.PaymentMethod;
import com.trading_app.entity.PaymentApiIntegra.PaymentOrder;
import com.trading_app.entity.PaymentApiIntegra.PaymentOrderStatus;
import com.trading_app.entity.User;
import com.trading_app.repository.PaymentOrderRepository;
import com.trading_app.response.PaymentOrderResponce;
import com.trading_app.service.PaymentOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentOrderServiceImpl implements PaymentOrderService {
    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    //    stripe data or keys
    @Value("${stripe.api.key}")
    private String stripeSecreteKey;
    //    razorpay
//    @Value("${razorpay.api.key}")
//    private String apiKey;
//    @Value("${razorpay.api.secret}")
//    private String apiSecretKey;

    @Override
    public PaymentOrder createPaymentOrder(User user, Long amount, PaymentMethod paymentMethod) {

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setUser(user);
        paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.PENDING);
        return paymentOrderRepository.save(paymentOrder);
    }

    //    used in wallet controller
    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        return paymentOrderRepository.findById(id).orElseThrow(() -> new Exception("Order Payment not found"));
    }
/*
    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException, StripeException {
        if (paymentOrder.getPaymentOrderStatus() == null) {
            paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.PENDING);
        }
        if (paymentOrder.getPaymentOrderStatus().equals(PaymentOrderStatus.PENDING)) {
//            RAZORPAY
//            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
//                RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecretKey);
//                Payment razorPay = razorpayClient.payments.fetch(paymentId);
//                Integer amount = razorPay.get("amount");
//                String status = razorPay.get("status");
//                if (status.equals("captured")) {
//                    paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
//                    return true;
//                }
//                paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.FAILED);
//                paymentOrderRepository.save(paymentOrder);
//                return false;
//            }
            // Stripe Payment Handling
//            else if (paymentOrder.getPaymentMethod().equals(PaymentMethod.STRIPE)) {
            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.STRIPE)) {
                PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentId);
                String status = paymentIntent.getStatus();

                if (status.equals("succeeded")) {
                    paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
                } else {
                    paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.FAILED);
                }

                paymentOrderRepository.save(paymentOrder);
                return status.equals("succeeded");
            }

            paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
            paymentOrderRepository.save(paymentOrder);
            return true;
        }
        return false;
    }
    */
@Override
public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException, StripeException {
    if (paymentOrder.getPaymentOrderStatus() == null) {
        paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.PENDING);
    }

    if (paymentOrder.getPaymentOrderStatus().equals(PaymentOrderStatus.PENDING)) {
        // RAZORPAY
        // Uncomment and update if Razorpay handling is required
        /*
        if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
            RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecretKey);
            Payment razorPay = razorpayClient.payments.fetch(paymentId);
            Integer amount = razorPay.get("amount");
            String status = razorPay.get("status");
            if (status.equals("captured")) {
                paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }
            paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.FAILED);
            paymentOrderRepository.save(paymentOrder);
            return false;
        }
        */

        // Stripe Payment Handling
        if (paymentOrder.getPaymentMethod().equals(PaymentMethod.STRIPE)) {
            try {
                PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentId);
                String status = paymentIntent.getStatus();

                if ("succeeded".equals(status)) {
                    paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
                } else {
                    paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.FAILED);
                }

                paymentOrderRepository.save(paymentOrder);
                return "succeeded".equals(status);
            } catch (StripeException e) {
                // Handle Stripe exception and log it
                e.printStackTrace();
                paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.FAILED);
                paymentOrderRepository.save(paymentOrder);
                throw e; // Optionally, rethrow the exception or handle it as needed
            }
        } else {
            // Handle other payment methods if necessary
            paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
            paymentOrderRepository.save(paymentOrder);
            return true;
        }
    }

    return false;
}



    @Override
    public PaymentOrderResponce createRazorpayPaymentLing(User user, Long amount) {
        Long Amount = amount * 100;
        return null;
    }

    @Override
    public PaymentOrderResponce createStripePaymentLing(User user, Long amount, Long orderId) throws Exception {

        Stripe.apiKey = stripeSecreteKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5174/wallet?order_id=" + orderId + "&payment_id={CHECKOUT_SESSION_ID}")
//                .setSuccessUrl("http://localhost:5174/wallet?order_id=" + orderId)
                .setCancelUrl("http://localhost:5174/payment/cancel")
//                .setCancelUrl("http://localhost:5173/payment/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount * 100)  // Ensure amount is in cents
                                .setProductData(SessionCreateParams
                                        .LineItem
                                        .PriceData
                                        .ProductData
                                        .builder()
                                        .setName("Top up wallet")
                                        .build()
                                ).build()
                        ).build()
                )
                .build();

//        Session session = Session.create(params);
//        System.out.println("----session-----" + session);
//        // Retrieve payment_intent ID from the session
//        PaymentOrderResponce paymentOrderResponce = new PaymentOrderResponce();
//        paymentOrderResponce.setPayment_url(session.getUrl());

        Session session = Session.create(params);
        System.out.println("----session-----" + session);

// Retrieve payment_intent ID from the session
        String paymentIntentId = session.getPaymentIntent();
        if (paymentIntentId == null || paymentIntentId.isEmpty()) {
            throw new Exception("PaymentIntent ID is null or empty.");
        }

        PaymentOrderResponce paymentOrderResponce = new PaymentOrderResponce();
        paymentOrderResponce.setPayment_url(session.getUrl());
        paymentOrderResponce.setPaymentId(paymentIntentId);  // Set the PaymentIntent ID in response

// Log the payment ID for debugging
        System.out.println("Processing payment with ID: " + paymentIntentId);

        return paymentOrderResponce;

    }
}
