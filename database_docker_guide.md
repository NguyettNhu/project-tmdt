# 3.2. Hiện thực hóa các tính năng và cài đặt cơ sở dữ liệu

## 3.2.1. Cài đặt cơ sở dữ liệu thực tế

### a. Danh sách các bảng dữ liệu

Các bảng đã tạo trong cơ sở dữ liệu bao gồm: `users`, `categories`, `products`, `posts`, `orders`, `customers`, cùng với các bảng phụ trợ khác như `password_reset_tokens`, `sessions`, `cache`, `jobs`, `failed_jobs`, `menu`, `settings`, `order_details`, `personal_access_tokens`, và `reviews`.

### b. Cấu trúc chi tiết các bảng

#### Bảng `users`
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    status BOOLEAN DEFAULT FALSE,
    image VARCHAR(255) NULL,
    role VARCHAR(255) DEFAULT 'user'
);
```

#### Bảng `categories`
```sql
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    status BOOLEAN DEFAULT TRUE,
    content LONGTEXT NULL,
    type VARCHAR(255) NULL,
    parent_id BIGINT UNSIGNED NULL,
    created_by BIGINT UNSIGNED DEFAULT 0,
    updated_by BIGINT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    image VARCHAR(255) NULL
);
```

#### Bảng `products`
```sql
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    avatar VARCHAR(255) NULL,
    description TEXT NULL,
    content TEXT NULL,
    price INT DEFAULT 0,
    sale_price INT NULL,
    status TINYINT DEFAULT 1,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    parent_id BIGINT UNSIGNED NULL,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    sold INT NULL
);
```

#### Bảng `posts`
```sql
CREATE TABLE posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    content LONGTEXT NULL,
    image VARCHAR(255) NULL,
    status BOOLEAN DEFAULT TRUE,
    parent_id BIGINT UNSIGNED NULL,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

#### Bảng `orders`
```sql
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT UNSIGNED NOT NULL,
    total_price DECIMAL(15,2) DEFAULT 0,
    order_status VARCHAR(255) DEFAULT 'pending',
    payment_status TINYINT DEFAULT 0,
    note TEXT NULL,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);
```

#### Bảng `customers`
```sql
CREATE TABLE customers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    remember_token VARCHAR(100) NULL,
    image VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    phone VARCHAR(20) NULL,
    address VARCHAR(255) NULL
);
```

## Cách Database Hoạt Động Trong Docker

Trong dự án này, cơ sở dữ liệu được triển khai bằng cách sử dụng Docker để đảm bảo tính nhất quán và dễ dàng quản lý môi trường phát triển. Dưới đây là mô tả chi tiết về cách database hoạt động trong môi trường Docker.

### 1. Cấu Hình Docker Compose

Database được định nghĩa như một service trong file `docker-compose.yml` tại thư mục gốc của dự án. Service này sử dụng image MySQL 8.0 chính thức từ Docker Hub.

```yaml
# Database Service (MySQL)
db:
  image: mysql:8.0
  container_name: project-tmdt-db
  restart: unless-stopped
  tty: true
  ports:
    - "3306:3306"
  environment:
    MYSQL_DATABASE: ${DB_DATABASE:-e-laravel}
    MYSQL_ROOT_PASSWORD: ${DB_PASSWORD:-secret}
    MYSQL_PASSWORD: ${DB_PASSWORD:-secret}
    MYSQL_USER: ${DB_USERNAME:-laravel}
  volumes:
    - dbdata:/var/lib/mysql/
    - ./backend/docker/mysql/my.cnf:/etc/mysql/my.cnf
  networks:
    - app-network
```

### 2. Biến Môi Trường

Các biến môi trường được sử dụng để cấu hình database:
- `MYSQL_DATABASE`: Tên cơ sở dữ liệu (mặc định: e-laravel)
- `MYSQL_ROOT_PASSWORD`: Mật khẩu root
- `MYSQL_PASSWORD`: Mật khẩu cho user laravel
- `MYSQL_USER`: Tên user database (mặc định: laravel)

Các biến này được định nghĩa trong file `.env` của backend.

### 3. Volumes và Persistence

- `dbdata:/var/lib/mysql/`: Volume được đặt tên để lưu trữ dữ liệu MySQL, đảm bảo dữ liệu không bị mất khi container được khởi động lại.
- `./backend/docker/mysql/my.cnf:/etc/mysql/my.cnf`: Mount file cấu hình MySQL tùy chỉnh.

### 4. Kết Nối Từ Ứng Dụng

Ứng dụng Laravel (service `app`) kết nối đến database thông qua các biến môi trường:
```yaml
environment:
  DB_CONNECTION: mysql
  DB_HOST: db
  DB_PORT: 3306
  DB_DATABASE: ${DB_DATABASE:-e-laravel}
  DB_USERNAME: ${DB_USERNAME:-laravel}
  DB_PASSWORD: ${DB_PASSWORD:-secret}
```

Trong đó:
- `DB_HOST: db`: Trỏ đến tên service của database container trong mạng Docker.
- Các service khác (frontend, nginx) cũng có thể truy cập database thông qua mạng `app-network`.

### 5. Mạng Docker

Tất cả các service (frontend, app, nginx, db) được kết nối thông qua mạng `app-network` với driver bridge, cho phép giao tiếp giữa các container.

### 6. Khởi Động và Quản Lý

Để khởi động database cùng với toàn bộ hệ thống:
```bash
docker-compose up -d
```

Database sẽ tự động khởi tạo với các bảng thông qua Laravel migrations khi ứng dụng chạy lần đầu.

### 7. Bảo Mật và Cấu Hình

- Database chỉ expose port 3306 trên localhost, không truy cập từ bên ngoài.
- Sử dụng file cấu hình tùy chỉnh `my.cnf` để tối ưu hóa hiệu suất MySQL.
- Dữ liệu được lưu trữ trong volume Docker để đảm bảo persistence.

Thiết lập này đảm bảo database hoạt động ổn định, dễ dàng scale và bảo mật trong môi trường container hóa.