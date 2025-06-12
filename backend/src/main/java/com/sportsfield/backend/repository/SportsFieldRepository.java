package com.sportsfield.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sportsfield.backend.entity.SportsField;

public interface SportsFieldRepository extends JpaRepository<SportsField, Long> {
}
