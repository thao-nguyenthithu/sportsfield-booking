package com.sportsfield.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "fields")
public class Field {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;  

    @Column(nullable = false)
    private String name;  

    @Column(nullable = false)
    private String type;  

    @Column(nullable = false)
    private String location;  

    @Column(nullable = false)
    private double price;  

    @Column
    private String image; 

    @Column
    private double rating;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;  

    @Column(name = "updated_at", insertable = false)
    private LocalDateTime updatedAt;  
}
