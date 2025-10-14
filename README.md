# Budget App

A full-stack web application designed for personal budget and transaction management, built with a modern Java and React technology stack.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-339AF0?style=for-the-badge)

---

## Screenshot

> A live screenshot of the application dashboard.
> **(TODO: Replace this link with a real screenshot of app)**


`https://i.imgur.com/your-screenshot-url.png`

---

## Features

* **Full CRUD Functionality:** Create, read, update, and delete financial transactions.
* **Modern UI:** A clean, responsive, and intuitive user interface built with the Mantine component library.
* **RESTful API:** A robust backend API built with Spring Boot to handle all business logic and data persistence.
* **Containerized Environment:** The entire backend, including the PostgreSQL database, is containerized with Docker for consistent and easy setup.

---

## Tech Stack

### Frontend
* **React:** A JavaScript library for building user interfaces.
* **Vite:** A next-generation frontend tooling for a fast development experience.
* **Mantine UI:** A comprehensive React component library for building accessible and modern applications.
* **Tabler Icons:** A set of over 4,700 open-source icons for a clean and consistent look.

### Backend
* **Java:** A robust, object-oriented programming language.
* **Spring Boot:** An application framework for creating stand-alone, production-grade Spring-based applications.
* **Spring Data JPA:** For simplifying data access layers and interacting with the database.
* **PostgreSQL:** A powerful, open-source object-relational database system.

### DevOps & Tooling
* **Docker & Docker Compose:** For containerizing the backend and database, ensuring a consistent development environment.
* **Maven:** A build automation tool used for the Java project.
* **Postman/Insomnia:** For testing the API endpoints.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following tools installed on your system:
* [Git](https://git-scm.com)
* [JDK 17](https://adoptium.net/) or later
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Node.js](https://nodejs.org/) (which includes npm)

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/gonz-tyler/budget-app.git](https://github.com/gonz-tyler/budget-app.git)
    cd budget-app
    ```

2.  **Run the Backend:**
    The backend and database are managed by Docker Compose. Open a terminal in the project root and run:
    ```bash
    # Navigate to the backend directory
    cd backend

    # Build and start the containers
    docker-compose up --build
    ```
    The backend API will be running on `http://localhost:8080`.

3.  **Run the Frontend:**
    Open a **new, separate terminal** in the project root.
    ```bash
    # Navigate to the frontend directory
    cd frontend

    # Install dependencies
    npm install

    # Start the development server
    npm run dev
    ```
    The React application will be running on `http://localhost:5173`. Open this URL in your browser.

---

## API Endpoints

The backend exposes the following RESTful endpoints for managing transactions:

| Method | Path                    | Description                  |
|--------|-------------------------|------------------------------|
| `GET`  | `/api/transactions`     | Get all transactions         |
| `POST` | `/api/transactions`     | Create a new transaction     |
| `PUT`  | `/api/transactions/{id}`| Update an existing transaction |
| `DELETE`| `/api/transactions/{id}`| Delete a transaction         |

---

## Future Roadmap

This project is a strong foundation for a full-featured FinTech application. Future enhancements will include:

* **User Authentication:** Full user registration and login system.
* **Advanced Dashboard:** Data visualization with charts and graphs to show spending trends.
* **AI Receipt Scraping:** An OCR feature to automatically add transactions from uploaded receipt images.
