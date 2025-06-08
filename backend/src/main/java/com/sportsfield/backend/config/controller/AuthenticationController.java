package com.sportsfield.backend.config.controller;

import com.sportsfield.backend.dto.VerifyRegisterDto;
import com.sportsfield.backend.service.AuthenticationService;
import com.sportsfield.backend.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authService;
    private final UserService userService;

    @PostMapping("/check-email")
    public Map<String, Boolean> checkEmail(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        boolean valid = email.matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,}$")
                && !userService.emailExists(email);
        return Map.of("valid", valid);
    }

    @PostMapping("/send-code")
    public ResponseEntity<?> sendCode(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        try {
            authService.sendCode(email);
            return ResponseEntity.ok(Map.of("message", "sent"));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping("/verify-and-register")
    public ResponseEntity<?> verifyAndRegister(@RequestBody VerifyRegisterDto dto) {
        if (!authService.verifyCode(dto.getEmail(), dto.getCode())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Mã xác thực không hợp lệ hoặc đã hết hạn."));
        }
        userService.registerAndEnable(dto);
        return ResponseEntity.ok(Map.of("message", "registered"));
    }

    @PostMapping("/resend-code")
    public ResponseEntity<?> resendCode(@RequestBody Map<String, String> req) {
        authService.sendCode(req.get("email"));
        return ResponseEntity.ok(Map.of("message", "resent"));
    }
}