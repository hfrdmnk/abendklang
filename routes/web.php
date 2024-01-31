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
        'user' => User::find(auth()->id())->only(['name', 'mode', 'log_entries']),
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
        ->scopes(['playlist-modify-private'])
        ->redirect();
});

Route::get('/auth/callback', function () {
    $spotifyUser = Socialite::driver('spotify')->user();

    $user = User::updateOrCreate([
        'spotify_id' => $spotifyUser->id,
    ], [
        'name' => $spotifyUser->name,
        'token' => $spotifyUser->token,
        'refresh_token' => $spotifyUser->refreshToken,
        'expires_in' => now()->addSeconds($spotifyUser->expiresIn),
    ]);

    auth()->login($user);

    return redirect('/');
});
