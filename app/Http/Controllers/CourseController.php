<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::all();
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
            'category_id' => 'required|numeric|max:255',
            'course_title' => 'required|string|max:255|unique:' . Course::class,
            'course_description' => 'required|string|max:2048'

        ]);
        $course = Course::create([
            'creator_id' => $request->user()->id,
            'category_id' => $request->category_id,
            'course_title' => $request->course_title,
            'course_description' => $request->course_description,
        ]);
    }

    public function show(Request $request)
    {
        $course = Course::find($request->course_id);

        return Inertia::render('StudentCourse/ViewCourse', ['course' => $course, 'lessons' => $course->lessons, 'exams' => $course->exams]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $course = Course::find($request->id);
        return Inertia::render('Course/ManageCourse', ['course' => $course, 'lessons' => $course->lessons, 'exams' => $course->exams]);
    }

    public function destroy(Request $request)
    {
        $course = Course::find($request->id);

        $course->delete();

        return $course;
    }

    public function register(Request $request)
    {
        $user = $request->user();
        $isExist = 0;
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

    public function getMyCourses(Request $request){

        // return $request->user()->courses;
        return Inertia::render('StudentCourse/MyCourses', ['courses' => $request->user()->courses]);


    }
}
