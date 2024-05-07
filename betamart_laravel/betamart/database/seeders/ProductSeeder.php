<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Add this line

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Sample products and descriptions
        $products = [
            ['name' => 'Men\'s T-Shirt', 'description' => 'A comfortable and stylish t-shirt for men. Made from high-quality cotton fabric.'],
            ['name' => 'Women\'s Jeans', 'description' => 'Slim-fit jeans for women. Stretchable denim fabric with a flattering fit.'],
            ['name' => 'Running Shoes', 'description' => 'Lightweight and breathable running shoes. Ideal for jogging and workouts.'],
            ['name' => 'Hooded Sweatshirt', 'description' => 'Warm and cozy hooded sweatshirt. Perfect for chilly evenings.'],
            ['name' => 'Sports Bra', 'description' => 'Supportive sports bra for active women. Provides comfort and stability during workouts.'],
            ['name' => 'Men\'s Dress Shirt', 'description' => 'Classic dress shirt for men. Suitable for formal occasions or office wear.'],
            ['name' => 'Yoga Leggings', 'description' => 'Stretchy and comfortable leggings for yoga practice. Allows for freedom of movement and flexibility.'],
            ['name' => 'Winter Jacket', 'description' => 'Insulated winter jacket with a waterproof shell. Keeps you warm and dry in cold weather conditions.'],
            ['name' => 'Men\'s Polo Shirt', 'description' => 'Casual polo shirt for men. Perfect for everyday wear.'],
            ['name' => 'Women\'s Blouse', 'description' => 'Elegant blouse for women. Great for formal occasions or work attire.'],
            ['name' => 'Sneakers', 'description' => 'Versatile sneakers suitable for various activities.'],
            ['name' => 'Denim Jacket', 'description' => 'Classic denim jacket for a timeless look.'],
            ['name' => 'Hiking Boots', 'description' => 'Sturdy hiking boots for outdoor adventures.'],
            ['name' => 'Leggings with Pockets', 'description' => 'Functional leggings with side pockets for storing essentials.'],
            ['name' => 'Raincoat', 'description' => 'Waterproof raincoat to keep you dry during rainy days.'],
            ['name' => 'Leather Belt', 'description' => 'High-quality leather belt for a polished look.'],
        ];

        // Create each product using the factory
        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => rand(1000, 10000) / 100 // Random price between 10 and 100 with 2 decimal places
            ]);
        }
    }
}
