# NestJS Weather API

This project implements a NestJS API for fetching weather information using the OpenWeatherMap API. It includes features like secure user authentication, authorization, and weather information retrieval.

## Getting Started

These instructions will help you set up the project and run it on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installing

1. Clone the repository:

    ```bash
    git clone https://github.com/viveklaad/nestjs-weather-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd nestjs-weather-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Environment Configuration

Create a `.env` file in the project root and configure your environment variables:

```env
NODE_ENV=development
PORT=3000
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
JWT_SECRET=your_jwt_secret
```


### NestJS Weather API Documentation

## User Registration and Login

### Register User

**Endpoint:** `/auth/register`

**Method:** `POST`

**Parameters:**
- {
    "username": "testuser",
    "password": "admin@1234",
    "role": "admin/user"
  }

**Description:** To register a new user with a role.

**Example:**
```bash
curl http://localhost:3000/auth/register
```
### Login User

**Endpoint:** `/auth/login`

**Method:** `POST`

**Parameters:**
- {
    "username": "testuser",
    "password": "admin@1234"
  }

**Description:** To login user.

**Example:**
```bash
curl http://localhost:3000/auth/login
```

## Weather Information

### Get Current and Yesterday's Weather

**Endpoint:** `/weather`

**Method:** `GET`

**Parameters:**
- `location` (Query Parameter): ZIP code, latitude, or longitude.

**Description:** Get current and yesterday's weather information for the specified location.

**Example:**
```bash
curl http://localhost:3000/weather?location=12345
```

### Get All Weather

**Endpoint:** `/weather/weather-for-all`

**Method:** `GET`

**Parameters:**
- `location` (Query Parameter): ZIP code, latitude, or longitude.

**Description:** Get current and yesterday's weather information for the specified location.

**Example:**
```bash
curl http://localhost:3000/weather/weather-for-all
```
