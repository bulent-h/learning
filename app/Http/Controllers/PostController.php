<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $userCourses = $request->user()->courses()->pluck('course_id');
        $myposts = Post::where('user_id', $request->user()->id)
            ->with('user', 'course')->get();
        $posts = Post::with('user', 'course')
            ->whereIn('course_id', $userCourses)->get();
        $courses = $request->user()->courses;
        return Inertia::render('Post/IndexPosts', ['posts' => $posts, 'courses' => $courses, 'myposts' => $myposts]);
    }
    public function indexMyPosts(Request $request)
    {
        $user = $request->user();
        $posts = Post::where('user_id', $user->id)
            ->with('user', 'course')->get();
        $courses = $user->courses;
        return Inertia::render('Post/MyPostList', ['posts' => $posts, 'courses' => $courses]);
    }
    public function create()
    {
        return Inertia::render('Posts/Create');
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'file' => 'mimes:jpg,bmp,png|nullable',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $post = new Post();
        $post->user_id = $request->user()->id;
        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->course_id = $request->input('course_id');
        if ($request->hasFile('file')) {
            $post->media_url = $request->file('file')->store('post', 'public');
        }
        $post->save();
        return Redirect::route('posts.index');
    }
    public function show(Request $request)
    {
        $post = Post::findOrFail($request->post_id);
        return Inertia::render('Post/ShowPost', ['post' => $post]);
    }
    public function edit(Post $post)
    {
        return Inertia::render('Post/Edit', ['post' => $post]);
    }
    public function update(Request $request, Post $post)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'file' => 'mimes:jpg,bmp,png|nullable',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->save();
        return redirect()->back();
    }
    public function destroy(Post $post)
    {
        if ($post->user_id == auth()->user()->id) {
            $post->delete();
            return back();
        } else {
            abort(403, 'You are not authorized to delete this post.');
            return back();
        }
    }
}
