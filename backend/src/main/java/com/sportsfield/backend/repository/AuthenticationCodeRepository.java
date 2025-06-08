package com.sportsfield.backend.repository;

import com.sportsfield.backend.entity.AuthenticationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AuthenticationCodeRepository extends JpaRepository<AuthenticationCode, Long> {
    Optional<AuthenticationCode> findFirstByEmailAndUsedFalseOrderByExpiresAtDesc(String email);
}
