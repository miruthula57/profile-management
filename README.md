Profile Management Application
This Profile Management Application allows users to create, view, update, and delete profile details. The app is built with React, TypeScript, and React Router, and includes form validation, API integration, lazy loading, reusable components, and error handling.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
  - [Starting the React App](#starting-the-react-app)
  - [Starting the JSON Server](#starting-the-json-server)
- [Available Scripts](#available-scripts)
- [API Routes](#api-routes)

## Requirements

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/miruthula57/profile-management.git
   cd your-repo-name

2. npm i

## Running the Project

### Starting the JSON Server
1. npm install -g json-server
2. json-server --watch db.json --port 5000

### Starting the React App
1. npm start

Features
Reusable Components: Modular components built with Formik, Yup, and Material UI, including:
Form fields (text, number, date) with validation and error messages.
Buttons and Dialog boxes for consistent UI across the app.
Profile List: Displays profile data in a list format with options to add, edit, and delete profiles.
Lazy Loading: Routes are lazy-loaded for optimized performance.
Error Handling: Manages invalid routes, form validation errors, and API errors gracefully.
Data Persistence: Profile data is stored in local storage for persistence across sessions.
Global State Management: Utilizes Context API to manage profile data and API status.
Environment Variables: API URL and configuration managed via .env file for dev/prod environments.


Application Walkthrough
1. Profile List Page (/profile)
Displays a list of profiles with options to add, edit, and delete each entry.
Delete Confirmation: Clicking "Delete" shows a confirmation dialog before deleting.
API Integration: Fetches profile data from a mock or live API, with error handling for API issues.
2. Add/Edit Profile Form (/profile-form)
Form Fields:
FirstName: Text input (required, minimum 3 characters).
LastName: Text input (required, minimum 3 characters).
Email: Email input (required, valid format).
Age: Number input (optional but must be valid if provided).
DOB: Number input (optional).
ContactNumber: Number input (optional).
Reusable Components: Form fields are modular components created using Formik and Yup for validation and error handling.
Add & Edit Mode:
Add a new profile or edit an existing profile.
Pre-fills data when editing.
Displays success or error toasts based on API response.
Data Handling:
Sends POST/PUT requests for adding/updating profile data.
Uses Context API to manage and update global profile state.
Data persists in local storage across sessions.
3. Reusable Components
Form Fields:
TextField: Custom component for text inputs with validation.
NumberField: Custom component for number inputs with validation.
DateField: Custom component for date inputs.
ErrorMessage: Component for displaying validation errors.
Buttons:
Button: Custom button for form submission and actions.
DialogBox:
Reusable dialog component for delete confirmation prompts.
4. Routing
Configured using React Router with lazy-loaded components for optimized performance.
Routes:
/profile: Displays the profile list with options to add/edit/delete.
/profile-form: Renders the form for creating or editing profiles.
/404: Custom page for invalid routes.
Invalid routes automatically redirect to the custom 404 page.
5. Context API for State Management
ProfileContext: Manages profile data and API status across the app.
Displays the user's First Name and Last Name on the navigation bar.
6. Error Handling
Validates form inputs and handles API errors with toast notifications.
404 handling for invalid routes.
Local storage errors handled to maintain data consistency.
7. Data Persistence
Saves profile data in local storage for consistency across sessions.
Synchronizes local storage with API calls to maintain data accuracy.
Optimizations
Lazy Loading: Routes are lazy-loaded to reduce initial load time.
React Hooks: useCallback and useMemo used for optimized rendering.
Modular Components: Clean and reusable component structure for easy maintenance.
API and Error Management: Consistent error handling for smooth UX.
