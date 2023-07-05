<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Course extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'creator_id',
        'category_id',
        'course_title',
        'course_description',

    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->using(CourseUser::class);;
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class,'course_id');
    }
    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class,'course_id');
    }
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class,'course_id');
    }
    public function ratings()
    {
        return $this->hasMany(RateCourse::class);
    }

}
