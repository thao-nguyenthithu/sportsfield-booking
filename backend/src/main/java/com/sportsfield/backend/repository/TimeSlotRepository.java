package com.sportsfield.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sportsfield.backend.entity.TimeSlot;

public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
}
