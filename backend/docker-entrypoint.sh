#!/bin/bash
set -e

# 1. Install dependencies if vendor doesn't exist
if [ ! -d "vendor" ]; then
    echo "Vendor directory not found. Running composer install..."
    composer install --no-interaction --optimize-autoloader
fi

# 2. Setup .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo ".env file not found. Creating from .env.example..."
    cp .env.example .env
fi

# 3. Generate key if not set
if grep -q "^APP_KEY=$" .env || ! grep -q "APP_KEY=" .env; then
    echo "Generating application key..."
    php artisan key:generate
fi

echo "Waiting for database connection..."
# Wait for MySQL to be ready
until php -r "
    try {
        \$pdo = new PDO('mysql:host=db;port=3306;dbname=${DB_DATABASE:-e-laravel}', '${DB_USERNAME:-laravel}', '${DB_PASSWORD:-secret}');
        exit(0);
    } catch (PDOException \$e) {
        exit(1);
    }
" > /dev/null 2>&1; do
  echo "Database is not ready yet. Waiting..."
  sleep 3
done

echo "Database connection established."

# Check if 'users' table exists to determine if we need to seed
if php -r "
require __DIR__ . '/vendor/autoload.php';
\$app = require_once __DIR__ . '/bootstrap/app.php';
\$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
if (Illuminate\Support\Facades\Schema::hasTable('users')) { exit(0); } else { exit(1); }
"; then
    echo "Database already initialized (users table exists)."
    echo "Running any pending migrations..."
    php artisan migrate --force
else
    echo "Database not initialized. Running fresh migrations and seeders..."
    php artisan migrate --force
    php artisan db:seed --force
fi

echo "Starting PHP-FPM..."
exec "$@"
