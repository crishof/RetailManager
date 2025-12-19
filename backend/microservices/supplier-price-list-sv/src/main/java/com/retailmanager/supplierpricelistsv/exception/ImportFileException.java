package com.retailmanager.supplierpricelistsv.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ImportFileException extends RuntimeException {
    public ImportFileException(String message) {
        super(message);
    }
}
