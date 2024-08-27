package com.trading_app.service;

import com.trading_app.entity.Coin;
import com.trading_app.entity.User;
import com.trading_app.entity.Watchlist;

public interface WatchlistService {
    Watchlist findUserWatchlist(Long userId) throws Exception;

    Watchlist createWatchlist(User user);

    Watchlist findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;
}
