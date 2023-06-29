<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use App\Models\UserResponse;
use App\Models\User;
use Carbon\Carbon;

class ExamController extends Controller
{
    public function create(Request $request)
    {
        $course = Course::findOrFail($request->course_id);
        return Inertia::render('Exam/CreateExam', ['course' => $course]);
    }
    public function store(Request $request): RedirectResponse
    {
        $startTime = Carbon::parse($request->start_time);
        $endTime = Carbon::parse($request->end_time);

        $exam = Exam::create([
            'course_id' => $request->course_id,
            'title' => $request->title,
            'description' => $request->description,
            'start_time' => $startTime,
            'end_time' => $endTime,
        ]);

        return Redirect::route('exam.edit', ['exam_id' => $exam->id, 'course_id' => $request->course_id]);
    }
    public function show(Request $request)
    {
        $now = Carbon::now();
        $exam = Exam::with([
            'questions.options' => function ($query) {
                $query->select('id', 'question_id', 'option_text');
            }
        ])->findOrFail($request->exam_id);

        if (!$exam || !$exam->is_open || $now->lt($exam->start_time) || $now->gt($exam->end_time)) {
            return redirect()->back()->with('error', 'The exam is not available.');
        }
        return Inertia::render('StudentCourse/ViewExam', ['exam' => $exam]);

    }

    public function edit(Request $request)
    {
        $course = Course::findOrFail($request->course_id);
        $exam = Exam::findOrFail($request->exam_id);
        return Inertia::render('Exam/EditExam', ['CurrentExam' => $exam, 'course' => $course]);
    }
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'is_open' => 'required|boolean',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $exam = Exam::findOrFail($request->exam_id);
        $startTime = Carbon::parse($request->start_time);
        $endTime = Carbon::parse($request->end_time);
        $exam = Exam::findOrFail($request->exam_id);
        $exam->update([
            'title' => $request->title,
            'description' => $request->description,
            'is_open' => $request->is_open,
            'start_time' => $startTime,
            'end_time' => $endTime,
        ]);
    }
    public function destroy(Request $request)
    {
        $exam = Exam::findOrFail($request->exam_id);
        $exam->delete();
        return response()->json(null, 204);
    }
    public function submit(Request $request)
    {
        $now = Carbon::now();
        $exam = Exam::findOrFail($request->exam_id);
        if ($exam->is_open && $now->gte($exam->start_time) && $now->lte($exam->end_time)) {
            $userId = $request->user()->id;
            $answers = $request->input('answers');
            $exam_id = $request->exam_id;
            foreach ($answers as $questionId => $selectedOptionId) {
                UserResponse::updateOrCreate([
                    'exam_id' => $exam_id,
                    'user_id' => $userId,
                    'question_id' => $questionId,
                ], [
                    'option_id' => $selectedOptionId,
                ]);
            }
            // return response()->json(['message' => 'Answers saved successfully']);
            return response()->json(['message' => 'Late']);

            return Redirect::route('course.show', ['course_id' => $exam->course_id]);

        } else {
            return response()->json(['message' => 'Late']);
        }
    }
    public function getExamAnswers(Request $request)
    {
        $examId = $request->exam_id;
        $exam = Exam::with('questions.options')->findOrFail($examId);
        $users = User::join('user_responses', 'users.id', '=', 'user_responses.user_id')
            ->where('user_responses.exam_id', $examId)->select('users.*')->distinct()->get();
        $usersWithAnswers = [];
        foreach ($users as $user) {
            $userAnswers = UserResponse::where('exam_id', $examId)
                ->where('user_id', $user->id)
                ->with('question', 'option')
                ->get();

            $usersWithAnswers[] = [
                'user' => $user,
                'answers' => $userAnswers,
            ];
        }
        return Inertia::render('Exam/ExamAnswers/Main', [
            'exam' => $exam,
            'usersWithAnswers' => $usersWithAnswers,
        ]);
    }
}
