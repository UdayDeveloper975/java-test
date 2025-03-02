package com.example.datingapp.service;

import com.example.datingapp.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class RecommendationServiceTest {

    private RecommendationService recommendationService;
    private User user2;
    private User user1;
    private User user3;
    private User user4;
    private User user5;

    @BeforeEach
    void setUp() {
        recommendationService = new RecommendationService();
        
        // Create test users as per the example
        user1 = new User();
        user1.setId(1L);
        user1.setName("User 1");
        user1.setGender("Female");
        user1.setAge(25);
        user1.setInterests(Arrays.asList("Cricket", "Chess"));
        
        user2 = new User();
        user2.setId(2L);
        user2.setName("User 2");
        user2.setGender("Male");
        user2.setAge(27);
        user2.setInterests(Arrays.asList("Cricket", "Football", "Movies"));
        
        user3 = new User();
        user3.setId(3L);
        user3.setName("User 3");
        user3.setGender("Male");
        user3.setAge(26);
        user3.setInterests(Arrays.asList("Movies", "Tennis", "Football", "Cricket"));
        
        user4 = new User();
        user4.setId(4L);
        user4.setName("User 4");
        user4.setGender("Female");
        user4.setAge(24);
        user4.setInterests(Arrays.asList("Tennis", "Football", "Badminton"));
        
        user5 = new User();
        user5.setId(5L);
        user5.setName("User 5");
        user5.setGender("Female");
        user5.setAge(32);
        user5.setInterests(Arrays.asList("Cricket", "Football", "Movies", "Badminton"));
    }

    @Test
    void testGetRecommendationsForUser2() {
        // Test recommendations for User 2
        List<User> allUsers = Arrays.asList(user1, user3, user4, user5);
        List<User> recommendations = recommendationService.getRecommendations(user2, allUsers, 2);
        
        // Expected: [User 1, User 4]
        assertEquals(2, recommendations.size());
        assertEquals("User 1", recommendations.get(0).getName());
        assertEquals("User 4", recommendations.get(1).getName());
    }
    
    @Test
    void testGetRecommendationsForUser1() {
        // Test recommendations for User 1
        List<User> allUsers = Arrays.asList(user2, user3, user4, user5);
        List<User> recommendations = recommendationService.getRecommendations(user1, allUsers, 2);
        
        // Expected: [User 2, User 3] (Male users with closest age)
        assertEquals(2, recommendations.size());
        assertEquals("User 2", recommendations.get(0).getName());
        assertEquals("User 3", recommendations.get(1).getName());
    }
    
    @Test
    void testGetRecommendationsWithLimit() {
        // Test with different limit
        List<User> allUsers = Arrays.asList(user1, user3, user4, user5);
        List<User> recommendations = recommendationService.getRecommendations(user2, allUsers, 3);
        
        // Expected: [User 1, User 4, User 5]
        assertEquals(3, recommendations.size());
        assertEquals("User 1", recommendations.get(0).getName());
        assertEquals("User 4", recommendations.get(1).getName());
        assertEquals("User 5", recommendations.get(2).getName());
    }
}