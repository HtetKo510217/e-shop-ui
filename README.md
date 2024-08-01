
# E-Shop

E-Shop is a modern eCommerce web application built with a Laravel backend and a React frontend. The app offers a seamless shopping experience with a responsive design, category-based navigation, search functionality, and user account management.

## Features

- **Product Browsing:** View products by category, search for specific items, and see detailed product descriptions.
- **Shopping Cart:** Add products to your cart and manage your selections before checkout.
- **User Authentication:** Secure user signup and login features.
- **Order History:** View past orders and track order history.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Motion Animation:** Smooth UI transitions and animations for an enhanced user experience.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Laravel, RESTful API
- **Database:** (Specify your database, e.g., MySQL)
- **Deployment:** (Specify if deployed, e.g., Netlify, Heroku, etc.)

## Installation

### Prerequisites

- Node.js
- npm or yarn
- PHP
- Composer
- MySQL (or your database choice)

### Backend Setup

1. **Clone the repository:**

   ```bash
   https://github.com/HtetKo510217/e-shop-api
    ```

2. **Install PHP dependencies:**

   ```bash
   composer install
   ```

3. **Set up environment variables:**

   Copy the \`.env.example\` file to \`.env\` and update the database and other necessary configurations.

   ```bash
   cp .env.example .env
   ```

4. **Generate application key:**

   ```bash
   php artisan key:generate
   ```

5. **Run migrations:**

   ```bash
   php artisan migrate
   ```

6. **Start the Laravel development server:**

   ```bash
   php artisan serve
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install JavaScript dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the React development server:**

   ```bash
   npm start
   # or
   yarn start
   ```

   The app will be available at \`http://localhost:3000\`.

## Usage

1. **Browse Products:** Use the navigation bar to explore products by categories or search for specific items.
2. **Manage Cart:** Add items to your cart, view your selections, and proceed to checkout.
3. **User Account:** Sign up or log in to manage your orders and view your order history.

## API Endpoints

- **GET /api/categories** - Fetch all product categories.
- **GET /api/products** - Fetch all products or filter by category.
- **POST /api/cart** - Add a product to the cart.
- **POST /api/orders** - Place an order.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Laravel](https://laravel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
