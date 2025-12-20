# Project TMĐT (Thương Mại Điện Tử)

Dự án website thương mại điện tử Fullstack sử dụng Laravel (Backend) và Next.js (Frontend).

## Cấu trúc dự án

- **backend/**: Mã nguồn Laravel API.
- **frontend/**: Mã nguồn Next.js Client.
- **docker-compose.yml**: Cấu hình Docker để chạy toàn bộ dự án.

---

## Yêu cầu hệ thống

### Nếu chạy bằng Docker (Khuyên dùng)
- Docker Desktop hoặc Docker Engine
- Docker Compose

### Nếu chạy thủ công (Không dùng Docker)
- **PHP**: >= 8.2
- **Composer**: Trình quản lý gói cho PHP
- **Node.js**: >= 18 (Khuyên dùng bản LTS mới nhất)
- **MySQL**: >= 8.0

---

## 1. Hướng dẫn chạy bằng Docker (Nhanh nhất)

Cách này sẽ tự động cài đặt môi trường và chạy tất cả các dịch vụ (Frontend, Backend, Database, Nginx).

### Bước 1: Clone dự án và khởi chạy
Tại thư mục gốc của dự án, chạy lệnh:

```bash
docker compose up -d --build
```

Hệ thống sẽ tự động:
- Cài đặt dependencies (Composer).
- Tạo file `.env` và generate key.
- Chờ database khởi động.
- Chạy migrations và seed dữ liệu mẫu (nếu chạy lần đầu).

Bạn có thể theo dõi quá trình cài đặt tự động bằng lệnh:
```bash
docker compose logs -f app
```

### Bước 2: Truy cập
Sau khi container `app` báo "Starting PHP-FPM...", bạn có thể truy cập:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **Database**: Host: `localhost`, Port: `3306`, User: `laravel`, Pass: `secret`, DB: `e-laravel`

---

## 2. Hướng dẫn chạy thủ công (Không dùng Docker)

Nếu bạn muốn chạy từng phần riêng biệt trên máy local.

### Thiết lập Database
Tạo một database MySQL trống (ví dụ tên là `project_tmdt`).

### Thiết lập Backend (Laravel)

1. Di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```

2. Cài đặt dependencies:
   ```bash
   composer install
   ```

3. Cấu hình môi trường:
   - Copy file `.env.example` thành `.env`:
     ```bash
     cp .env.example .env
     ```
   - Mở file `.env` và cập nhật thông tin database của bạn:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=project_tmdt  # Tên database bạn đã tạo
     DB_USERNAME=root          # Username database của bạn
     DB_PASSWORD=              # Password database của bạn
     ```

4. Tạo Application Key:
   ```bash
   php artisan key:generate
   ```

5. Chạy Migrations:
   ```bash
   php artisan migrate
   ```

6. Khởi chạy server:
   ```bash
   php artisan serve --port=8000
   ```
   Backend sẽ chạy tại: `http://localhost:8000`

### Thiết lập Frontend (Next.js)

1. Mở terminal mới và di chuyển vào thư mục frontend:
   ```bash
   cd frontend
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   # hoặc yarn install
   ```

3. Cấu hình môi trường:
   - Tạo file `.env.local` (nếu cần thiết) để cấu hình API URL. Mặc định code có thể đã trỏ về `http://localhost:8000`.
   - Nếu cần, thêm vào `.env.local`:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:8000/api
     ```

4. Khởi chạy server:
   ```bash
   npm run dev
   ```
   Frontend sẽ chạy tại: `http://localhost:3000`

---

## Các lệnh thường dùng với Docker

- **Dừng các container**:
  ```bash
  docker compose down
  ```

- **Xem logs**:
  ```bash
  docker compose logs -f
  ```

- **Truy cập vào shell của container backend**:
  ```bash
  docker compose exec app bash
  ```
