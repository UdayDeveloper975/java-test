package com.example.datingapp.repository;

import com.example.datingapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u WHERE u.gender = :gender")
    List<User> findByGender(@Param("gender") String gender);
    
    @Query("SELECT u FROM User u WHERE u.id <> :userId")
    List<User> findAllExceptUser(@Param("userId") Long userId);
}