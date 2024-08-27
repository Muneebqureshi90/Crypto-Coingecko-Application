package com.trading_app.serviceImpl;

import com.trading_app.entity.Coin;
import com.trading_app.entity.User;
import com.trading_app.entity.Watchlist;
import com.trading_app.repository.WatchlistRepository;
import com.trading_app.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchlistServiceImpl implements WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRespository;


    @Override
    public Watchlist findUserWatchlist(Long userId) throws Exception {
        Watchlist watchlist = watchlistRespository.findByUserId(userId);
        if (watchlist == null) {
            throw new Exception("Watchlist Not Found");
        }
        return watchlist;
    }

    @Override
    public Watchlist createWatchlist(User user) {
        Watchlist watchlist = new Watchlist();
        watchlist.setUser(user);
        return watchlistRespository.save(watchlist);
    }

    @Override
    public Watchlist findById(Long id) throws Exception {
        Optional<Watchlist> watchlistOptional = watchlistRespository.findById(id);
        if (watchlistOptional.isEmpty()) {
            throw new Exception("watchList Not Found");
        }
        return watchlistOptional.get();
    }

    @Override
    public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
        Watchlist watchlist = findUserWatchlist(user.getId());
        if (watchlist.getCoins().contains(coin)) {
            watchlist.getCoins().remove(coin);
        }else {
            watchlist.getCoins().add(coin);
            watchlistRespository.save(watchlist);
            return coin;
        }
        return null;
    }
}
