package com.trading_app.controller;

import com.trading_app.entity.PaymentDetails;
import com.trading_app.entity.User;
import com.trading_app.entity.Wallet;
import com.trading_app.entity.Withdrawal;
import com.trading_app.service.PaymentDetailsService;
import com.trading_app.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "scheme1")
@CrossOrigin(origins = "*")

@Tag(name = "Address Controller", description = "This is Address Controller")
public class PaymentDetailController {
    @Autowired
    private PaymentDetailsService paymentDetailsService;
    @Autowired
    private UserService userService;

    @PostMapping("/payment-details")
    ResponseEntity<?> addPayment(@RequestBody PaymentDetails request, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        PaymentDetails paymentDetails = paymentDetailsService.addPaymentDetails(request.getAccountNumber(),
                request.getAccountHolderName(),
                request.getIfsc(),
                request.getBankName(), user);
        return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
    }
    @GetMapping("/payment-details")
    ResponseEntity<PaymentDetails> getUserPaymentDetails( @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        PaymentDetails paymentDetails = paymentDetailsService.getUserPaymentDetails(user);
        return new ResponseEntity<>(paymentDetails, HttpStatus.OK);
    }


}
