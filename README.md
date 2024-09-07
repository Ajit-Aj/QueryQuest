# Query Quest

**Query Quest** is a forum application where users can post content, comment, like, and reply to discussions. It features following and unfollowing options to connect with others and allows users to create and manage personalized spaces for focused discussions. The platform fosters vibrant community engagement and interaction. The application is built with a React frontend using Vite and a Node.js backend with Express.js and MongoDB.

## Project Structure

- **Frontend:** React with Vite, Boostrap, ReactStrap, Scss
- **Backend:** Node.js with Express.js
- **Database:** MongoDB

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org) (version 16 or later recommended)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/try/download/community) (or access to a MongoDB instance)

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd https://github.com/Ajit-Aj/QueryQuest.git
   
2. **Install backend dependencies:**

    ```bash
    npm install
3. **Create a .env file in the backend directory:**

    ```bash

    You'll need to set up environment variables for the backend. Create a file named .env and add the following:
  
    # Local MongoDB
    MONGODB_URI=mongodb://localhost:27017/your_database_name
    
    # Remote MongoDB (choose one)
    # MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
    
    PORT=4000
    JWT_SECRET=your_jwt_secret_key
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    EMAIL_SERVICE=gmail
    CLIENT_URL=http://localhost:5173

5. **Start the backend server:**
    ```bash
    npm start

The backend server should now be running on `http://localhost:4000.`

## Frontend Setup

1. **Navigate to the frontend directory:**
    ```bash
    cd https://github.com/Ajit-Aj/QueryQuest.git
    ```

2. **Install frontend dependencies:**
    ```bash
    npm install
    ```

3. **Start the frontend development server:**
    ```bash
    npm start
    ```

   The frontend should now be running on [http://localhost:5173](http://localhost:5173).

## Usage

- **Frontend:** Access the application in your browser at [http://localhost:5173](http://localhost:5173).
- **Backend:** The API will be accessible at [http://localhost:4000](http://localhost:4000).


## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For any questions or feedback, please contact [ajitaj001@gmail.com](ajitaj001@gmail.com).
