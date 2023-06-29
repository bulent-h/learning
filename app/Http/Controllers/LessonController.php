<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use App\Models\Course;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class LessonController extends Controller
{
    public function create(Request $request)
    {
        $course = Course::find($request->course_id);
        return Inertia::render('Lesson/CreateLesson', ['course' => $course]);
    }
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
        return Redirect::route('course.manage', ['id' => $request->course_id]);
    }
    public function show(Request $request)
    {
        $lesson = Lesson::find($request->lesson_id);
        return Inertia::render('StudentCourse/ViewLesson', ['lesson' => $lesson]);
    }
    public function edit(Request $request)
    {
        $lesson = Lesson::find($request->lesson_id);
        return Inertia::render('Lesson/EditLesson', ['lesson' => $lesson]);
    }
    public function update(Request $request)
    {
        $lesson = Lesson::find($request->lesson_id);
        $lesson->update([
            'lesson_title' => $request->lesson_title,
            'lesson_description' => $request->lesson_description,
            'video_path' => $request->video_path,
        ]);
        $lesson->save();
    }
    public function destroy(Request $request)
    {
        $lesson = Lesson::find($request->id);

        $lesson->delete();
    }
}
