# DMS Distribution Management System

DMS is a full-stack distribution and inventory management application built with Laravel on the backend and React on the frontend. It provides a practical workflow for managing products, tracking stock movement, and recording inventory transactions for categories such as fresh groceries, household essentials, and specialty items.

## Overview

This project is organized as a decoupled application:

- The backend is a Laravel 12 API that exposes product and inventory endpoints.
- The frontend is a React 19 application built with Vite and React Router.
- The UI communicates with the backend through Axios and displays alerts with SweetAlert2.

## What the system does

The current implementation supports:

- Product catalog management with create, list, view, update, and delete operations
- Product image upload and storage
- Inventory transaction recording for purchases, sales, and adjustments
- Real-time stock updates based on inventory events
- Product filtering by type
- Transaction history and stock overview in the UI

## Technology stack

### Backend
- PHP 8.2+
- Laravel 12
- MySQL as the configured database for local development
- Eloquent ORM
- File storage for uploaded product images

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- SweetAlert2
- React Icons

## Project structure

```text
DistributionManagementSystem/
├── backend/                  # Laravel API and database layer
│   ├── app/                  # Controllers, models, and service layer
│   ├── database/            # Migrations and seeders
│   ├── public/              # Public web entry point
│   ├── routes/              # API routes
│   └── storage/             # Uploaded files and framework storage
├── frontend/                 # React/Vite client application
│   ├── src/                  # Components, pages, routing, API config
│   └── public/              # Static assets
├── db/                       # SQL dump for database reference
└── README.md                 # Project documentation
```

## Environment configuration

The application uses two environment layers:

### Backend environment
The backend example environment file is located at [backend/.env.example](backend/.env.example). The current configuration is set up for:

- App name and local development URL
- MySQL database connection
- Session, cache, and queue drivers
- Local file storage for uploaded images

Important details:

- The backend is configured to use MySQL for local development.
- The frontend expects the Laravel API to run at http://127.0.0.1:8000.

### Frontend environment
The frontend environment file is [frontend/.env](frontend/.env) and currently contains:

- VITE_API_URL=http://127.0.0.1:8000/api
- VITE_STORAGE_URL=http://127.0.0.1:8000/storage

If you change the backend URL or port, update these values accordingly.

## Prerequisites

Make sure the following are installed locally:

- PHP 8.2 or newer
- Composer
- Node.js 18 or newer
- npm

## Installation and setup

### 1. Backend setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
```

The backend API will be available at:

```text
http://127.0.0.1:8000
```

### 2. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will typically run at:

```text
http://localhost:5173
```

## Running the application

Once both services are running:

- Visit the frontend at http://localhost:5173
- The React app will call the Laravel API at http://127.0.0.1:8000/api

## API endpoints

The backend exposes the following REST-style endpoints:

### Products
- GET /api/products
- POST /api/products
- GET /api/products/{id}
- PUT /api/products/{id}
- DELETE /api/products/{id}

### Inventory
- GET /api/inventory
- POST /api/inventory
- GET /api/inventory/{id}
- GET /api/inventory/product/{productId}
- PUT /api/inventory/{id}
- DELETE /api/inventory/{id}

## Database notes

The Laravel backend uses migrations for schema creation. The current database structure includes:

- products: product catalog and stock information
- inventory: transaction history and stock movement records

A SQL dump is also included in [db/dms.sql](db/dms.sql) for reference. The project is currently configured to use MySQL in the active Laravel environment.

## Testing

You can run the backend tests with:

```bash
cd backend
php artisan test
```

And frontend tests with:

```bash
cd frontend
npm run test
```

## Notes for development

- Product images are stored in the Laravel public storage area.
- The stock level is updated automatically when inventory transactions are recorded.
- Sales cannot exceed available stock; the API returns an error when that happens.
- The frontend uses local storage for an optional bearer token if authentication is introduced later.

## Troubleshooting

If the frontend cannot reach the API, verify that:

- The Laravel server is running on port 8000
- The values in [frontend/.env](frontend/.env) match your local backend URL
- The backend has been migrated successfully

If images do not appear, ensure the storage link exists:

```bash
cd backend
php artisan storage:link
```

### CORS errors
- Verify backend is running on `http://127.0.0.1:8000`
- Check CORS configuration in `config/cors.php`

### Database errors
- Run migrations: `php artisan migrate`
- Check database connection in `.env`

## 📄 License

This project is a Proof-of-Concept (POC) for the DMS Distribution Management System.

## 👨‍💻 Development

Built with ❤️ using React and Laravel

---

**Note**: This is a POC version. For production use, implement proper authentication, add comprehensive testing, and follow security best practices.
