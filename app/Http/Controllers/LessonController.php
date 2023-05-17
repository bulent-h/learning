<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use App\Models\Course;
use Inertia\Inertia;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($course_id)
    {
        $course = Course::find($course_id);
        return $course->lessons;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $course = Course::find($request->course_id);
        return Inertia::render('Lesson/CreateLesson', ['course' => $course]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     'lesson_title' => 'required|string|max:255:',
        //     'lesson_description' => 'required|string|max:2048'

        // ]);
        // return $request->video_path;
        $lesson = Lesson::create([
            'creator_id' => $request->user()->id,
            'course_id' => $request->course_id,
            'lesson_title' => $request->lesson_title,
            'lesson_description' => $request->lesson_description,
            'video_path' => $request->video_path,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Lesson $lesson)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lesson $lesson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lesson $lesson)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        //
    }
}
