# Social Network API

## Description

This is a RESTful API for a social networking web application, built using Express.js and MongoDB. It allows users to share their thoughts, react to friends' thoughts, and manage their friend list. The API is designed to handle large amounts of unstructured data, making it suitable for a social media startup.

## Table of Contents

- [Installation](#installation)
- [Demo Video][#Demo Video]
- [Usage](#usage)
- [Routes](#routes)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Installation

1. Clone the repository.
2. Navigate to the project folder and run `npm install` to install the required dependencies.
3. Ensure you have MongoDB installed and running on your machine.

## Usage

1. Run `npm start` to start the server. The Mongoose models will be synced to the MongoDB database on server startup.
2. Use tools like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to interact with the API endpoints.

## Routes

The API provides the following routes:

### Users

- `GET /api/users`: Get all users.
- `GET /api/users/:id`: Get a single user by ID along with their thoughts and friend data.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update a user by ID.
- `DELETE /api/users/:id`: Delete a user by ID.

### Friends

- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

### Thoughts

- `GET /api/thoughts`: Get all thoughts.
- `GET /api/thoughts/:id`: Get a single thought by ID.
- `POST /api/thoughts`: Create a new thought.
- `PUT /api/thoughts/:id`: Update a thought by ID.
- `DELETE /api/thoughts/:id`: Delete a thought by ID.

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Create a reaction for a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

## Walkthrough Video

[Add the link to your walkthrough video here]

## License

[Add the license information here, if applicable]
