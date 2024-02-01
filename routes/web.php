<?php

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

Route::get('/', function () {
    return Inertia::render('Index', [
        'user' => User::find(auth()->id())->only(['name', 'mode', 'todays_log_entry']),
    ]);
})->middleware('auth');

Route::get('/hello', function () {
    return Inertia::render('Login');
})->middleware('guest')->name('login');

Route::get('/auth/logout', function (Request $request): RedirectResponse {
    auth()->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return redirect('/');
})->middleware('auth')->name('logout');

/*
|--------------------------------------------------------------------------
| Socialite
|--------------------------------------------------------------------------
*/

Route::get('/auth/redirect', function () {
    return Socialite::driver('spotify')
        ->scopes(['playlist-modify-private', 'user-top-read'])
        ->redirect();
});

Route::get('/auth/callback', function () {
    $spotifyUser = Socialite::driver('spotify')->user();

    $user = User::updateOrCreate([
        'spotify_id' => $spotifyUser->id,
    ], [
        'name' => $spotifyUser->name,
        'access_token' => $spotifyUser->token,
        'refresh_token' => $spotifyUser->refreshToken,
        'access_token_expires_at' => now()->addSeconds($spotifyUser->expiresIn),
    ]);

    auth()->login($user);

    return redirect('/');
});
