<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $questions = Question::where('exam_id',$request->exam_id)->get();
        return response()->json($questions);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $question = Question::create([
            'exam_id' => $request->exam_id,
            'question_text' => $request->question_text,
        ]);
        return response()->json($question, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $question = Question::findOrFail($request->question_id);
        return response()->json($question);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $question = Question::findOrFail($request->question_id);

        $question->update([
            'question_text' => $request->question_text,
        ]);
        return response()->json($question, 201);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $question = Question::find($request->question_id);

        $question->delete();
    }
}
