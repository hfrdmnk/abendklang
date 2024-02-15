<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login()
    {
        return Inertia::render('Login');
    }

    public function updateTimezone(Request $request): RedirectResponse
    {
        $request->validate([
            'timezone' => ['required', 'string', 'timezone'],
        ]);

        $user = User::find(auth()->id());

        $user->timezone = $request['timezone'];
        $user->save();

        return redirect()->route('index');
    }
}
