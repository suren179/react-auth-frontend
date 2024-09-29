# React Auth Front End

## Overview

This project is a front-end application built with React that provides
authentication functionality for users. It allows users to sign up, sign in etc.

## Features

-   User registration
-   User signin/signin
-   User profile
-   Protected routes
-   JWT token management
-   Responsive design
-   Auth defect and apply theme (light or dark)

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 18 or later)
-   [npm](https://www.npmjs.com/) (Node package manager)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/suren179/react-auth-frontend.git
cd react-auth-frontend
```

### Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### Configuration

1. Create a `.env` file in the root directory of your project.
2. Add your API endpoint and other environment variables:

    ```env
    REACT_APP_API_URL=https://localhost:3000
    PORT=3001
    REACT_APP_API_DEV_DELAY=500
    ```

### Running the Application

To start the development server, run:

In development mode there is a 500ms delay added to all apis to simulate real
server api response (as the local apis will be almost instantenous): This is
configurable through env (REACT_APP_API_DEV_DELAY)

For MAC

```bash
npm start
```

For Windows

```bash
npm start-windows
```

The application will be available at `https://localhost:3001`.

### Building for Production

To build the application for production, use:

```bash
npm run build
```

This will create an optimized build in the `build` directory.

### Run Tests

```bash
npm run test
```

Launches the test runner in the interactive watch mode.

## Usage

-   Navigate to the application in your browser [https://localhost:3001].
-   Use the sign-up link to create a new account or Log in with your
    credentials.
-   Access Dashboard and Profile page after sign in

## License

N/A
