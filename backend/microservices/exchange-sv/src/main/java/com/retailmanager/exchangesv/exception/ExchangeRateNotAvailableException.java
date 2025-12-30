package com.retailmanager.exchangesv.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class ExchangeRateNotAvailableException extends RuntimeException {
    public ExchangeRateNotAvailableException(String sourceCurrency, String targetCurrency) {
        super("No exchange rate available from " + sourceCurrency + " to " + targetCurrency);
    }
}