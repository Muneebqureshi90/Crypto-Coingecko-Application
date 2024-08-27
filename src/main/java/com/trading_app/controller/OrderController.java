package com.trading_app.controller;

import com.trading_app.domain.OrderType;
import com.trading_app.entity.*;
import com.trading_app.request.CreateOrderRequest;
import com.trading_app.service.CoinService;
import com.trading_app.service.OrderService;
import com.trading_app.service.UserService;
import com.trading_app.service.WalletTransactionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@SecurityRequirement(name = "scheme1")
@CrossOrigin(origins = "*")

@Tag(name = "Address Controller", description = "This is Address Controller")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private CoinService coinService;
    @Autowired
    private WalletTransactionService walletTransactionService;


    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(@RequestHeader("Authorization") String jwt, @RequestBody CreateOrderRequest req) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(req.getCoinId());

        Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);

        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@RequestHeader("Authorization") String jwt, @PathVariable long orderId) throws Exception {


        User user = userService.findUserProfileByJwt(jwt);

        Order order = orderService.findOrderById(orderId);

        if (order.getUser().getId() != user.getId()) {
            throw new Exception("Unauthorized access to this order");
        } else {
            return ResponseEntity.ok(order);
        }
    }

    @GetMapping("")
    public List<Order> getAllOrdersForUser(@RequestHeader("Authorization") String jwt,
                                           @RequestParam(required = false) OrderType orderType,
                                           @RequestParam(required = false) String assetSymbol) throws Exception {


        Long userId = userService.findUserProfileByJwt(jwt).getId();

        return orderService.findAllOrdersByUser(userId, orderType, assetSymbol);
    }

}
