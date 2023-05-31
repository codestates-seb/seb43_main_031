package com.redhood.server.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageService {
    private AmazonS3 amazonS3;

    @Value("${amazon.aws.s3.bucket}")
    private String bucketName;

    public ImageService(AmazonS3 amazonS3) { this.amazonS3 = amazonS3; }

    public String saveImage(MultipartFile file) throws IOException {
        String fileName = RandomNumber(file.getOriginalFilename());
        ObjectMetadata metadata = setMetadata(file);
        PutObjectRequest request = new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead);
        amazonS3.putObject(request);
        return amazonS3.getUrl(bucketName, fileName).toString();
    }

    public void deleteImage(Map<String, String> requestBody) {
        String imageUrl = requestBody.get("image");
        String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucketName, fileName);
        amazonS3.deleteObject(deleteObjectRequest);
    }

    private String RandomNumber(String originalFileName) {
        int randomNumber = (int)(Math.random() * 10000);
        return String.valueOf(randomNumber) + originalFileName;
    }

    private ObjectMetadata setMetadata(MultipartFile file){
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        return metadata;
    }
}
