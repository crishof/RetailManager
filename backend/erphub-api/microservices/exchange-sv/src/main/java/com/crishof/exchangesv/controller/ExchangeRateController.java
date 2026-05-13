package com.crishof.exchangesv.controller;

import com.crishof.exchangesv.exception.ExternalServiceException;
import com.crishof.exchangesv.service.ExchangeRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/exchange-rate")
@RequiredArgsConstructor
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;

    //  ===============
    //  GET EXCHANGE RATE
    //  ===============

    @GetMapping
    public ResponseEntity<BigDecimal> convert(@RequestParam String from, @RequestParam String to) {
        BigDecimal rate = exchangeRateService.getExchangeRate(from, to)
                .blockOptional()
                .orElseThrow(() -> new ExternalServiceException("Exchange rate provider returned an empty response"));
        return ResponseEntity.ok(rate);
    }
}