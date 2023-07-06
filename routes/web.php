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
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostCommentController;
use Illuminate\Http\Request;
use App\Http\Controllers\RateCourseController;

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
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
})->name('me');

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
    Route::get('/course/coursesToRegister', [CourseController::class, 'coursesToRegister'])->name('course.coursesToRegister');

    Route::get('/course/create', [CourseController::class, 'create'])->name('course.create');
    Route::post('/course/store', [CourseController::class, 'store'])->name('course.store');
    Route::post('/course/destroy/{course}', [CourseController::class, 'destroy'])->name('course.destroy');
    Route::post('/course/{course_id}/update', [CourseController::class, 'update'])->name('course.update');
    Route::get('/course/edit/{id}', [CourseController::class, 'edit'])->name('course.edit');
    Route::get('/course/manage/{id}', [CourseController::class, 'manage'])->name('course.manage');

    Route::get('/search-courses', [CourseController::class, 'searchCourses'])->name('search.courses');

    // Route::get('/course/{id}', [CourseController::class, 'view'])->name('course.view');
});
//Lesson
Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('/course/edit/{course_id}/index', [LessonController::class, 'index'])->name('lesson.index');
    Route::get('/course/edit/{course_id}/create-lesson', [LessonController::class, 'create'])->name('lesson.create');
    Route::post('/course/edit/{course_id}/store-lesson', [LessonController::class, 'store'])->name('lesson.store');
    Route::post('/course/delete-lesson', [LessonController::class, 'destroy'])->name('lesson.destroy');
    Route::get('/course/edit/{course_id}/edit-lesson/{lesson_id}', [LessonController::class, 'edit'])->name('lesson.edit');
    Route::post('/course/update-lesson', [LessonController::class, 'update'])->name('lesson.update');
});
///Exam
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/course/edit/{course_id}/create-exam', [ExamController::class, 'create'])->name('exam.create');
    Route::post('/course/edit/{course_id}/store-exam', [ExamController::class, 'store'])->name('exam.store');
    Route::post('/course/update-exam/{exam_id}', [ExamController::class, 'update'])->name('exam.update');
    Route::get('/course/edit/{course_id}/create-exam/{exam_id}', [ExamController::class, 'edit'])->name('exam.edit');
    Route::post('/course/delete-exam', [ExamController::class, 'destroy'])->name('exam.destroy');
    Route::get('/exam/result/{exam_id}', [ExamController::class, 'getExamAnswers'])->name('exam.result');

});
//Question
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/edit-exam/{exam_id}/index-question', [QuestionController::class, 'index'])->name('question.index');
    Route::post('/edit-exam/store-question', [QuestionController::class, 'store'])->name('question.store');
    Route::post('/edit-exam/update-question', [QuestionController::class, 'update'])->name('question.update');
    Route::post('/edit-exam/destroy-question', [QuestionController::class, 'destroy'])->name('question.destroy');
    Route::get('/edit-exam/show-question', [QuestionController::class, 'show'])->name('question.show');
});
//Option
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/edit-question/{question_id}/index-option', [OptionController::class, 'index'])->name('option.index');
    Route::post('/edit-question/store-option', [OptionController::class, 'store'])->name('option.store');
    Route::post('/edit-question/update-option', [OptionController::class, 'update'])->name('option.update');
    Route::post('/edit-question/destroy-option', [OptionController::class, 'destroy'])->name('option.destroy');
    Route::get('/edit-question/show-option', [OptionController::class, 'show'])->name('option.show');
});

//Comment
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/lesson/view/{lesson_id}/comments', [CommentController::class, 'index'])->name('comments.index');
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::post('/comments/{comment}/reply', [CommentController::class, 'storeReply'])->name('comments.storeReply');
});


//post
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('/my-posts', [PostController::class, 'indexMyPosts'])->name('myposts.index');

    Route::post('/posts', [PostController::class, 'store'])->name('post.store');
    Route::post('/posts/{post}', [PostController::class, 'destroy'])->name('post.destroy');

    Route::get('/post/{post_id}', [PostController::class, 'show'])->name('post.show');
    Route::get('/post/{post_id}/comments', [PostCommentController::class, 'index'])->name('postcomments.index');
    Route::post('/post-comments', [PostCommentController::class, 'store'])->name('postcomments.store');
    Route::post('/post-comments/{comment}/reply', [PostCommentController::class, 'storeReply'])->name('comments.storeReply');

});

// Comment routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
});


//Student
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/course/register', [CourseController::class, 'register'])->name('course.register');
    Route::post('/course/unregister', [CourseController::class, 'unregister'])->name('course.unregister');
    Route::get('/my-courses', [CourseController::class, 'myCourses'])->name('course.mycourse');
    Route::get('/get-my-courses', [CourseController::class, 'getMyCourses'])->name('course.getmycourse');
    Route::get('/course/view/{course_id}', [CourseController::class, 'show'])->name('course.show');
    Route::get('/lesson/view/{lesson_id}', [LessonController::class, 'show'])->name('lesson.show');
    Route::get('/exam/view/{exam_id}', [ExamController::class, 'show'])->name('exam.show');
    Route::post('/submit-exam/{exam_id}', [ExamController::class, 'submit'])->name('exam.submit');

    Route::get('/course/{course_id}/ratings/average', [RateCourseController::class, 'getAverageRating'])->name('rate.average');
    Route::get('/course/{course_id}/rating', [RateCourseController::class, 'myRating'])->name('rate.me');

    Route::post('/course/{course_id}/ratings', [RateCourseController::class, 'store'])->name('rate.store');

});

//Chat
Route::get('/chat', [ChatController::class, 'index'])->middleware(['auth', 'verified'])->name('chat');
Route::get('/getUsers', [ChatController::class, 'getUsers'])->name('chat.getUsers');
Route::get('/chat/messages/{id}', [ChatController::class, 'getMessages'])->name('chat.getMessages');
Route::get('/chat/user/lastMessage/{id}', [ChatController::class, 'getLastMessage'])->name('chat.getLastMessage');
Route::post('/chat/message/send', [MessageController::class, 'store'])->name('chat.sendMessage');
Route::post('/message/delete/{message}', [MessageController::class, 'destroy'])->name('message.delete');



require __DIR__ . '/auth.php';
