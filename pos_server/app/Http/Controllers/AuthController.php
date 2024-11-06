<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Organization;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Dotenv\Dotenv;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['login', 'register', 'userList', 'userRole']]);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            $response = Http::post(env('SAAS_LOGIN_URL','https://saasbackend.macrohealthplus.org/api/v1/login'), $credentials);
            // return $response;
            if ($response->status() === 200) {
                if ($response['code'] === 200) {

                    Config::set('database.connections.mysql.database', $response['data']['user']['organization']['db_name']);
                    app('db')->purge();
                    $localUser =  User::where('saas_user_id', $response['data']['user']['id'])->first();

                    if ($localUser) {
                        $user = $response['data']['user'];
                        $user['user_type'] =  $localUser->user_type;
                    }

                    return response()->json([
                        'access_token' => $response['data']['user']['token'],
                        'token_type' => 'bearer',
                        'expires_in' => '',
                        'user' => $user
                    ]);

                    Artisan::call('cache:clear');
                    Artisan::call('config:clear');
                } else {
                    return response()->json(['error' => $response['message']], 404);
                }
            } else {
                return response()->json(['error' => 'API call failed'], 400);
            }
        } catch (\Exception $th) {
            return response()->json(['error' => 'Server is not responding' . $th->getMessage()], 400);
        }
        // }
    }
    public function register(Request $request)
    {
        $tokenCredentials =  $request->validate([
            'token' => 'required|string',
        ]);
        if (env('JWT_SECRET', '6WXtdlLMiJqi8m8Z0LBqQKVhc7VwOLYv7VoGZ6pFOuaFW3ptWFjRDyLBdQ5QBLNO') === $tokenCredentials['token']) {
          
            $credentials =  $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'mobile' => 'required',
                'db_name' => 'required',
                'user_type' => 'required',
                'saas_user_id' => 'required',

            ]);
            Config::set('database.connections.mysql.database', $credentials['db_name']);
            app('db')->purge();

            $user = new User();
            $user->name = $credentials['name'];
            $user->email = $credentials['email'];
            $user->mobile = $credentials['mobile'];
            $user->db_name = $credentials['db_name'];
            $user->user_type = $credentials['user_type'] == 'admin' ? 'admin' : 'empty';
            $user->saas_user_id = (int)$credentials['saas_user_id'];
            $user->save();
            return response()->json([
                'message' => 'User created sucessfully',
                'user' => $user
            ], 200);
        }else{
            return response()->json([
                'message' => 'token is not valid',
            ], 400);
        }
    }


    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard()->user());
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 6000,
            'user' =>  User::with('organization')->find(Auth::id())
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
    public function userList()
    {
        return User::get();
    }
    public function userRole(Request $request)
    {
        $user = User::where('email', $request->userEmail)->first();
        $user->user_type = $request->userType;
        $user->save();

        return 'User role assign susessfully';
    }
}
