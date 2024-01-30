<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
  return Inertia::render('Index');
});

Route::get('/auth', function () {
  return Inertia::render('Login');
});

/*
|--------------------------------------------------------------------------
| Socialite
|--------------------------------------------------------------------------
*/

Route::get('/auth/redirect', function () {
  return Socialite::driver('spotify')->redirect();
});

Route::get('/auth/callback', function () {
  $user = Socialite::driver('spotify')->user();
  dd($user);
});
