package com.trading_app.service;

import com.trading_app.entity.Coin;

import java.util.List;

public interface CoinService {
    List<Coin> getListCoins(int page) throws Exception;

    String getMarketChart(String coinId, int day) throws Exception;

    String getCoinDetails(String coinId) throws Exception;

    Coin findById(String coinId) throws Exception;

    String searchCoin(String keyword) throws Exception;

    String getTop50CoinsByMarketCoinRank() throws Exception;

    String getTreadingCoins() throws Exception;

}
