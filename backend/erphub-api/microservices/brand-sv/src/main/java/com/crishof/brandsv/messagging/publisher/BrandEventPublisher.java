package com.crishof.brandsv.messagging.publisher;

import com.crishof.brandsv.config.RabbitMQConfig;
import com.crishof.brandsv.messagging.event.BrandUpdatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class BrandEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publishBrandUpdated(BrandUpdatedEvent event) {

        log.info("Publishing brand-updated event: {}", event);
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.BRAND_EXCHANGE,
                RabbitMQConfig.BRAND_UPDATED_ROUTING_KEY,
                event);
    }
}