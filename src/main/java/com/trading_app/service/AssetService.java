package com.trading_app.service;

import com.trading_app.entity.Asset;
import com.trading_app.entity.Coin;
import com.trading_app.entity.User;

import java.util.List;

public interface AssetService {

    Asset createAsset(User user, Coin coin, double quantity);
    Asset getAssetById(Long assetId) throws Exception;
    Asset getAssetByUserIdAndId(Long userId,Long assetId);
    List<Asset> getUserAsset(Long userId);
    Asset updateAsset(Long assetId, double quantity) throws Exception;
    Asset findAssetByUserIdAndCoinId(Long userId, String coinId);
    void deleteAsset(Long assetId);


}
