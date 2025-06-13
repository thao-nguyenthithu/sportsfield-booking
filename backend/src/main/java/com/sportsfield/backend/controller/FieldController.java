package com.sportsfield.backend.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sportsfield.backend.dto.FilterOptionsDTO;
import com.sportsfield.backend.entity.Field;
import com.sportsfield.backend.repository.FieldRepository;
import com.sportsfield.backend.service.FieldService;

@RestController
public class FieldController {
    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private FieldService fieldService;

    @GetMapping("/api/fields")
    public List<Field> getFields() {
        return fieldService.getAllFields();
    }

    @GetMapping("/api/filter-options")
    public Object getFilterOptions() {
        List<String> types = fieldRepository.findAll().stream()
                .map(Field::getType)
                .distinct()
                .collect(Collectors.toList());

        List<String> locations = fieldRepository.findAll().stream()
                .map(Field::getLocation)
                .distinct()
                .collect(Collectors.toList());

        List<Map<String, String>> ratings = Arrays.asList(
            Map.of("label", "1-2 ★", "value", "1"),
            Map.of("label", "2-3 ★", "value", "2"),
            Map.of("label", "3-4 ★", "value", "3"),
            Map.of("label", "4-5 ★", "value", "4")
        );


        return new FilterOptionsDTO(types, locations, ratings);
    }
}
