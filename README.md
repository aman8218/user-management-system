# User Management System

A simple user management application built using React for the frontend and JSONPlaceholder API for data fetching. This application allows you to view, edit, and manage user details.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Components](#components)
- [License](#license)

## Features

- View a list of users.
- View detailed information about each user.
- Edit user information in a modal.
- Responsive design that adapts to different screen sizes.
- User-friendly interface with flash messages for feedback.

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **API**: JSONPlaceholder API for mock user data
- **State Management**: React Context API

## Getting Started

To get a copy of the project up and running on your local machine, follow these steps:

1. **Clone the repository**:
   ```bash
   https://github.com/aman8218/user-management-system.git
   cd 'user management system'

2. **Install dependencies**:
    ```bash
    npm install

3. **Run the application**
    ```bash
    npm run dev

## Usage

1. **Viewing Users:** The application will display a list of users fetched from the JSONPlaceholder API.
2. **Viewing User Details:** Click on a user to view their details on a separate page.
3. **Editing User Information:** Click the "Edit" button to open a modal where you can update the user's name, email, and phone number.
4. **Flash Messages:** Notifications will appear after performing actions like editing a user.

## Components

### 1. UserList
- **Description**: Displays a list of users.
- **Functionality**: Fetches users from the global context and renders them in a list format. Each user is a clickable link that navigates to the user's detail page.

### 2. UserDetailPage

- **Description**: Shows detailed information about a selected user.
- **Functionality**: Retrieves and displays specific user information based on the user ID in the URL. It provides a back button to navigate back to the user list.

### 3. EditUserModal
- **Description**: A modal for editing user information.
- **Functionality**: Allows users to modify their details. The modal includes form validation to ensure that the input data is correct before submitting.

### 4. GlobalContext
- **Description**: Provides user data and state management for the application.
- **Functionality**: Centralizes user data and handles operations like fetching users, adding, editing, and deleting users. It makes this data accessible across different components.

## Getting Started

To get started with the application, clone the repository and install the necessary dependencies. Then, run the application locally.
