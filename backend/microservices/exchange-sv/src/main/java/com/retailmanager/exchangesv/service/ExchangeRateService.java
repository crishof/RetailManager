package com.retailmanager.exchangesv.service;

import reactor.core.publisher.Mono;

import java.math.BigDecimal;

public interface ExchangeRateService {
    Mono<BigDecimal> getExchangeRate(String from, String to);
}
