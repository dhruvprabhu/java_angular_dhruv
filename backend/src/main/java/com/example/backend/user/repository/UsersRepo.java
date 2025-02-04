package com.example.backend.user.repository;

import com.example.backend.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsersRepo extends JpaRepository<User, Long> {
    List<User> findByDelflagFalse();
    Optional<User> findByUsernameAndPasswordAndDelflag(String username, String password, boolean delflag);

}
