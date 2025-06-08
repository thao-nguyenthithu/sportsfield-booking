package com.sportsfield.backend.dto;

import lombok.Data;

@Data
public class VerifyRegisterDto {
    private String email;
    private String fullName;
    private String password;
    private String code;
}