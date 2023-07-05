<?php

namespace App\Http\Controllers;

use App\Models\RateCourse;
use Illuminate\Http\Request;
use App\Models\Course;

class RateCourseController extends Controller
{
    public function store(Request $request, $course_id)
    {
        $validatedData = $request->validate([
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        $course = Course::findOrFail($course_id);
        $user = auth()->user();

        $existingRating = RateCourse::where('course_id', $course->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingRating) {
            $existingRating->rating = $validatedData['rating'];
            $existingRating->save();

            // return redirect()->back();
            return response()->json(['message' => 'Rating updated successfully.']);
        }
        $rating = new RateCourse();
        $rating->course_id = $course->id;
        $rating->user_id = $user->id;
        $rating->rating = $validatedData['rating'];
        $rating->save();

        // return redirect()->back();
        return response()->json(['message' => 'Rating added successfully.']);
    }

    public function getAverageRating($course_id)
    {

        $course = Course::findOrFail($course_id);
        $ratingCount = $course->ratings()->count();
        $averageRating = $course->ratings()->average('rating');
        $averageRating = round($averageRating, 2);
        return response()->json(['rating' => $averageRating , 'count'=>$ratingCount]);
    }

    public function myRating(Request $request, $course_id)
    {
        $course = Course::findOrFail($course_id);
        $user = auth()->user();
        $existingRating = RateCourse::where('course_id', $course->id)
            ->where('user_id', $user->id)
            ->first();
        if ($existingRating) {
            return response()->json(['rating' => $existingRating->rating]);
        }
        return response()->json(['rating' => null]);
    }
}
