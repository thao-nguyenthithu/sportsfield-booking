package com.sportsfield.backend.service;

import java.util.Date;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sportsfield.backend.entity.User;
import com.sportsfield.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    // Lưu trữ OTP tạm thời (có thể dùng Redis hoặc Map trong thực tế)
    private String storedOtp;
    private String otpEmail;

    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User findByEmailAndPassword(String email, String rawPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User saveUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email đã tồn tại!");
        }
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            user.setUsername(user.getEmail().split("@")[0]);
        }
        user.setCreatedAt(new Date());
        return userRepository.save(user);
    }

    public void sendOtp(String email) {
        // Tạo OTP ngẫu nhiên (6 chữ số)
        String otp = String.format("%06d", new Random().nextInt(999999));
        storedOtp = otp;
        otpEmail = email;

        // Gửi email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Xác nhận đăng ký - Mã OTP");
        message.setText("Mã xác nhận của bạn là: " + otp + ". Vui lòng không chia sẻ mã này với bất kỳ ai.");
        mailSender.send(message);
    }

    public boolean verifyOtp(String email, String otp) {
        if (otpEmail != null && otpEmail.equals(email) && storedOtp != null && storedOtp.equals(otp)) {
            storedOtp = null; // Xóa OTP sau khi xác thực
            otpEmail = null;
            return true;
        }
        return false;
    }
}