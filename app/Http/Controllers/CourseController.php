<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */



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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Course/Main');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|numeric|max:255',
            'course_title' => 'required|string|max:255|unique:' . Course::class,
            'course_description' => 'required|string|max:2048'

        ]);
        // return 'ok';
        $course = Course::create([
            'creator_id' => $request->user()->id,
            'category_id' => $request->category_id,
            'course_title' => $request->course_title,
            'course_description' => $request->course_description,
        ]);

        // return $request;

    }

    /**
     * Display the specified resource.
     */
    public function show(Course $id)
    {
        return Inertia::render('StudentCourse/ViewCourse', ['course_id' => $id]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $course = Course::find($request->id);
        return Inertia::render('Course/ManageCourse', ['course' => $course,'lessons'=>$course->lessons,'exams'=>$course->exams]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
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

}
