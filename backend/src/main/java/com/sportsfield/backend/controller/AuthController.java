package com.sportsfield.backend.controller;

import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sportsfield.backend.entity.User;
import com.sportsfield.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userService.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if (existingUser != null) {
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }
    @Transactional(rollbackFor = Exception.class)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            logger.info("Attempting to register user with email: {}", user.getEmail());
            if (userService.isEmailExists(user.getEmail())) {
                logger.warn("Email already exists: {}", user.getEmail());
                return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
            }

            if (user.getUsername() == null || user.getUsername().isEmpty()) {
                user.setUsername(user.getEmail().split("@")[0]);
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole(User.Role.USER);
            user.setCreatedAt(new Date());
            User savedUser = userService.saveUser(user);
            userService.sendOtp(savedUser.getEmail()); // Gửi OTP
            logger.info("User registered successfully: {}", savedUser.getEmail());
            return new ResponseEntity<>("Mã xác nhận đã được gửi đến email của bạn", HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Registration failed for email: {} - Error: {}", user.getEmail(), e.getMessage(), e);
            return new ResponseEntity<>("Registration failed due to an internal error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String otp = payload.get("otp");
            logger.info("Verifying OTP for email: {}", email);
            if (userService.verifyOtp(email, otp)) {
                logger.info("OTP verified successfully for email: {}", email);
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
            logger.warn("Invalid OTP for email: {}", email);
            return new ResponseEntity<>("Mã xác nhận không đúng!", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("Verification failed for email: {} - Error: {}", payload.get("email"), e.getMessage(), e);
            return new ResponseEntity<>("Lỗi xác nhận: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}