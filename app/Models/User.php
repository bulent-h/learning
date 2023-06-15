<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Message;

use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable implements CanResetPassword
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sentMessage(){
        return $this->hasMany(Message::class,'sender_id','id');
    }

    public function receivedMessage(){
        return $this->hasMany(Message::class,'receiver_id' ,'id');
    }
    public function bothMessage($sender_id,$receiver_id){

        // return $messages = DB::table('messages')
        //         ->where([['sender_id', $sender_id,],['receiver_id', $receiver_id]])
        //         ->orWhere([['sender_id', $receiver_id],['receiver_id',  $sender_id]]);


        $senderId = $sender_id; // Replace with the actual sender's ID
        $receiverId = $receiver_id; // Replace with the actual receiver's ID

        $messages = Message::with('parent')
        ->where(function ($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $senderId)
                ->where('receiver_id', $receiverId);
        })
        ->orWhere(function ($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $receiverId)
                ->where('receiver_id', $senderId);
        })
        ->get();

        return $messages;
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    // Define the relationship to comments
    public function postComments()
    {
        return $this->hasMany(PostComment::class);
    }
}
