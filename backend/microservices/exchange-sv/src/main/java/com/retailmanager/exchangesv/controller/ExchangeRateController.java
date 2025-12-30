package com.retailmanager.exchangesv.controller;

import com.retailmanager.exchangesv.service.CurrencyConversionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/exchange-rates")
@RequiredArgsConstructor
public class ExchangeRateController {

    private final CurrencyConversionService service;

    @GetMapping("/convert")
    public Mono<BigDecimal> convert(
            @RequestParam String from,
            @RequestParam String to
    ) {
        return service.getExchangeRate(from.toUpperCase(), to.toUpperCase());
    }
}