package com.sportsfield.backend.service;

import com.sportsfield.backend.dto.VerifyRegisterDto;
import com.sportsfield.backend.entity.User;
import com.sportsfield.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public boolean emailExists(String email) {
        return userRepo.existsByEmail(email);
    }

    public void registerAndEnable(VerifyRegisterDto dto) {
        User u = new User();
        u.setEmail(dto.getEmail());
        u.setFullName(dto.getFullName());
        u.setPassword(encoder.encode(dto.getPassword()));
        u.setEnabled(true);
        userRepo.save(u);
    }
}