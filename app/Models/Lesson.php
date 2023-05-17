<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'creator_id',
        'course_id',
        'lesson_title',
        'lesson_description',
        'video_path',

    ];
    public function course(){
        return $this->belongsTo(Course::class);
    }
}
