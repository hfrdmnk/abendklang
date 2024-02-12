<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function logout(Request $request): RedirectResponse
    {
        auth()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('index'));
    }

    public function redirect()
    {
        return Socialite::driver('spotify')
            ->scopes(['user-top-read', 'user-library-read'])
            ->redirect();
    }

    public function callback()
    {
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

        return redirect(route('index'));
    }
}
