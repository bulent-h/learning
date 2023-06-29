<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $courses = Course::where('creator_id', $request->user()->id)->get();
        foreach ($courses as $course) {
            try {
                $course->category;
            } catch (ModelNotFoundException $e) {
            }
        }
        return $courses;
    }
    public function create()
    {
        return Inertia::render('Course/Main');
    }
    public function store(Request $request)
    {
        $request->validate([
            'course_title' => 'required|string|max:255|unique:' . Course::class,
            'course_description' => 'required|string|max:2048'
        ]);
        $course = Course::create([
            'creator_id' => $request->user()->id,
            'category_id' => $request->category_id,
            'course_title' => $request->course_title,
            'course_description' => $request->course_description,
        ]);
        $request->user()->courses()->attach($course->id);
        return Redirect::route('teacher.dashboard');
    }
    public function show(Request $request)
    {
        $course = Course::find($request->course_id);
        $exams = $course->exams()->where('is_open', '1')->get();

        return Inertia::render('StudentCourse/ViewCourse', ['course' => $course, 'lessons' => $course->lessons, 'exams' => $exams]);
    }
    public function edit(Request $request)
    {
        $course = Course::find($request->id);
        return Inertia::render('Course/EditCourse', ['course' => $course, 'lessons' => $course->lessons, 'exams' => $course->exams]);
    }
    public function manage(Request $request)
    {
        $course = Course::find($request->id);
        return Inertia::render('Course/ManageCourse', ['course' => $course, 'lessons' => $course->lessons, 'exams' => $course->exams]);
    }
    public function destroy(Request $request, Course $course)
    {
        $course->delete();
        return Redirect::route('teacher.dashboard');
    }
    public function register(Request $request)
    {
        $user = $request->user(); $isExist = 0;
        foreach ($user->courses as $course) {
            if ($course->pivot->user_id == $user->id && $course->pivot->course_id == $request->id) {
                $isExist = 1;
            }
        }
        if (!$isExist) {
            $user->courses()->attach($request->id);
        } else {
            return "already registered to the course";
        }
    }
    public function coursesToRegister(Request $request)
    {
        $userCourses = $request->user()->courses;
        $courses = Course::whereNotIn('id', $userCourses->pluck('id'))->get();
        return $courses;
    }
    public function myCourses(Request $request)
    {
        return Inertia::render('StudentCourse/MyCourses');
    }
    public function getMyCourses(Request $request)
    {
        return $request->user()->courses;
    }
    public function unregister(Request $request)
    {
        $user = $request->user();
        $courseId = $request->id;
        $isRegistered = $user->courses()->where('course_id', $courseId)->exists();
        if ($isRegistered) {
            $user->courses()->detach($courseId);
            return Redirect::route('course.mycourse');
        }
    }
    public function searchCourses(Request $request)
    {
        $query = $request->input('query');
        $courses = Course::where('course_title', 'like', "%{$query}%")
            ->whereDoesntHave('users', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })->get();
        return $courses;
    }
}
