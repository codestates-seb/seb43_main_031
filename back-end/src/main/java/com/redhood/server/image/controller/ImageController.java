package com.redhood.server.image.controller;

import com.redhood.server.image.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/images")
public class ImageController {
    private ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ResponseEntity saveImage(@RequestPart("file") MultipartFile file) throws Exception {
        String url = imageService.saveImage(file);
        Map<String, String> response = new HashMap<>();
        response.put("image", url);
        return ResponseEntity.ok().body(response);
    }
    @DeleteMapping
    public ResponseEntity deleteImage(@RequestBody Map<String, String> requestBody) {
        imageService.deleteImage(requestBody);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
