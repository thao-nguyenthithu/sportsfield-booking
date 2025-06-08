package com.sportsfield.backend.service;

import com.sportsfield.backend.entity.AuthenticationCode;
import com.sportsfield.backend.repository.AuthenticationCodeRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);

    private final AuthenticationCodeRepository codeRepo;
    private final JavaMailSender mailSender;
    private final SecureRandom random = new SecureRandom();

    public void sendCode(String email) {
        String code = String.format("%06d", random.nextInt(1_000_000));
        AuthenticationCode ac = new AuthenticationCode();
        ac.setEmail(email);
        ac.setCode(code);
        ac.setExpiresAt(LocalDateTime.now().plusMinutes(10));
        ac.setUsed(false);
        codeRepo.save(ac);


        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("no-reply@sportsfield.com");
        msg.setTo(email);
        msg.setSubject("Xác thực SportBooking");
        msg.setText("Mã của bạn: " + code + " (hết hạn sau 10 phút)");

        sendEmailAsync(msg);
    }

    public boolean verifyCode(String email, String code) {
        var opt = codeRepo.findFirstByEmailAndUsedFalseOrderByExpiresAtDesc(email);
        if (opt.isEmpty()) {
            log.warn("No OTP found for email {}", email);
            return false;
        }
        AuthenticationCode ac = opt.get();
        if (ac.getExpiresAt().isAfter(LocalDateTime.now()) && ac.getCode().equals(code)) {
            ac.setUsed(true);
            codeRepo.save(ac);
            return true;
        }
        log.warn("OTP verification failed for email {}", email);
        return false;
    }

    @Async
    public void sendEmailAsync(SimpleMailMessage msg) {
        mailSender.send(msg);
    }
}