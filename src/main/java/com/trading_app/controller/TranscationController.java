package com.trading_app.controller;

import com.trading_app.entity.User;
import com.trading_app.entity.Wallet;
import com.trading_app.entity.WalletTransaction;
import com.trading_app.service.UserService;
import com.trading_app.service.WalletService;
import com.trading_app.service.WalletTransactionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "scheme1")
@CrossOrigin(origins = "*")

@Tag(name = "Address Controller", description = "This is Address Controller")
public class TranscationController {

    @Autowired
    private WalletService walletService;
    @Autowired
    private UserService userService;
    @Autowired
    private WalletTransactionService walletTransactionService;

    @GetMapping("/transactions")
    ResponseEntity<List<WalletTransaction>> getUserWallets(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        List<WalletTransaction> transactions = walletTransactionService.getTransactionByWallet(wallet);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

}

