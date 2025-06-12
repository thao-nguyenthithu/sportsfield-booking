// package com.sportsfield.backend.controller;

// import java.util.HashMap;
// import java.util.Map;
// import java.util.Optional;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.sportsfield.backend.dto.VerifyRegisterDto;
// import com.sportsfield.backend.entity.User;
// import com.sportsfield.backend.service.AuthenticationService;
// import com.sportsfield.backend.service.UserService;

// import lombok.RequiredArgsConstructor;

// @RestController
// @RequestMapping("/api/auth")
// @RequiredArgsConstructor
// public class AuthenticationController {
//     private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

//     private final AuthenticationService authService;
//     private final UserService userService;

//     @PostMapping("/check-email")
//     public Map<String, Boolean> checkEmail(@RequestBody Map<String, String> req) {
//         String email = req.get("email");
//         boolean valid = email.matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,}$")
//                 && !userService.emailExists(email);
//         return Map.of("valid", valid);
//     }

//     @PostMapping("/send-code")
//     public ResponseEntity<?> sendCode(@RequestBody Map<String, String> req) {
//         String email = req.get("email");
//         try {
//             authService.sendCode(email);
//             return ResponseEntity.ok(Map.of("message", "sent"));
//         } catch (Exception ex) {
//             ex.printStackTrace();
//             return ResponseEntity
//                     .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body(Map.of("error", ex.getMessage()));
//         }
//     }

//     @PostMapping("/verify-and-register")
//     public ResponseEntity<?> verifyAndRegister(@RequestBody VerifyRegisterDto dto) {
//         if (!authService.verifyCode(dto.getEmail(), dto.getCode())) {
//             return ResponseEntity.badRequest()
//                     .body(Map.of("message", "Mã xác thực không hợp lệ hoặc đã hết hạn."));
//         }
//         userService.registerAndEnable(dto);
//         return ResponseEntity.ok(Map.of("message", "registered"));
//     }

//     @PostMapping("/resend-code")
//     public ResponseEntity<?> resendCode(@RequestBody Map<String, String> req) {
//         authService.sendCode(req.get("email"));
//         return ResponseEntity.ok(Map.of("message", "resent"));
//     }

//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
//         String email = req.get("email");
//         String password = req.get("password");

//         // Validate email format
//         if (!email.matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,}$")) {
//             return ResponseEntity.badRequest().body(Map.of("message", "Email không hợp lệ"));
//         }

//         // Find user by email
//         Optional<User> userOpt = userService.findByEmail(email);
//         if (userOpt.isEmpty()) {
//             return ResponseEntity.badRequest().body(Map.of("message", "Email chưa được đăng ký"));
//         }

//         User user = userOpt.get();

//         // Validate password
//         if (!userService.passwordMatch(password, user.getPassword())) {
//             return ResponseEntity.badRequest().body(Map.of("message", "Mật khẩu sai. Vui lòng thử lại"));
//         }

//         // Check if user is enabled
//         if (!user.isEnabled()) {
//             return ResponseEntity.badRequest().body(Map.of("message", "Tài khoản chưa kích hoạt"));
//         }

//         // Prepare success response with role
//         Map<String, Object> response = new HashMap<>();
//         response.put("message", "Login successful");
//         response.put("user", Map.of(
//             "role", user.getRole(),
//             "email", user.getEmail()
//         ));
//         logger.info("User logged in successfully: {}", email);
//         return ResponseEntity.ok(response);
//     }

//     @PostMapping("/forgot-password/send-code")
//     public ResponseEntity<?> sendForgotCode(@RequestBody Map<String, String> req) {
//         String email = req.get("email");
//         if (!userService.emailExists(email)) {
//             return ResponseEntity.badRequest().body(Map.of("message", "Email chưa được đăng ký"));
//         }
//         authService.sendCode(email);
//         return ResponseEntity.ok(Map.of("message", "sent"));
//     }

//     @PostMapping("/forgot-password/verify")
//     public ResponseEntity<?> verifyForgot(@RequestBody Map<String, String> req) {
//         String email = req.get("email");
//         String code = req.get("code");
//         if (!authService.verifyCode(email, code)) {
//             return ResponseEntity.badRequest().body(Map.of("message", "Mã xác thực không hợp lệ hoặc đã hết hạn."));
//         }
//         return ResponseEntity.ok(Map.of("message", "verified"));
//     }

//     @PostMapping("/forgot-password/reset")
//     public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
//         String email = req.get("email");
//         String password = req.get("password");
//         userService.updatePassword(email, password);
//         return ResponseEntity.ok(Map.of("message", "reset"));
//     }
 
//     @PostMapping("/check-email-exists")
//     public Map<String, Boolean> checkEmailExists(@RequestBody Map<String, String> req) {
//         String email = req.get("email");
//         boolean exists = userService.emailExists(email);
//         return Map.of("exists", exists);
//     }

// }

package com.sportsfield.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sportsfield.backend.dto.VerifyRegisterDto;
import com.sportsfield.backend.entity.User;
import com.sportsfield.backend.service.AuthenticationService;
import com.sportsfield.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

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

        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email chưa được đăng ký"));
        }

        User user = userOpt.get();
        if (!userService.passwordMatch(password, user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mật khẩu sai. Vui lòng thử lại"));
        }

        if (!user.isEnabled()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Tài khoản chưa kích hoạt"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("user", Map.of(
            "role", user.getRole(),
            "email", user.getEmail(),
            "fullName", user.getFullName() != null ? user.getFullName() : "" // Thêm fullName nếu có
        ));
        logger.info("User logged in successfully: {}", email);
        return ResponseEntity.ok(response);
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

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        // Lấy email từ SecurityContext (cần Spring Security)
        // Giải pháp tạm thời: Sử dụng email cuối cùng từ login (cần lưu session hoặc token)
        // Đây là demo, bạn cần thay bằng logic lấy email thực tế
        String email = "admin1@example.com"; // Thay bằng logic lấy email từ session/token
        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }

        User user = userOpt.get();
        Map<String, Object> response = new HashMap<>();
        response.put("user", Map.of(
            "role", user.getRole(),
            "email", user.getEmail(),
            "fullName", user.getFullName() != null ? user.getFullName() : ""
        ));
        return ResponseEntity.ok(response);
    }
}