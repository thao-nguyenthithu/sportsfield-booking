package com.sportsfield.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sportsfield.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmailAndPassword(String email, String password);
    User findByEmail(String email); // Thêm phương thức để kiểm tra email tồn tại
    boolean existsByEmail(String email);  // Phương thức kiểm tra xem email đã tồn tại
}
