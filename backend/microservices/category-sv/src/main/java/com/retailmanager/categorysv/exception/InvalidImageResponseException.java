package com.retailmanager.categorysv.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_GATEWAY)
public class InvalidImageResponseException extends RuntimeException {
    public InvalidImageResponseException(String message) {
        super(message);
    }
}
