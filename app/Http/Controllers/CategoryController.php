<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::all();
        return $category;
    }
    public function create()
    {
        return Inertia::render('Category/Main');
    }
    public function store(Request $request)
    {
        $request->validate([
            'category_name' => 'required|string|max:255|unique:' . Category::class,
        ]);
        $category = Category::create([
            'category_name' => $request->category_name,
        ]);
    }
    public function update(Request $request, Category $category)
    {
        $category = Category::find($request->id);
        $category->category_name = $request->category_name;
        $category->save();
        return $request;
    }
    public function destroy(Request $request)
    {
        $category = Category::find($request->id);
        $category->delete();
        return $category;
    }
}
