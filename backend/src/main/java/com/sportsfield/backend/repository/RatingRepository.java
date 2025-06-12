package com.sportsfield.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sportsfield.backend.entity.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findBySportsFieldId(Long sportsFieldId);
}
