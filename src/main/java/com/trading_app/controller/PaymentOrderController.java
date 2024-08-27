package com.trading_app.controller;

import com.trading_app.entity.PaymentApiIntegra.PaymentMethod;
import com.trading_app.entity.PaymentApiIntegra.PaymentOrder;
import com.trading_app.entity.User;
import com.trading_app.response.PaymentOrderResponce;
import com.trading_app.service.PaymentOrderService;
import com.trading_app.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.json.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "scheme1")
@CrossOrigin(origins = "*")

@Tag(name = "Address Controller", description = "This is Address Controller")
public class PaymentOrderController {
    @Autowired
    private UserService userService;
    @Autowired
    private PaymentOrderService paymentOrderService;

    @PostMapping("/payment/{paymentMethod}/amount/{amount}")
    ResponseEntity<PaymentOrderResponce> paymentHandler(
            @PathVariable PaymentMethod paymentMethod,
            @PathVariable Long amount,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        PaymentOrderResponce paymentOrderResponce;
        PaymentOrder order = paymentOrderService.createPaymentOrder(user, amount, paymentMethod);

        if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
            paymentOrderResponce = paymentOrderService.createRazorpayPaymentLing(user, amount);
        } else {
            paymentOrderResponce = paymentOrderService.createStripePaymentLing(user, amount, order.getId());
        }
        return new ResponseEntity<>(paymentOrderResponce, HttpStatus.CREATED);
    }

}
