package com.retailmanager.brandsv.messagging.event;

import java.time.Instant;
import java.util.UUID;

public record BrandUpdatedEvent(UUID brandId, String name, boolean deleted, Instant updatedAt) {
}