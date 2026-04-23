package com.retailmanager.exchangesv.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.Instant;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ExchangeRateNotAvailableException.class)
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    public ApiError handleUnavailable(
            ExchangeRateNotAvailableException ex,
            HttpServletRequest request
    ) {
        log.warn("Service unavailable: {}", ex.getMessage());
        return build(HttpStatus.BAD_REQUEST, "Bad Request", ex, request);
    }

    @ExceptionHandler(WebClientResponseException.class)
    @ResponseStatus(HttpStatus.BAD_GATEWAY)
    public ApiError handleWebClient(
            WebClientResponseException ex,
            HttpServletRequest request
    ) {
        return build(HttpStatus.BAD_GATEWAY, "External Service Error", ex, request);
    }
// ======================
    // Helper
    // ======================

    private ApiError build(HttpStatus status, String error, Exception ex, HttpServletRequest request) {
        return build(status, error, ex.getMessage(), request);
    }

    private ApiError build(HttpStatus status, String error, String message, HttpServletRequest request) {
        return new ApiError(
                Instant.now(),
                status.value(),
                error,
                message,
                request.getRequestURI()
        );
    }
}