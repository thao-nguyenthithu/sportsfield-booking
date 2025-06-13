package com.sportsfield.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sportsfield.backend.entity.Field;

public interface FieldRepository extends JpaRepository<Field, Integer> {

}
