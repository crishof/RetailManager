package com.retailmanager.suppliercatalogsv.exception;

import java.util.UUID;

public class PriceItemNotFoundException extends RuntimeException {
    public PriceItemNotFoundException(UUID id) {
        super("Product with id " + id + " not found");
    }
}
