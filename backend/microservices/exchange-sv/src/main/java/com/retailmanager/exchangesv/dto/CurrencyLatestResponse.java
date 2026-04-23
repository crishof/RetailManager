package com.retailmanager.exchangesv.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.math.BigDecimal;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public record CurrencyLatestResponse(Map<String, BigDecimal> data) {
}

