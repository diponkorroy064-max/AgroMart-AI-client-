# 🛒 AgroMart Client 🍎

![AgroMart Banner](https://via.placeholder.com/1200x300/007bff/ffffff?text=AgroMart+Client)

AgroMart is a modern agriculture marketplace platform where farmers can sell fresh agricultural products, sellers can manage inventory, customers can browse and purchase products, and administrators can manage the entire platform. This repository contains the frontend application for AgroMart, built with Next.js.

---

## 🚀 Live Demo

**Frontend:**
[https://your-client-url.vercel.app](https://your-client-url.vercel.app)

**Backend API:**
[https://your-api-url.com](https://your-api-url.com)

---

## ✨ Features

AgroMart Client offers a rich set of features to provide a seamless marketplace experience:

*   **🔐 JWT Authentication:** Secure user authentication and authorization.
*   **🧑‍💻 Role-based Dashboards:** Tailored dashboards for Admin, Farmer, and Seller roles.
*   **🧑‍💼 Admin Dashboard:** Comprehensive tools for platform management.
*   **🧑‍🌾 Farmer Dashboard:** Manage products, view orders, and update profiles.
*   **🛍️ Seller Dashboard:** Manage inventory, process orders, and track sales.
*   **📦 Product Management:** Create, update, and delete product listings.
*   **🔍 Product Details:** Detailed views for individual products.
*   **🔎 Search Products:** Easily find products using a powerful search functionality.
*   **🏷️ Category Filtering:** Filter products by various categories.
*   **⬆️⬇️ Sorting Products:** Sort products based on different criteria (e.g., price, popularity).
*   **🛒 Shopping Cart:** Add, remove, and manage items in the shopping cart.
*   **📱 Responsive Design:** Optimal viewing experience across all devices.
*   **🌓 Dark / Light Theme:** User-friendly theme switching.
*   **🔒 Protected Routes:** Secure access to sensitive areas based on user roles.
*   **📊 Beautiful Dashboard UI:** Intuitive and aesthetically pleasing user interfaces for all dashboards.

---

## 🛠️ Tech Stack

The AgroMart Client is built using cutting-edge web technologies to ensure a robust, scalable, and maintainable application.

| Category   | Technology     | Description                                     |
| :--------- | :------------- | :---------------------------------------------- |
| Framework  | Next.js        | React framework for production                  |
| UI Library | React          | JavaScript library for building user interfaces |
| Language   | TypeScript     | Superset of JavaScript that adds static types   |
| Styling    | Tailwind CSS   | Utility-first CSS framework                     |
| State Mgmt | React Context API | React's built-in state management               |
| Data Fetch | Fetch API      | Web API for making network requests             |
| Icons      | Lucide React   | Beautiful & customizable open-source icons      |
| Forms      | React Hook Form | Performant, flexible and extensible forms       |
| Theming    | Next Themes    | Easy-to-use library for managing themes in Next.js apps |

---

## 📁 Folder Structure

The project follows a modular and organized folder structure for better maintainability and scalability.

```
src/
│
├── app/                  # Next.js app router pages, layouts, and API routes
├── components/           # Reusable UI components
│   ├── dashboard/        # Dashboard specific components
│   ├── forms/            # Form related components
│   ├── home/             # Home page specific components
│   ├── icons/            # Icon components
│   ├── layout/           # Layout components (headers, footers, sidebars)
│   └── ui/               # General UI components (buttons, cards, etc.)
├── contexts/             # React Context API providers
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── hooks/                # Custom React hooks
│   └── withAuth.tsx
├── lib/                  # Utility functions and API integrations
│   ├── api/              # API service configurations and calls
│   └── utils/            # General utility functions
├── types/                # TypeScript type definitions
│   ├── auth.ts
│   ├── Order.ts
│   └── Product.ts
├── utils/                # Additional helper utilities
└── styles/               # Global styles and Tailwind CSS configurations
```

---

## ⚙️ Installation

Follow these steps to get your development environment set up.

### ⬇️ Clone the repository

```bash
git clone <repository-url>
```

### ➡️ Navigate to the client directory

```bash
cd client
```

### 📦 Install dependencies

```bash
npm install
```

### 🏃 Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🏗️ Build for production

```bash
npm run build
```

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variable to your `.env.local` file:

`NEXT_PUBLIC_API_URL`

**Example `.env.local`:**

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production to the `.next` folder.
*   `npm run start`: Runs the built app in production mode.
*   `npm run lint`: Runs ESLint to check for code style issues.

---

## 👥 User Roles

AgroMart supports distinct user roles, each with specific permissions and dashboard functionalities.

| Role     | Permissions                                                 | Dashboard Features                                      |
| :------- | :---------------------------------------------------------- | :------------------------------------------------------ |
| **Admin** | Full control over users, products, and orders               | User Management, Product Management, Order Management, Dashboard Analytics |
| **Farmer** | Add, edit, and delete their own products; view their orders | Product Management, Order Viewing, Profile Management   |
| **Seller** | Manage their listed products and customer orders            | Product Management, Order Management, Dashboard Overview, Profile Management |
| **Customer** | Browse products, add to cart, checkout, view own orders     | Product Browsing, Product Details, Shopping Cart, Checkout, Order History |

---

## 📸 Screenshots

Here are some glimpses of the AgroMart Client in action:

### Home Page
![Home Page](https://via.placeholder.com/800x450/007bff/ffffff?text=AgroMart+Home+Page)

### Products Page
![Products Page](https://via.placeholder.com/800x450/007bff/ffffff?text=AgroMart+Products+Page)

### Dashboard
![Dashboard](https://via.placeholder.com/800x450/007bff/ffffff?text=AgroMart+Dashboard)

### Admin Panel
![Admin Panel](https://via.placeholder.com/800x450/007bff/ffffff?text=AgroMart+Admin+Panel)

### Product Details
![Product Details](https://via.placeholder.com/800x450/007bff/ffffff?text=AgroMart+Product+Details+Page)

---

## 🔮 Future Improvements

We are continuously working to enhance AgroMart. Here are some features planned for future releases:

*   **💳 Payment Gateway Integration:** Secure and seamless payment processing.
*   **❤️ Wishlist Functionality:** Users can save products for later.
*   **⭐ Reviews & Ratings:** Allow customers to rate and review products.
*   **🔔 Notifications System:** Real-time updates for orders, messages, etc.
*   **💬 Chat System:** Direct communication between buyers and sellers.
*   **🤖 AI Product Recommendation:** Personalized product suggestions.
*   **📈 Inventory Analytics:** Advanced insights for sellers and farmers.
*   **📧 Email Verification:** Enhance security and user trust.
*   **🚚 Order Tracking:** Live tracking of product delivery.

---

## 🤝 Contributing

We welcome contributions to the AgroMart Client! To contribute, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch:** `git checkout -b feature/your-feature-name`
3.  **Make your changes** and ensure they follow the project's coding standards.
4.  **Commit your changes:** `git commit -m "feat: Add your feature"`
5.  **Push to your branch:** `git push origin feature/your-feature-name`
6.  **Open a Pull Request** to the `main` branch of the original repository.

---

## 📝 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

## 🧑‍💻 Author

**Diponkor Roy**

*   **GitHub:** [https://github.com/diponkorroy064-max](https://github.com/diponkorroy064-max)
*   **LinkedIn:** [https://www.linkedin.com/in/diponkorroy21010504](https://www.linkedin.com/in/diponkorroy21010504)
*   **Portfolio:** [https://my-first-portfolio-two-eta.vercel.app](https://my-first-portfolio-two-eta.vercel.app)
