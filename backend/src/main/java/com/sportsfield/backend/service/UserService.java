package com.sportsfield.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sportsfield.backend.entity.User;
import com.sportsfield.backend.repository.UserRepository;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);  // Sử dụng phương thức existsByEmail của UserRepository
    }

    public User findByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User saveUser(User user) {
        // Kiểm tra email đã tồn tại chưa (tùy chọn, để tránh trùng lặp)
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email đã tồn tại!");
        }
        return userRepository.save(user);
    }
}
