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
use Illuminate\Support\Facades\Hash;
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
        $data = $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        $user = User::where('email', $data['email'])->first();

        // Check if the password matches
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Incorrect credentials.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
        ], 200);
    }











    public function register(Request $request)
    {

        $credentials =  $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
            'mobile' => 'required',
            'user_type' => 'required',

        ]);
        $user = new User();
        $user->password = Hash::make($credentials['password']);
        $user->name = $credentials['name'];
        $user->email = $credentials['email'];
        $user->mobile = $credentials['mobile'];
        $user->user_type = $credentials['user_type'] == 'admin' ? 'admin' : 'empty';
        // $token = $user->createToken('auth_token')->plainTextToken;

        $user->save();



        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,

        ], 200);
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
