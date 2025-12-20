<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $module = Request::segment(2);
        View::share('module', $module);

        $this->shareModules();
    }

    private function shareModules()
    {
        $modules = [
            ['name' => 'Bảng Điều Khiển', 'route' => 'dashboard.view.index', 'icon' => 'fa-solid fa-home'],
            ['name' => 'Sản Phẩm', 'route' => 'product.view.index', 'icon' => 'fa-solid fa-cart-shopping'],
            ['name' => 'Danh Mục', 'route' => 'category.view.index', 'icon' => 'fa-solid fa-layer-group'],
            ['name' => 'Đơn Hàng',        'route' => 'order.view.index',     'icon' => 'fa-solid fa-box'],
            ['name' => 'Tin Tức', 'route' => 'post.view.index', 'icon' => 'fa-regular fa-newspaper'],
            ['name' => 'Menu', 'route' => 'menu.view.index', 'icon' => 'fa-solid fa-bars'],
            ['name' => 'Khách Hàng', 'route' => 'customer.view.index', 'icon' => 'fa-solid fa-users'],
            ['name' => 'Cài Đặt', 'route' => 'setting.view.index', 'icon' => 'fa-solid fa-gear'],
            ['name' => 'Thành Viên', 'route' => 'user.view.index', 'icon' => 'fa-solid fa-user'],
        ];

        View::share('modules', $modules);
    }

}
