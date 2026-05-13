package com.crishof.identitysv.dto;

import java.util.UUID;

public record SignupResponse(
        UUID userId,
        String email,
        String message,
        boolean emailVerificationRequired
) {
}
