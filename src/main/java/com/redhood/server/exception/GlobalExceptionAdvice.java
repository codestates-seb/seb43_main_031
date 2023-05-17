package com.redhood.server.exception;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.redhood.server.response.ErrorResponse;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionAdvice {
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public List<ErrorResponse.FieldError> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        final ErrorResponse response = ErrorResponse.of(e.getBindingResult());
        return response.getFieldErrors();
    }
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public List<ErrorResponse.ConstraintViolationError> handleConstraintViolationException(
            ConstraintViolationException e) {
        final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());
        return response.getViolationErrors();
    }
    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
        final ErrorResponse.ExceptionStatus response = ErrorResponse.exceptionStatus(e.getExceptionCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }
    @ExceptionHandler
    public ResponseEntity handleAmazonServiceException(AmazonServiceException e) {
        final ErrorResponse.ExceptionStatus response = ErrorResponse.exceptionStatus(e.getStatusCode(),e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getStatusCode()));
    }
    @ExceptionHandler
    public ResponseEntity handleSdkClientException(SdkClientException e) {
        final ErrorResponse.ExceptionStatus response =
                ErrorResponse.exceptionStatus(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler
    public ResponseEntity handleFileSizeLimitExceededException(FileSizeLimitExceededException e) {
        final ErrorResponse.ExceptionStatus response =
                ErrorResponse.exceptionStatus(HttpStatus.BAD_REQUEST,e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}