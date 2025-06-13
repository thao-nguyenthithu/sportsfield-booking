package com.sportsfield.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sportsfield.backend.entity.Field;
import com.sportsfield.backend.repository.FieldRepository;

@Service
public class FieldService {

    @Autowired
    private FieldRepository fieldRepository;

    public List<Field> getAllFields() {
        return fieldRepository.findAll();
    }
}

