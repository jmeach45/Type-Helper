# Type Helper 

# Typing and Coding Test Web Application

[https://s24-project1-jmeach45.onrender.com/](https://s24-project1-jmeach45.onrender.com/)

## Description
This project is a web application that allows users to take typing and coding tests. It tracks users' performance, including words per minute (WPM) and accuracy for both typing and coding tests. The application uses Node.js, Express, MongoDB, and Mongoose for the backend, with user authentication handled through bcrypt for password encryption.

## Features
- User authentication with encrypted passwords
- Typing and coding test storage
- Tracks WPM and accuracy for users
- MongoDB database with Mongoose models

## Technologies Used
- Vue
- Node.js
- Express.js
- MongoDB & Mongoose
- bcrypt (for password hashing)

## Known Issues
### Coding Tests Feature Not Working
The coding test functionality is currently not implemented properly. While the database schema exists for coding tests, the necessary logic to create, store, and retrieve coding tests is incomplete or missing.

## Mongoose Models

### User Model
```js
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    typingWpm: { type: Number, required: true },
    typingAccuracy: { type: Number, required: true },
    codingWpm: { type: Number, required: true },
    codingAccuracy: { type: Number, required: true },
    typingTestsTaken: { type: Number, required: true },
    codingTestsTaken: { type: Number, required: true }
});
```

### Typing Test Model
```js
const typingTestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    test: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
```

### Coding Test Model
```js
const codingTestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    test: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/register` | POST | Register a new user |
| `/login` | POST | User login |
| `/typing-test` | POST | Submit typing test results |
| `/coding-test` | POST | Submit coding test results |
| `/user/:id` | GET | Retrieve user stats |

## Security Considerations
- Passwords are hashed using bcrypt before being stored in the database.
- User authentication should be handled with session tokens or JWT.

## Future Enhancements
- Implement frontend using React or Vue.js
- Add real-time multiplayer typing competitions
- Improve security with JWT authentication

