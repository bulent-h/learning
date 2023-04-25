<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Course\CategoryController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth','verified']);

Route::get('/chat', [ChatController::class, 'index'])->middleware(['auth', 'verified'])->name('chat');

Route::get('/teacher', function () {
    return Inertia::render('Teacher/Home');
})->middleware(['auth', 'verified'])->name('teacher');


Route::post('/category-create', [CategoryController::class, 'store'])->middleware(['auth', 'verified'])->name('category.create');

Route::get('/get-category',[CategoryController::class, 'index'] )->name('teacher.getCategory');

Route::get('/course', [CourseController::class, 'create'])->name('course.create');
Route::post('/create', [CourseController::class, 'store'])->middleware(['auth', 'verified'])->name('course.store');

// Route::post('/course', [CourseController::class, 'store'])->name('course.store');


require __DIR__.'/auth.php';
