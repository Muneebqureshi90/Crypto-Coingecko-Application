package com.trading_app.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    String uploadImage(MultipartFile file) throws IOException;

    byte[] getImage(String imageName) throws IOException;
}
