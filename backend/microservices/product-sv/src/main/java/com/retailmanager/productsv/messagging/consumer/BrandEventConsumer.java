package com.retailmanager.productsv.messagging.consumer;

import com.retailmanager.productsv.config.RabbitMQConfig;
import com.retailmanager.productsv.messagging.event.BrandUpdatedEvent;
import com.retailmanager.productsv.service.ProductBrandProjectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class BrandEventConsumer {

    private final ProductBrandProjectionService projectionService;

    @RabbitListener(queues = RabbitMQConfig.BRAND_UPDATED_QUEUE)
    public void onBrandUpdated(BrandUpdatedEvent event) {
      log.info("Received BrandUpdatedEvent: {}", event);
        projectionService.handleBrandUpdated(event);
    }
}