<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();
        return response()->json($user);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function store(Request $request)
    {
        User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User added successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Verify current password
        if (!$user || !Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Incorrect current password'], 403);
        }

        // Update user information
        $user->username = $request->input('username');
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User removed successfully']);
    }

    public function login(Request $request)
    {
        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json(['user' => $user]);
    }
}
