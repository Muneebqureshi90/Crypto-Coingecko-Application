package com.trading_app.controller;

import com.trading_app.entity.Coin;
import com.trading_app.entity.User;
import com.trading_app.entity.Watchlist;
import com.trading_app.entity.Withdrawal;
import com.trading_app.service.CoinService;
import com.trading_app.service.UserService;
import com.trading_app.service.WatchlistService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
@SecurityRequirement(name = "scheme1")
@CrossOrigin(origins = "*")

@Tag(name = "Address Controller", description = "This is Address Controller")
public class WatchlistController {
    @Autowired
    private WatchlistService watchlistService;
    @Autowired
    private UserService userService;
    @Autowired
    private CoinService coinService;

    @GetMapping("/user")
    ResponseEntity<Watchlist> getUserWatchlist(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Watchlist watchlist = watchlistService.findUserWatchlist(user.getId());
        return new ResponseEntity<>(watchlist, HttpStatus.OK);
    }

    @PostMapping("/create")
    ResponseEntity<Watchlist> createWatchlist(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Watchlist watchlist = watchlistService.createWatchlist(user);
        return new ResponseEntity<>(watchlist, HttpStatus.CREATED);
    }

    @GetMapping("/{watchlistId}")
    ResponseEntity<Watchlist> getWatchlistById(@PathVariable Long watchlistId) throws Exception {
        Watchlist watchlist = watchlistService.findById(watchlistId);
        return new ResponseEntity<>(watchlist, HttpStatus.OK);
    }

    @PatchMapping("/add/coin/{coinId}")
    ResponseEntity<Coin> addItemToWatchlist(@RequestHeader("Authorization") String jwt, @PathVariable String coinId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(coinId);
        Coin addCoin = watchlistService.addItemToWatchlist(coin, user);
        return new ResponseEntity<>(addCoin, HttpStatus.OK);
    }
}
