package com.retailmanager.exchangesv.service;

import com.retailmanager.exchangesv.dto.CurrencyLatestResponse;
import com.retailmanager.exchangesv.exception.ExchangeRateNotAvailableException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.time.Duration;

@Service
@Slf4j
public class CurrencyConversionService {

    private final WebClient webClient;
    private final String apiKey;

    public CurrencyConversionService(
            WebClient.Builder builder,
            @Value("${FREE_CURRENCY_APIKEY}") String apiKey
    ) {
        this.webClient = builder
                .baseUrl("https://api.freecurrencyapi.com/v1")
                .build();
        this.apiKey = apiKey;
    }

    public Mono<BigDecimal> getExchangeRate(String from, String to) {

        if (apiKey == null || apiKey.isBlank()) {
            return Mono.error(new IllegalStateException("Missing FreeCurrency API key"));
        }

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/latest")
                        .queryParam("apikey", apiKey)
                        .queryParam("base_currency", from)
                        .queryParam("currencies", to)
                        .build())
                .retrieve()
                .onStatus(HttpStatusCode::isError, ignored ->
                        Mono.error(new ExchangeRateNotAvailableException(from, to)))
                .bodyToMono(CurrencyLatestResponse.class)
                .map(resp -> resp.getData().get(to))
                .switchIfEmpty(Mono.error(new ExchangeRateNotAvailableException(from, to)))
                .timeout(Duration.ofSeconds(3))
                .cache(Duration.ofMinutes(5))
                .doOnError(e -> log.warn("Exchange rate failed {} -> {}", from, to, e));
    }
}