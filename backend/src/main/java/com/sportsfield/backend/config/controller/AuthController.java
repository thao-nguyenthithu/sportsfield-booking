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
public class AuthController {
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");
        if (!email.matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,}$")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email không hợp lệ"));
        }
        var userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email chưa được đăng ký"));
        }
        var user = userOpt.get();
        if (!userService.passwordMatch(password, user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mật khẩu sai. Vui lòng thử lại"));
        }
        if (!user.isEnabled()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Tài khoản chưa kích hoạt"));
        }
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @PostMapping("/forgot-password/send-code")
    public ResponseEntity<?> sendForgotCode(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        if (!userService.emailExists(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email chưa được đăng ký"));
        }
        authService.sendCode(email);
        return ResponseEntity.ok(Map.of("message", "sent"));
    }

    @PostMapping("/forgot-password/verify")
    public ResponseEntity<?> verifyForgot(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String code = req.get("code");
        if (!authService.verifyCode(email, code)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mã xác thực không hợp lệ hoặc đã hết hạn."));
        }
        return ResponseEntity.ok(Map.of("message", "verified"));
    }

    @PostMapping("/forgot-password/reset")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");
        userService.updatePassword(email, password);
        return ResponseEntity.ok(Map.of("message", "reset"));
    }
 
    @PostMapping("/check-email-exists")
    public Map<String, Boolean> checkEmailExists(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        boolean exists = userService.emailExists(email);
        return Map.of("exists", exists);
    }

}