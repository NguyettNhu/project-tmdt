<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [AuthController::class, 'login'])->name('login');

Route::prefix('auth')->group(function () {
    Route::post('/ajax_login', [AuthController::class, 'ajax_login'])->name('auth.ajax.login');
    Route::get('/ajax_logout', [AuthController::class, 'ajax_logout'])->name('auth.ajax.logout');
});
Route::middleware(['web', 'auth'])->prefix('admin/')->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/index', [DashboardController::class, 'index'])->name('dashboard.view.index');
    });

    Route::prefix('user')->group(function () {
        Route::get('/index', [UserController::class, 'index'])->name('user.view.index');
        Route::get('/insert', [UserController::class, 'insert'])->name('user.view.insert');
        Route::get('/update/{id}', [UserController::class, 'update'])->name('user.view.update');
        Route::get('/ajax_data', [UserController::class, 'ajax_data'])->name('user.ajax.data');
        // Route::post('/ajax_status', [UserController::class, 'ajax_status'])->name('user.ajax.status');
        Route::post('/ajax_delete', [UserController::class, 'ajax_delete'])->name('user.ajax.delete');
        Route::post('/ajax_insert', [UserController::class, 'ajax_insert'])->name('user.ajax.insert');
        Route::post('/ajax_update', [UserController::class, 'ajax_update'])->name('user.ajax.update');
        Route::post('/ajax_review', [UserController::class, 'ajax_review'])->name('user.ajax.review');
        Route::post('/ajax_password', [UserController::class, 'ajax_password'])->name('user.ajax.password');
    });

    Route::prefix('category')->group(function () {
        Route::get('/index', [CategoryController::class, 'index'])->name('category.view.index');
        Route::get('/insert', [CategoryController::class, 'insert'])->name('category.view.insert');
        Route::get('/update/{id}', [CategoryController::class, 'update'])->name('category.view.update');
        Route::get('/ajax_data', [CategoryController::class, 'ajax_data'])->name('category.ajax.data');
        Route::post('/ajax_status', [CategoryController::class, 'ajax_status'])->name('category.ajax.status');
        Route::post('/ajax_delete', [CategoryController::class, 'ajax_delete'])->name('category.ajax.delete');
        Route::post('/ajax_insert', [CategoryController::class, 'ajax_insert'])->name('category.ajax.insert');
        Route::post('/ajax_update', [CategoryController::class, 'ajax_update'])->name('category.ajax.update');
        Route::post('/ajax_review', [CategoryController::class, 'ajax_review'])->name('category.ajax.review');
        Route::post('/ajax_parents', [CategoryController::class, 'ajax_parents'])->name('category.ajax.parents');
    });

    Route::prefix('product')->group(function () {
        Route::get('/index', [ProductController::class, 'index'])->name('product.view.index');
        Route::get('/insert', [ProductController::class, 'insert'])->name('product.view.insert');
        Route::get('/update/{id}', [ProductController::class, 'update'])->name('product.view.update');
        Route::get('/ajax_data', [ProductController::class, 'ajax_data'])->name('product.ajax.data');
        Route::post('/ajax_status', [ProductController::class, 'ajax_status'])->name('product.ajax.status');
        Route::post('/ajax_delete', [ProductController::class, 'ajax_delete'])->name('product.ajax.delete');
        Route::post('/ajax_insert', [ProductController::class, 'ajax_insert'])->name('product.ajax.insert');
        Route::post('/ajax_update', [ProductController::class, 'ajax_update'])->name('product.ajax.update');
        Route::post('/ajax_review', [ProductController::class, 'ajax_review'])->name('product.ajax.review');
        // Route::post('/ajax_uploads', [ProductController::class, 'ajax_uploads'])->name('product.ajax.uploads');
    });
    Route::prefix('post')->group(function () {
        Route::get('/index', [PostController::class, 'index'])->name('post.view.index');
        Route::get('/insert', [PostController::class, 'insert'])->name('post.view.insert');
        Route::get('/update/{id}', [PostController::class, 'update'])->name('post.view.update');
        Route::get('/ajax_data', [PostController::class, 'ajax_data'])->name('post.ajax.data');
        Route::post('/ajax_status', [PostController::class, 'ajax_status'])->name('post.ajax.status');
        Route::post('/ajax_delete', [PostController::class, 'ajax_delete'])->name('post.ajax.delete');
        Route::post('/ajax_insert', [PostController::class, 'ajax_insert'])->name('post.ajax.insert');
        Route::post('/ajax_update', [PostController::class, 'ajax_update'])->name('post.ajax.update');
        Route::post('/ajax_review', [PostController::class, 'ajax_review'])->name('post.ajax.review');
        // Route::post('/ajax_uploads', [PostController::class, 'ajax_uploads'])->name('post.ajax.uploads');
    });
    Route::prefix('menu')->group(function () {
        Route::get('/index', [MenuController::class, 'index'])->name('menu.view.index');
        Route::get('/insert', [MenuController::class, 'insert'])->name('menu.view.insert');
        Route::get('/update/{id}', [MenuController::class, 'update'])->name('menu.view.update');
        Route::get('/ajax_data', [MenuController::class, 'ajax_data'])->name('menu.ajax.data');
        Route::post('/ajax_status', [MenuController::class, 'ajax_status'])->name('menu.ajax.status');
        Route::post('/ajax_delete', [MenuController::class, 'ajax_delete'])->name('menu.ajax.delete');
        Route::post('/ajax_insert', [MenuController::class, 'ajax_insert'])->name('menu.ajax.insert');
        Route::post('/ajax_update', [MenuController::class, 'ajax_update'])->name('menu.ajax.update');
        Route::post('/ajax_sort', [MenuController::class, 'ajax_sort'])->name('menu.ajax.sort');
        Route::post('/ajax_review', [MenuController::class, 'ajax_review'])->name('menu.ajax.review');
        Route::post('/ajax_parents', [MenuController::class, 'ajax_parents'])->name('menu.ajax.parents');
    });
    Route::prefix('customer')->group(function () {
        Route::get('/index', [CustomerController::class, 'index'])->name('customer.view.index');
        Route::get('/insert', [CustomerController::class, 'insert'])->name('customer.view.insert');
        Route::get('/update/{id}', [CustomerController::class, 'update'])->name('customer.view.update');
        Route::get('/ajax_data', [CustomerController::class, 'ajax_data'])->name('customer.ajax.data');
        // Route::post('/ajax_status', [CustomerController::class, 'ajax_status'])->name('customer.ajax.status');
        Route::post('/ajax_delete', [CustomerController::class, 'ajax_delete'])->name('customer.ajax.delete');
        Route::post('/ajax_insert', [CustomerController::class, 'ajax_insert'])->name('customer.ajax.insert');
        Route::post('/ajax_update', [CustomerController::class, 'ajax_update'])->name('customer.ajax.update');
        Route::post('/ajax_review', [CustomerController::class, 'ajax_review'])->name('customer.ajax.review');
        Route::post('/ajax_password', [CustomerController::class, 'ajax_password'])->name('customer.ajax.password');
    });
    Route::prefix('order')->group(function () {
        Route::get('/index', [OrderController::class, 'index'])->name('order.view.index');
        Route::get('/insert', [OrderController::class, 'insert'])->name('order.view.insert');
        Route::get('/update/{id}', [OrderController::class, 'update'])->name('order.view.update');
        Route::get('/ajax_data', [OrderController::class, 'ajax_data'])->name('order.ajax.data');
        Route::post('/ajax_insert', [OrderController::class, 'ajax_insert'])->name('order.ajax.insert');
        Route::post('/ajax_update', [OrderController::class, 'ajax_update'])->name('order.ajax.update');
        Route::post('/ajax_delete', [OrderController::class, 'ajax_delete'])->name('order.ajax.delete');
        Route::post('/ajax_review', [OrderController::class, 'ajax_review'])->name('order.ajax.review');
    });

    Route::prefix('setting')->group(function () {
        Route::get('/index', [SettingController::class, 'index'])->name('setting.view.index');
        Route::post('/ajax_info', [SettingController::class, 'ajax_info'])->name('setting.ajax.info');
        Route::post('/ajax_sendmail', [SettingController::class, 'ajax_sendmail'])->name('setting.ajax.sendmail');
        Route::post('/ajax_seo', [SettingController::class, 'ajax_seo'])->name('setting.ajax.seo');
    });

});
