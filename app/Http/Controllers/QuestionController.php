<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index(Request $request)
    {
        $questions = Question::where('exam_id',$request->exam_id)->get();
        return response()->json($questions);
    }
    public function store(Request $request)
    {
        $question = Question::create([
            'exam_id' => $request->exam_id,
            'question_text' => $request->question_text,
        ]);
        return response()->json($question, 201);
    }
    public function show(Request $request)
    {
        $question = Question::findOrFail($request->question_id);
        return response()->json($question);
    }
    public function update(Request $request)
    {
        $question = Question::findOrFail($request->question_id);
        $question->update([
            'question_text' => $request->question_text,
        ]);
        return response()->json($question, 201);
    }
    public function destroy(Request $request)
    {
        $question = Question::find($request->question_id);
        $question->delete();
    }
}
