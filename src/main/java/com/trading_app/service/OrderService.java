package com.trading_app.service;

import com.trading_app.domain.OrderType;
import com.trading_app.entity.*;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order findOrderById(long orderId);

    List<Order> findAllOrdersByUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;
}
