# Sokrio - Distribution Management System

A modern, full-stack Distribution Management System built with **React** (Frontend) and **Laravel** (Backend). This system manages products with deals and exclusive inventory management for fresh groceries, household essentials, and specialty products.

## 🚀 Features

### Product Management
- ✅ Add new products with images, descriptions, pricing, and categories
- ✅ View all products with filtering by type (Fresh Groceries, Household Essentials, Specialty)
- ✅ Detailed product view with complete information
- ✅ Edit and update product details
- ✅ Delete products
- ✅ Image upload and storage

### Inventory Management
- ✅ Track inventory transactions (Purchase, Sale, Adjustment)
- ✅ Real-time stock level monitoring
- ✅ Transaction history with detailed records
- ✅ Automatic stock updates based on transactions
- ✅ Low stock warnings
- ✅ Purchase price tracking

### User Interface
- ✅ Modern, responsive design with gradient backgrounds
- ✅ Smooth animations and transitions
- ✅ SweetAlert2 notifications for user feedback
- ✅ Clean and intuitive navigation
- ✅ Mobile-friendly layout

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **SweetAlert2** - Beautiful alerts
- **Vite** - Build tool and dev server

### Backend
- **Laravel 11** - PHP framework
- **SQLite** - Database
- **Laravel Sanctum** - API authentication (ready for future use)
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- **PHP** >= 8.2
- **Composer**
- **Node.js** >= 18
- **npm** or **yarn**

## 🔧 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install PHP dependencies:
```bash
composer install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Run migrations:
```bash
php artisan migrate
```

6. Create storage link:
```bash
php artisan storage:link
```

7. Start the Laravel development server:
```bash
php artisan serve
```

The backend will be available at: `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## 📁 Project Structure

```
DistributionManagementSystem/
├── backend/                    # Laravel backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── API/
│   │   │           ├── ProductController.php
│   │   │           └── InventoryController.php
│   │   └── Models/
│   │       ├── Product.php
│   │       └── Inventory.php
│   ├── database/
│   │   └── migrations/
│   │       ├── 2026_02_09_090957_create_products_table.php
│   │       └── 2026_02_09_090959_create_inventory_table.php
│   ├── routes/
│   │   └── api.php
│   └── storage/
│       └── app/
│           └── public/
│               └── products/   # Product images
│
└── frontend/                   # React frontend
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── AddProduct.jsx
    │   │   ├── ProductDetails.jsx
    │   │   └── Inventory.jsx
    │   ├── api.js             # Axios configuration
    │   ├── App.jsx            # Main app component
    │   └── index.css          # Global styles
    └── package.json
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/{id}` - Get product details
- `PUT /api/products/{id}` - Update a product
- `DELETE /api/products/{id}` - Delete a product

### Inventory
- `GET /api/inventory` - Get all inventory transactions
- `POST /api/inventory` - Create a new transaction
- `GET /api/inventory/{id}` - Get transaction details
- `GET /api/inventory/product/{productId}` - Get transactions for a product
- `PUT /api/inventory/{id}` - Update a transaction
- `DELETE /api/inventory/{id}` - Delete a transaction

## 📊 Database Schema

### Products Table
- `id` - Primary key
- `name` - Product name
- `description` - Product description
- `category` - Product category
- `price` - Product price (decimal)
- `stock` - Current stock level
- `image` - Image path
- `sku` - Stock Keeping Unit (unique)
- `type` - Product type (fresh_groceries, household_essential, specialty)
- `is_active` - Active status
- `timestamps` - Created and updated timestamps

### Inventory Table
- `id` - Primary key
- `product_id` - Foreign key to products
- `quantity` - Transaction quantity
- `purchase_price` - Price per unit
- `transaction_type` - Type (purchase, sale, adjustment)
- `notes` - Optional notes
- `timestamps` - Created and updated timestamps

## 🎨 Design Features

- **Gradient Backgrounds** - Modern purple gradient theme
- **Card-based Layout** - Clean, organized content presentation
- **Responsive Grid** - Adapts to different screen sizes
- **Smooth Animations** - Hover effects and transitions
- **Color-coded Badges** - Visual stock level indicators
- **Image Upload** - Drag-and-drop or click to upload
- **Form Validation** - Client and server-side validation
- **Loading States** - User feedback during data fetching

## 🔐 Security Features

- CORS configuration for API security
- Input validation on both frontend and backend
- SQL injection protection through Eloquent ORM
- File upload validation (type and size)
- Unique SKU enforcement

## 🚀 Usage Guide

### Adding a Product
1. Click "Add Product" in the navigation
2. Fill in the product details (name, SKU, category, price, stock)
3. Upload an image (optional)
4. Click "Add Product"
5. You'll be redirected to the products page

### Managing Inventory
1. Navigate to "Inventory"
2. Click "Add Transaction"
3. Select a product
4. Choose transaction type (Purchase/Sale/Adjustment)
5. Enter quantity and price
6. Add notes (optional)
7. Click "Record Transaction"

### Viewing Product Details
1. Go to "Products"
2. Click "View Details" on any product
3. See complete product information and transaction history
4. Click "Edit" to update product details

## 📝 Future Enhancements

- User authentication and authorization
- Advanced reporting and analytics
- Export functionality (PDF, Excel)
- Barcode scanning
- Multi-warehouse support
- Email notifications for low stock
- Sales dashboard
- Customer management

## 🐛 Troubleshooting

### Images not displaying
- Ensure storage link is created: `php artisan storage:link`
- Check file permissions on `storage/app/public`

### CORS errors
- Verify backend is running on `http://127.0.0.1:8000`
- Check CORS configuration in `config/cors.php`

### Database errors
- Run migrations: `php artisan migrate`
- Check database connection in `.env`

## 📄 License

This project is a Proof-of-Concept (POC) for the Sokrio Distribution Management System.

## 👨‍💻 Development

Built with ❤️ using React and Laravel

---

**Note**: This is a POC version. For production use, implement proper authentication, add comprehensive testing, and follow security best practices.
