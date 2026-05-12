package com.crishof.identitysv.repository;

import com.crishof.identitysv.model.SecurityAccount;
import com.crishof.identitysv.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SecurityAccountRepository extends JpaRepository<SecurityAccount, UUID> {

    Optional<SecurityAccount> findByUser(User user);

    Optional<SecurityAccount> findByUserEmailIgnoreCase(String email);
}
