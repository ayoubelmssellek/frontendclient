<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\CategorieController;
use App\Http\Controllers\Admin\TypeController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Client\ClientController;
use App\Http\Controllers\Admin\AdminActionsController;
use App\Http\Controllers\SpecialOfferController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SalesController;



Route::get('/user',[AuthController::class,'getUserData'])->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'Register']);
Route::post('/login', [AuthController::class, 'Login']);
Route::delete('/logout', [AuthController::class, 'Logout'])->middleware('auth:sanctum');




Route::middleware(['auth:sanctum', 'admin'])->group(function (){
    Route::apiResource('/categorie', CategorieController::class);
    Route::post('/product', [ProductController::class, 'store']);
    Route::put('/product/{product}', [ProductController::class, 'update']);
    Route::delete('/product/{product}', [ProductController::class, 'destroy']);
    Route::get('/clients', [ClientController::class, 'GetClientsData']);
    Route::get('/subscriptions', [ClientController::class, 'GetSubsciptionStatic']);
    Route::get('/AdminInformations', [AdminActionsController::class, 'GetAdminInfo']);
    Route::put('/UpdateAdminAccount/{id}', [AdminActionsController::class, 'UpdateAdminAccount']);
    Route::apiResource('/offres', SpecialOfferController::class);
    Route::apiResource('/employees', EmployeeController::class);
    Route::patch('/UpdateStatusReview/{id}', [ReviewController::class, 'ChangeReviewStatus']);

    Route::prefix('sales')->group(function () {
    Route::get('/', [SalesController::class, 'index']);               // جلب كل المبيعات مع فلترة اختيارية
    Route::get('/top-categories', [SalesController::class, 'topCategories']);  // أكبر الفئات مبيعاً
    Route::get('/top-types', [SalesController::class, 'topTypes']);          // أكبر الأنواع مبيعاً
    Route::get('/by-product', [SalesController::class, 'salesByProduct']);   // مبيعات كل منتج
});
});

Route::middleware(['auth:sanctum', 'manager'])->group(function (){
    Route::apiResource('/type', TypeController::class);
    Route::get('/orders', [OrderController::class, 'GetAllOrders']);
    Route::patch('/order/{id}', [OrderController::class, 'UpdateOrderStatus']);
    Route::patch('/product/{id}', [ProductController::class, 'UpdateProductStatus']);
    Route::patch('/UpdateStatusType/{id}', [TypeController::class, 'updateTypeStatus']);
});




Route::middleware('auth:sanctum')->group(function (){
    Route::post('/favorite/{productId}', [FavoriteController::class, 'toggle']);
    Route::get('/favorites', [FavoriteController::class, 'index']);
});


Route::post('/review', [ReviewController::class, 'store'])->middleware('auth:sanctum');
Route::get('/reviews/{productId}', [ReviewController::class, 'index']);
Route::get('/getallreviews', [ReviewController::class, 'GetAllreviews']);


Route::get('/product', [ProductController::class,'index']);
Route::get('/categorie', [CategorieController::class,'index']);

Route::get('/userOrders',[OrderController::class,'GetUserOrders'])->middleware('auth:sanctum');


Route::post('/order', [OrderController::class, 'store']);


Route::get('/reviews/{productId}', [ReviewController::class, 'Getreviewsbyid']);
