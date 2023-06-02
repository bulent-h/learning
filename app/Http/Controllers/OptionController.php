<?php

namespace App\Http\Controllers;

use App\Models\Option;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $option = Option::where('question_id',$request->question_id)->get();
        return response()->json($option);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $option = Option::create([
            'question_id' => $request->question_id,
            'option_text' => $request->option_text,
            'is_correct'=>$request->is_correct,
        ]);
        return response()->json($option, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $option = Option::findOrFail($request->option_id);
        return response()->json($option);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Option $option)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $option = Option::findOrFail($request->option_id);

        $option->update([
            'option_text' => $request->option_text,
            'is_correct'=>$request->is_correct,

        ]);
        return response()->json($option, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $option = Option::find($request->option_id);

        $option->delete();
    }
}
