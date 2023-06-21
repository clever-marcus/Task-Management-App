# Task-Management-App

## Introduction

This is a Full-stack Task Management Application built using React and Django. The application allows users to manage their tasks by providing features like task creation, editing, deletion, and marking tasks as completed.

The frontend of the application is developed using React, leveraging the power of React hooks for state management and UI components from the reactstrap library. The backend is built with Django, providing a RESTful API for managing tasks and interacting with the database.

## Features

- User-friendly interface for managing tasks
- Create, edit, and delete tasks
- Mark tasks as completed
- List tasks with options to filter completed and incomplete tasks
- Responsive design for optimal viewing across devices

## Technologies Used

- Frontend:
  - React: A JavaScript library for building user interfaces
  - React hooks: Functional components and state management
  - React Router: Handling application routing
  - Reactstrap: UI components for a Bootstrap-based design
  - Axios: Handling HTTP requests to the backend API

- Backend:
  - Django: A high-level Python web framework
  - Django REST framework: Building RESTful APIs
  - Django ORM: Object-Relational Mapping for database interaction
  - PostgreSQL: Relational database for storing tasks

## UI functionality
- The Application has a button called "Add Task." When this button is clicked, a window appears displaying input fields for the task title and description, as well as a button to save the task.
- The application has two sections: Complete and Incomplete.
- Tasks that are marked as "complete" are stored in the Complete section and labeled as "saved."
- Tasks that are not yet complete are stored in the Incomplete section.
- The completed tasks are stored in Django's Database using the RestFramework. The React frontend and Django backend communicate through an API.

### Prerequisites

- Node.js with npm
- Python 3.x
- PostgreSQL

### Frontend Setup

1. Clone the repository:

   ```shell
   git clone https://github.com/clever-marcus/Task-Management-App.git
