package com.retailmanager.supplierpricelistsv.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiError handleNotFound(ResourceNotFoundException ex,
                                   HttpServletRequest request) {
        return new ApiError(
                Instant.now(),
                HttpStatus.NOT_FOUND.value(), "Not Found",
                ex.getMessage(),
                request.getRequestURI());
    }

    @ExceptionHandler(InvalidRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleBadRequest(InvalidRequestException ex,
                                     HttpServletRequest request) {
        return new ApiError(
                Instant.now(),
                HttpStatus.BAD_REQUEST.value(), "Bad Request",
                ex.getMessage(),
                request.getRequestURI());
    }


    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_CONTENT)
    public ApiError handleBusinessException(
            BusinessException ex,
            HttpServletRequest request
    ) {
        return new ApiError(
                Instant.now(),
                HttpStatus.UNPROCESSABLE_CONTENT.value(), "Business Rule Violation",
                ex.getMessage(),
                request.getRequestURI()
        );
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiError handleGeneric(
            Exception ex,
            HttpServletRequest request
    ) {
        return new ApiError(
                Instant.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error",
                ex.getMessage(),
                request.getRequestURI());
    }
}