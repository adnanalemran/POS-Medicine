<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;

class Auth extends Model
{
    public static function user()
    {
        $user = app('authuser')->user;

        Config::set('database.connections.mysql.database', $user['organization']['db_name']);
        app('db')->purge();

        $localUser =  User::where('saas_user_id', $user['id'])->first();

        // $user['user_type'] = $localUser->user_type;
        if (!$localUser) {
            //create user
        }
        if (isset($localUser->user_type)) {
            $user['user_type'] = $localUser->user_type;
        }


        return $user;
    }
    public static function id()
    {
        return app('authuser')->user['id'];
    }
}
