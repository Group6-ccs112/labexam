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
            ['username' => 'admin', 'password' => '1234'],
            ['username' => 'jane123', 'password' => 'password456'],
            ['username' => 'alice123', 'password' => 'password789'],
            ['username' => 'bob123', 'password' => 'passwordabc'],
        ];

        // Create each user
        foreach ($users as $user) {
            User::create([
                'username' => $user['username'],
                'password' => Hash::make($user['password']),
            ]);
        }
    }
}
