package com.trading_app.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.trading_app.entity.Order;
import com.trading_app.entity.PaymentApiIntegra.PaymentOrder;
import com.trading_app.entity.User;
import com.trading_app.entity.Wallet;
import com.trading_app.entity.WalletTransaction;
import com.trading_app.response.PaymentOrderResponce;
import com.trading_app.service.OrderService;
import com.trading_app.service.PaymentOrderService;
import com.trading_app.service.UserService;
import com.trading_app.service.WalletService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/wallet")
@SecurityRequirement(name = "scheme1")
@CrossOrigin(origins = "*")
@Tag(name = "Wallet Controller", description = "This is Wallet Controller")

public class WalletController {
    @Autowired
    private WalletService walletService;
    @Autowired
    private UserService userService;
    @Autowired
    private PaymentOrderService paymentOrderService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/")
    ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PreAuthorize("hasRole('USER') or hasAuthority('TRANSFER_PRIVILEGE')")
    @PutMapping("/transfer/{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransfer(@RequestHeader("Authorization") String jwt, @PathVariable Long walletId, @RequestBody WalletTransaction walletTransaction) throws Exception {
        User senderUser = userService.findUserProfileByJwt(jwt);

        if (senderUser == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); // Return 403 Forbidden if user is not found
        }
        Wallet receiverWallet = walletService.findWalletById(walletId);
        if (receiverWallet == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 Not Found if receiver wallet is not found
        }
        Wallet wallet = walletService.walletToWalletTransfer(senderUser, receiverWallet, walletTransaction.getAmount());
        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PutMapping("/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(@RequestHeader("Authorization") String jwt, @PathVariable Long orderId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.findOrderById(orderId);
        Wallet wallet = walletService.payOrderPayment(order, user);
        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    //    using with payment getway of stripe
    @PutMapping("/deposit")
    public ResponseEntity<Wallet> addBalanceToWallet(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(name = "order_id") Long orderId,
            @RequestParam(name = "payment_id") String paymentId) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        PaymentOrder order = paymentOrderService.getPaymentOrderById(orderId);

        // Validate payment_id before proceeding
        if (paymentId == null || paymentId.isEmpty() || "0".equals(paymentId)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 Bad Request if payment_id is invalid
        }

        Boolean status = paymentOrderService.ProceedPaymentOrder(order, paymentId);

        if (wallet.getBalance() == null) {
            wallet.setBalance(BigDecimal.valueOf(0));
        }

        if (status) {
            wallet = walletService.addBalance(wallet, order.getAmount());
        }

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

//    @PutMapping("/deposit")
//    public ResponseEntity<Wallet> addBalanceToWallet(
//            @RequestHeader("Authorization") String jwt,
//            @RequestParam(name = "order_id") Long orderId,
//            @RequestParam(name = "session_id") String sessionId) throws Exception {
//
//        // Retrieve the Session from Stripe
//        Session session;
//        try {
//            session = Session.retrieve(sessionId);
//        } catch (StripeException e) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 Bad Request if session retrieval fails
//        }
//
//        if (session == null || session.getPaymentIntent() == null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 Bad Request if session or paymentIntent is missing
//        }
//
//        String paymentIntentId = session.getPaymentIntent();
//
//        // Retrieve PaymentIntent from Stripe
//        PaymentIntent paymentIntent;
//        try {
//            paymentIntent = PaymentIntent.retrieve(paymentIntentId);
//        } catch (StripeException e) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 Bad Request if paymentIntent retrieval fails
//        }
//
////        if (paymentIntent == null || !PaymentIntent.s.Succeeded.equals(paymentIntent.getStatus())) {
////            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 Bad Request if payment is not successful
////        }
//
//        User user = userService.findUserProfileByJwt(jwt);
//        Wallet wallet = walletService.getUserWallet(user);
//        PaymentOrder order = paymentOrderService.getPaymentOrderById(orderId);
//
//        if (wallet.getBalance() == null) {
//            wallet.setBalance(BigDecimal.valueOf(0));
//        }
//
//        Boolean status = paymentOrderService.ProceedPaymentOrder(order, paymentIntentId);
//
//        if (status) {
//            wallet = walletService.addBalance(wallet, order.getAmount());
//        }
//
//        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
//    }
}
