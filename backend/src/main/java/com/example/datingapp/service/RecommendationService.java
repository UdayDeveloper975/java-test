package com.example.datingapp.service;

import com.example.datingapp.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class RecommendationService {

    public List<User> getRecommendations(User user, List<User> allUsers, int limit) {
        List<UserMatch> userMatches = new ArrayList<>();
        
        String oppositeGender = getOppositeGender(user.getGender());
        
        for (User otherUser : allUsers) {
            int genderScore = calculateGenderScore(user, otherUser, oppositeGender);
            int ageScore = calculateAgeScore(user, otherUser);
            int interestScore = calculateInterestScore(user, otherUser);
            
            UserMatch match = new UserMatch(otherUser, genderScore, ageScore, interestScore);
            userMatches.add(match);
        }
        
        
        userMatches.sort(new UserMatchComparator());
        
        return userMatches.stream()
                .limit(limit)
                .map(UserMatch::getUser)
                .toList();
    }
    
    private String getOppositeGender(String gender) {
        return "Male".equalsIgnoreCase(gender) ? "Female" : "Male";
    }
    
    private int calculateGenderScore(User user, User otherUser, String oppositeGender) {
        return otherUser.getGender().equalsIgnoreCase(oppositeGender) ? 1 : 0;
    }
    
    private int calculateAgeScore(User user, User otherUser) {
        return Math.abs(user.getAge() - otherUser.getAge());
    }
    
    private int calculateInterestScore(User user, User otherUser) {
        int commonInterests = 0;
        
        for (String interest : user.getInterests()) {
            if (otherUser.getInterests().contains(interest)) {
                commonInterests++;
            }
        }
        
        return commonInterests;
    }
    
    private static class UserMatch {
        private final User user;
        private final int genderScore;
        private final int ageScore;
        private final int interestScore;
        
        public UserMatch(User user, int genderScore, int ageScore, int interestScore) {
            this.user = user;
            this.genderScore = genderScore;
            this.ageScore = ageScore;
            this.interestScore = interestScore;
        }
        
        public User getUser() {
            return user;
        }
        
        public int getGenderScore() {
            return genderScore;
        }
        
        public int getAgeScore() {
            return ageScore;
        }
        
        public int getInterestScore() {
            return interestScore;
        }
    }
    
    private static class UserMatchComparator implements Comparator<UserMatch> {
        @Override
        public int compare(UserMatch match1, UserMatch match2) {
            int genderComparison = Integer.compare(match2.getGenderScore(), match1.getGenderScore());
            if (genderComparison != 0) {
                return genderComparison;
            }
            
            int ageComparison = Integer.compare(match1.getAgeScore(), match2.getAgeScore());
            if (ageComparison != 0) {
                return ageComparison;
            }
            
            return Integer.compare(match2.getInterestScore(), match1.getInterestScore());
        }
    }
}