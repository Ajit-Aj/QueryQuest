# Query Quest

**Query Quest** is a forum application where users can post content, participate in discussions, and manage their profiles. The application is built with a React frontend using Vite and a Node.js backend with Express.js and MongoDB.

## Project Structure

- **Frontend:** React with Vite
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

You'll need to set up environment variables for the backend. Create a file named .env and add the following:

    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

4. **Start the backend server:**
    ```bash
    npm start

The backend server should now be running on `http://localhost:5000.`

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
    npm run dev
    ```

   The frontend should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- **Frontend:** Access the application in your browser at [http://localhost:3000](http://localhost:3000).
- **Backend:** The API will be accessible at [http://localhost:5000](http://localhost:5000).

## Contributing

Feel free to open issues or submit pull requests to contribute to the project. Please ensure that you follow the coding standards and provide clear commit messages.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For any questions or feedback, please contact [ajitaj001@gmail.com](ajitaj001@gmail.com).
