package com.crishof.identitysv.exception;

public class AccountNotVerifiedException extends RuntimeException {
    public AccountNotVerifiedException(String message) {
        super(message);
    }
}
