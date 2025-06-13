package com.sportsfield.backend.dto;

import java.util.List;
import java.util.Map;

public class FilterOptionsDTO {
    private List<String> types;
    private List<String> locations;
    private List<Map<String, String>> ratings; // Thêm ratings vào DTO

    public FilterOptionsDTO(List<String> types, List<String> locations, List<Map<String, String>> ratings) {
        this.types = types;
        this.locations = locations;
        this.ratings = ratings;
    }

    public List<String> getTypes() {
        return types;
    }

    public List<String> getLocations() {
        return locations;
    }

    public List<Map<String, String>> getRatings() {
        return ratings;
    }
}
