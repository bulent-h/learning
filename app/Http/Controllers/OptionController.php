<?php

namespace App\Http\Controllers;

use App\Models\Option;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    public function index(Request $request)
    {
        $option = Option::where('question_id',$request->question_id)->get();
        return response()->json($option);
    }
    public function store(Request $request)
    {
        $option = Option::create([
            'question_id' => $request->question_id,
            'option_text' => $request->option_text,
            'is_correct'=>$request->is_correct,
        ]);
        return response()->json($option, 201);
    }
    public function show(Request $request)
    {
        $option = Option::findOrFail($request->option_id);
        return response()->json($option);
    }
    public function update(Request $request)
    {
        $option = Option::findOrFail($request->option_id);
        $option->update([
            'option_text' => $request->option_text,
            'is_correct'=>$request->is_correct,
        ]);
        return response()->json($option, 201);
    }
    public function destroy(Request $request)
    {
        $option = Option::find($request->option_id);
        $option->delete();
    }
}
