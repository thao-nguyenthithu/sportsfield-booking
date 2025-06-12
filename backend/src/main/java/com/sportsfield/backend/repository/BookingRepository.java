package com.sportsfield.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sportsfield.backend.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
