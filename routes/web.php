<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
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

Route::get('/', [UserController::class, 'index'])->middleware('auth')->name('index');
Route::post('/update-timezone', [UserController::class, 'updateTimezone'])->middleware('auth')->name('timezone.update');

Route::get('/hello', [UserController::class, 'login'])->middleware('guest')->name('login');

/*
|--------------------------------------------------------------------------
| Socialite
|--------------------------------------------------------------------------
*/


Route::get('/auth/redirect', [AuthController::class, 'redirect'])->middleware('guest');
Route::get('/auth/callback', [AuthController::class, 'callback'])->middleware('guest');

Route::get('/auth/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');
