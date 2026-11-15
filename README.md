# Student Management API

## Project Overview

The Student Management API is a backend application built with Node.js, Express.js, MySQL, and Sequelize ORM.

The application allows users to manage student records by performing CRUD operations (Create, Read, Update, and Delete).

It also uses Multer to upload and manage student images, including profile pictures, passport photographs, identity cards, and multiple gallery images.

Express Validator is used to validate incoming student information.

## Technologies Used

- Node.js – JavaScript runtime environment.
- Express.js – Backend web framework.
- MySQL – Relational database management system.
- Sequelize ORM – Database management and interaction.
- Multer – Image and file upload handling.
- Express Validator – Request validation.
- Postman – API testing.
- Git and GitHub – Version control and project hosting.

## Project Features

### 1. Student Management (CRUD)

The API supports:

- Creating a new student.
- Getting all students.
- Getting a single student by ID.
- Updating student information.
- Deleting a student.

### 2. Image Upload Using Multer

The application demonstrates three major Multer upload methods:

**Single Upload – `upload.single()`**

Allows a student to upload one image using a specified field name.

**Multiple Upload – `upload.array()`**

Allows a student to upload multiple images using the same field name, with a maximum of five gallery images per request.

**Different Field Upload – `upload.fields()`**

Allows a student to upload different types of images in one request.

The accepted fields are:

| Field Name | Maximum Files |
|---|---:|
| passportImage | 1 |
| identityCardImage | 1 |
| profileImage | 1 |
| galleryImages | 5 |

### 3. Image Validation

- Only image files are accepted.
- Uploaded images are stored in the `uploads` directory.
- Image filenames are saved in the database.
- Gallery image filenames are stored as an array in a JSON column.

### 4. Existing Student Gallery Upload

Students can upload additional gallery images without deleting their previously uploaded gallery images.

The application combines existing gallery image filenames with newly uploaded filenames before updating the database.

## Installation and Setup

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Navigate into the Project

```bash
cd Student_Management_API
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure the Database

Create a MySQL database for the application.

Configure your database connection in the Sequelize configuration file:

```text
config/config.json
```

Enter your database username, password, database name, host, and dialect.

Example:

```json
{
  "development": {
    "username": "root",
    "password": "your_password",
    "database": "student_management",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Replace the example database credentials with your own.

### Step 5: Run Database Migrations

```bash
npx sequelize-cli db:migrate
```

This creates the database tables based on your migrations.

### Step 6: Start the Server

Use the start command configured in your `package.json`, for example:

```bash
npm start
```

Or, if you use Nodemon:

```bash
npm run dev
```

The server should start on your configured port.

## API Endpoints

The following are the main API operations.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/students` | Create a student |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get one student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |
| POST | `/api/students/:id/images` | Upload different student images |
| POST | `/api/students/:id/gallery` | Upload additional gallery images |

*Note: The exact route prefixes should match the routes configured in your application.*

## Testing with Postman

The API can be tested using Postman.

For image uploads:

1. Open Postman.
2. Select the appropriate HTTP method.
3. Enter the endpoint URL.
4. Select Body.
5. Choose form-data.
6. Enter the correct field name.
7. Change the field type from Text to File.
8. Select the image or images to upload.
9. Click Send.

For gallery uploads, use the same field name, `galleryImages`, for every image.

## Error Handling

The API handles common errors, including:

- Student not found.
- Invalid image file types.
- Unexpected file fields.
- Missing required student information.
- Database errors.
- Invalid requests.

Appropriate HTTP status codes and error messages are returned to the client.

## Conclusion

This project demonstrates how to build a Student Management REST API using Node.js, Express.js, MySQL, and Sequelize ORM.

It also demonstrates how to handle single image uploads, multiple image uploads, different image fields in one request, request validation, and updating existing student records.

The project provides practical experience with backend development, REST API design, database relationships, file uploads, and API testing.