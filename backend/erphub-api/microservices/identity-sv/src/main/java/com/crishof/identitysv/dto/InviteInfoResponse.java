package com.crishof.identitysv.dto;

import java.time.Instant;

public record InviteInfoResponse(
        String email,
        String role,
        Instant expiresAt,
        String passwordRequirements
) {
}
