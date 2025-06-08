package com.sportsfield.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sportsfield.backend.entity.User;
import com.sportsfield.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;  // Mã hóa mật khẩu

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userService.findByEmailAndPassword(user.getEmail(), user.getPassword());
        
        if (existingUser != null) {
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Kiểm tra xem email đã tồn tại chưa
            if (userService.isEmailExists(user.getEmail())) {
                return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
            }

            // Mã hóa mật khẩu trước khi lưu
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Mặc định role là USER (sử dụng Role enum)
            user.setRole(User.Role.valueOf("USER"));

            // Lưu người dùng mới
            User savedUser = userService.saveUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Registration failed due to an internal error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
