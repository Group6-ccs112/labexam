<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Sample users with names, emails, and passwords
        $users = [
            ['name' => 'john123', 'email' => 'john@example.com', 'password' => 'password123'],
            ['name' => 'jane123', 'email' => 'jane@example.com', 'password' => 'password456'],
            ['name' => 'alice123', 'email' => 'alice@example.com', 'password' => 'password789'],
            ['name' => 'bob123', 'email' => 'bob@example.com', 'password' => 'passwordabc'],
        ];

        // Create each user
        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
            ]);
        }
    }
}
