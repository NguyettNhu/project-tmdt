# Project Backend Documentation

This directory contains the Laravel backend for the project.

## Prerequisites

Ensure you have the following installed on your machine:

*   **PHP**: 8.2 or higher
*   **Composer**: Dependency manager for PHP
*   **Node.js**: JavaScript runtime (for frontend assets if needed)
*   **Database**: SQLite (default) or MySQL/PostgreSQL

## Installation

Follow these steps to set up the project locally:

1.  **Install PHP Dependencies**
    ```bash
    composer install
    ```

2.  **Install Node.js Dependencies**
    ```bash
    npm install
    npm run build
    ```

3.  **Environment Configuration**
    Copy the example environment file and configure it:
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your database credentials if you are not using SQLite.

4.  **Generate Application Key**
    ```bash
    php artisan key:generate
    ```

5.  **Run Database Migrations**
    ```bash
    php artisan migrate
    ```

## Running the Application

To start the development server, you can use the Composer script which runs Laravel Sail, Queue, and Vite concurrently (if configured), or simply run:

```bash
php artisan serve
```

The API will be accessible at `http://localhost:8000/api`.

## API Documentation

### Public API Endpoints

These endpoints are defined in `routes/api.php` and provide access to public data.

| Resource | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Categories** | `GET` | `/api/categories` | List all categories |
| | `GET` | `/api/categories/{id}` | Show specific category details |
| **Products** | `GET` | `/api/products` | List all products |
| | `GET` | `/api/products/{id}` | Show specific product details |
| **Posts** | `GET` | `/api/posts` | List all posts |
| | `GET` | `/api/posts/{id}` | Show specific post details |
| **Customers** | `GET` | `/api/customers` | List all customers |
| | `GET` | `/api/customers/{id}` | Show specific customer details |

### Admin / Web Routes

These routes are defined in `routes/web.php` and are primarily for the admin panel and internal operations.

**Authentication**
*   `GET /login`: Login page
*   `POST /auth/ajax_login`: AJAX Login
*   `GET /auth/ajax_logout`: AJAX Logout

**Admin Dashboard** (`/admin/dashboard`)
*   `GET /index`: Dashboard view

**User Management** (`/admin/user`)
*   `GET /index`: List users
*   `GET /insert`: Create user view
*   `GET /update/{id}`: Edit user view
*   `GET /ajax_data`: Get user data (AJAX)
*   `POST /ajax_delete`: Delete user
*   `POST /ajax_insert`: Create user
*   `POST /ajax_update`: Update user
*   `POST /ajax_review`: Review user
*   `POST /ajax_password`: Change password

**Category Management** (`/admin/category`)
*   `GET /index`: List categories
*   `GET /insert`: Create category view
*   `GET /update/{id}`: Edit category view
*   `GET /ajax_data`: Get category data (AJAX)
*   `POST /ajax_status`: Update status
*   `POST /ajax_delete`: Delete category
*   `POST /ajax_insert`: Create category
*   `POST /ajax_update`: Update category
*   `POST /ajax_parents`: Get parent categories

**Product Management** (`/admin/product`)
*   `GET /index`: List products
*   `GET /insert`: Create product view
*   `GET /update/{id}`: Edit product view
*   `GET /ajax_data`: Get product data (AJAX)
*   `POST /ajax_status`: Update status
*   `POST /ajax_delete`: Delete product
*   `POST /ajax_insert`: Create product
*   `POST /ajax_update`: Update product

**Post Management** (`/admin/post`)
*   `GET /index`: List posts
*   `GET /insert`: Create post view
*   `GET /update/{id}`: Edit post view
*   `GET /ajax_data`: Get post data (AJAX)
*   `POST /ajax_status`: Update status
*   `POST /ajax_delete`: Delete post
*   `POST /ajax_insert`: Create post
*   `POST /ajax_update`: Update post

**Menu Management** (`/admin/menu`)
*   `GET /index`: List menus
*   `GET /insert`: Create menu view
*   `GET /update/{id}`: Edit menu view
*   `GET /ajax_data`: Get menu data (AJAX)
*   `POST /ajax_status`: Update status
*   `POST /ajax_delete`: Delete menu
*   `POST /ajax_insert`: Create menu
*   `POST /ajax_update`: Update menu
*   `POST /ajax_sort`: Sort menu items

**Customer Management** (`/admin/customer`)
*   `GET /index`: List customers
*   `GET /insert`: Create customer view
*   `GET /update/{id}`: Edit customer view
*   `GET /ajax_data`: Get customer data (AJAX)
*   `POST /ajax_delete`: Delete customer
*   `POST /ajax_insert`: Create customer
*   `POST /ajax_update`: Update customer
*   `POST /ajax_password`: Change password

**Order Management** (`/admin/order`)
*   `GET /index`: List orders
*   `GET /insert`: Create order view
*   `GET /update/{id}`: Edit order view
*   `GET /ajax_data`: Get order data (AJAX)
*   `POST /ajax_insert`: Create order
*   `POST /ajax_update`: Update order
*   `POST /ajax_delete`: Delete order

**Settings** (`/admin/setting`)
*   `GET /index`: Settings view
*   `POST /ajax_info`: Update info
*   `POST /ajax_sendmail`: Update mail settings
*   `POST /ajax_seo`: Update SEO settings
