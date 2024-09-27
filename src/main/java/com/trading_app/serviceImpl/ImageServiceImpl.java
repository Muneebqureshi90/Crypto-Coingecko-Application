package com.trading_app.serviceImpl;

import com.trading_app.service.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Service
public class ImageServiceImpl implements ImageService {

    @Value("${project.image}")
    private String uploadDir; // Path to store images

    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        // Create the upload directory if it doesn't exist
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Create a unique file name and save the image
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File serverFile = new File(directory, fileName);
        try (FileOutputStream fos = new FileOutputStream(serverFile)) {
            fos.write(file.getBytes());
        }

        return fileName; // Return the file name for retrieval
    }

    @Override
    public byte[] getImage(String imageName) throws IOException {
        // Check if the image exists in the upload directory first
        File file = new File(uploadDir + imageName);
        if (file.exists()) {
            try (FileInputStream fis = new FileInputStream(file)) {
                return fis.readAllBytes(); // Return the file bytes
            }
        } else {
            // Fallback to loading from the resources folder
            InputStream inputStream = getClass().getResourceAsStream("/images/" + imageName);
            if (inputStream != null) {
                return inputStream.readAllBytes(); // Return the bytes from the resource
            } else {
                throw new IOException("Image not found: " + imageName);
            }
        }
    }

}
