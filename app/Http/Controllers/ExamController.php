<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $course = Course::findOrFail($request->course_id);
        return Inertia::render('Exam/CreateExam', ['course' => $course]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $exam = Exam::create([
            'course_id' => $request->course_id,
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return Redirect::route('exam.edit', ['exam_id' => $exam->id,'course_id'=>$request->course_id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $exam = exam::find($request->lesson_id);

        return Inertia::render('StudentCourse/ViewExam', ['exam' => $exam]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $course = Course::findOrFail($request->course_id);
        $exam = Exam::findOrFail($request->exam_id);

        return Inertia::render('Exam/EditExam', ['CurrentExam'=> $exam,'course'=>$course ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        $exam = Exam::findOrFail($request->exam_id);
        $exam->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $exam = Exam::findOrFail($request->exam_id);
        $exam->delete();
        return response()->json(null, 204);

    }
}
