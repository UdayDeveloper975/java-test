package com.example.datingapp.service;

import com.example.datingapp.dto.UserDTO;
import com.example.datingapp.model.User;
import com.example.datingapp.repository.UserRepository;
import com.example.datingapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RecommendationService recommendationService;

    @Autowired
    public UserService(UserRepository userRepository, RecommendationService recommendationService) {
        this.userRepository = userRepository;
        this.recommendationService = recommendationService;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setGender(userDTO.getGender());
        user.setAge(userDTO.getAge());
        user.setInterests(userDTO.getInterests());
        
        return userRepository.save(user);
    }

    public List<User> getRecommendations(Long userId, int limit) {
        User user = getUserById(userId);
        List<User> allUsers = userRepository.findAllExceptUser(userId);
        
        return recommendationService.getRecommendations(user, allUsers, limit);
    }
}