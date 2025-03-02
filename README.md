# Dating Recommendation Application

A simple dating recommendation application built with Spring Boot and React.js that suggests matches based on gender, age, and shared interests.

## Features

- User registration with name, gender, age, and interests
- View all registered users
- Get personalized recommendations based on compatibility
- Adjustable number of recommendations (top 2, top 3, etc.)

## Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL Database
- JUnit for testing

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- CSS for styling 

## How to Run

### Prerequisites
- Java 17 or higher
- Node.js and npm
- MySQL

### Clone
1. Clone the Repository
   git clone <repository_url>




### Database Setup
1. Create a MySQL database named `dating_app`
2. Update the database credentials in `backend/src/main/resources/application.properties` if needed

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Build the application:
   ```
   ./mvnw clean install
   ```
3. Run the application:
   ```
   ./mvnw spring-boot:run
   ```
   The backend will start on http://localhost:8080

(OR)

1. Go to STS and import the "backend" folder into it
2. Run the project in the Boot Dashboard
3. Access the API via `http://localhost:8080`



### Frontend Setup
1. Navigate to the root directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The frontend will start on http://localhost:5173

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create a new user
- `GET /api/users/{id}/recommendations?limit=n` - Get top n recommendations for a user

## Recommendation Algorithm

The recommendation engine applies the following rules in order:
1. Gender Rule: Opposite gender is given preference
2. Age Rule: Closest match in terms of age is given preference
3. Interest Rule: Closest match in terms of shared interests is given preference

## Project Structure

### Backend
- `model` - Entity classes
- `dto` - Data Transfer Objects
- `repository` - Data access layer
- `service` - Business logic
- `controller` - REST API endpoints
- `exception` - Custom exceptions and error handling

### Frontend
- `components` - Reusable UI components
- `pages` - Page components
- `services` - API service layer

## Testing

Run the backend tests with:
```
cd backend
./mvnw test
```
