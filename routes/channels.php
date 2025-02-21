<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('my-channel', function () {
    // return (int) $user->id === (int) $id;
        return true;
});

Broadcast::channel('chat.{id}', function ($user,$id) {
    // if(Auth::check()){
    // 	return [
    // 		'id'=>$user->id,
    // 		'name'=>$user->name
    // 	];
    // }
    return true;
});
