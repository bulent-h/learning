<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\OptionController;

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
    ->middleware(['auth', 'verified']);


Route::get('/teacher-dashboard', function () {
    return Inertia::render('TeacherDashboard');
})->middleware(['auth', 'verified'])->name('teacher.dashboard');

// Category
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/category/index', [CategoryController::class, 'index'])->name('category.index'); //json
    Route::get('/category/create', [CategoryController::class, 'create'])->name('category.create');
    Route::post('/category/store', [CategoryController::class, 'store'])->name('category.store');
    // Route::get('/category/show/{id}', [CategoryController::class, 'show'])->name('category.show');//json
    Route::post('/category/update', [CategoryController::class, 'update'])->name('category.update');
    Route::post('/category/destroy', [CategoryController::class, 'destroy'])->name('category.destroy');
});


//Course
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/course/index', [CourseController::class, 'index'])->name('course.index');
    Route::get('/course/create', [CourseController::class, 'create'])->name('course.create');
    Route::post('/course/store', [CourseController::class, 'store'])->name('course.store');
    Route::post('/course/destroy', [CourseController::class, 'destroy'])->name('course.destroy');
    Route::post('/course/register', [CourseController::class, 'register'])->name('course.register');

    Route::post('/course/update', [CourseController::class, 'update'])->name('course.update');

    Route::get('/course/edit/{id}', [CourseController::class, 'edit'])->name('course.edit');
    // Route::get('/course/{id}', [CourseController::class, 'view'])->name('course.view');

});
//Lesson
Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('/course/edit/{course_id}/index', [LessonController::class, 'index'])->name('lesson.index');
    Route::get('/course/edit/{course_id}/create-lesson', [LessonController::class, 'create'])->name('lesson.create');
    Route::post('/course/edit/{course_id}/create-lesson', [LessonController::class, 'store'])->name('lesson.store');
    Route::post('/course/delete-lesson', [LessonController::class, 'destroy'])->name('lesson.destroy');
    Route::get('/course/edit/{course_id}/edit-lesson/{lesson_id}', [LessonController::class, 'edit'])->name('lesson.edit');
    Route::post('/course/update-lesson', [LessonController::class, 'update'])->name('lesson.update');
});
///Exam
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/course/edit/{course_id}/create-exam', [ExamController::class, 'create'])->name('exam.create');
    Route::post('/course/edit/{course_id}/create-exam', [ExamController::class, 'store'])->name('exam.store');
    Route::get('/course/edit/{course_id}/create-exam/{exam_id}', [ExamController::class, 'edit'])->name('exam.edit');
    Route::post('/course/delete-exam', [ExamController::class, 'destroy'])->name('exam.destroy');

});







// ++++++++++++++=======================chat
Route::get('/chat', [ChatController::class, 'index'])->middleware(['auth', 'verified'])->name('chat');

Route::get('/getUsers', [ChatController::class, 'getUsers'])->name('chat.getUsers');

// __________________________________________________

// Route::get('/chats', [ChatController::class, 'get'])->name('chat.get');

//Api
Route::get('/chat/messages/{id}', [ChatController::class, 'getMessages'])->name('chat.getMessages');

Route::get('/chat/user/lastMessage/{id}', [ChatController::class, 'getLastMessage'])->name('chat.getLastMessage');
Route::post('/chat/message/send', [MessageController::class, 'store'])->name('chat.sendMessage');
// Route::get('/chat/user/lastMessage/{id}', [ChatController::class, 'getLastMessage'])->name('chat.getLastMessage');

// Route::post('/chat/message/delete',[MessageController::class, 'delete'])->name('chat.deleteMessage');

// ++++++++++++++++++=======================end_chat


require __DIR__ . '/auth.php';
