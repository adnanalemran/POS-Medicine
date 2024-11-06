<?php

namespace App\Http\Middleware;

use Closure;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class AuthMiddleware
{
    function makeApiCall($method, $url, $headers = [], $body = null)
    {
        $client = new Client();
        try {
            $response = $client->request($method, $url, [
                'headers' => $headers,
                'body' => json_encode($body),
            ]);
            return ['status' => true, 'response' => json_decode($response->getBody(), true)];
        } catch (GuzzleException $e) {
            return ['status' => false, 'message' => $e->getMessage()];
        }
    }


    public function handle(Request $request, Closure $next)
    {


        // $serviceUrl = env('SAAS_BASE_URL') . env('SAAS_AUTH_CHECK');
        // $serviceUrl = "http://35.240.201.91:8002/api/v1/auth/auth-check";
        //  $serviceUrl = "http://127.0.0.1:8000/api/v1/auth/auth-check";
      //$response = $this->makeApiCall('get', $serviceUrl, $request->header(), $request->all());
 
    $response = Http::withHeaders([
            'Authorization' => $request->header('Authorization'),
            'Content-Type' => 'application/json', // Set the appropriate content type for your request body
        ])->get(env('SAAS_MIDDLEWARE_URL','https://saasbackend.macrohealthplus.org/api/v1/auth/auth-check'));



        if ($response['status'] === 'success') {
            $db = $response['data']['user']['organization']['db_name'];

            // $db = 'pos_test';
            Config::set('database.connections.mysql.database', $db);
            app('db')->purge();
            $userData = app('authuser');
            $userData->user = $response['data']['user'];
            return $next($request);
        }

        return response(json_encode(['status' => false, 'message' => 'Authentication Failed'], 401), 401);


        // dd($userData->user);


        // $userData->user=[
        //     "id"=> 9,
        //     "name"=> "Keenan Stroman",
        //     "email"=> "manager2@gmail.com",
        //     "mobile"=> "9",
        //     "user_type"=> "manager",
        //     "organization_id"=> 10,
        //     "saas_user_id"=> null,
        //     "email_verified_at"=> "2022-11-01T04:42:33.000000Z",
        //     "created_at" => "2022-11-01T04:42:33.000000Z",
        //     "updated_at" => "2022-11-01T04:42:33.000000Z"
        // ];

        // hello
        // return $next($request);
    }
}
