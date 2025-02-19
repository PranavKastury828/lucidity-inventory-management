# 🛍️ Inventory Management Application

A feature-rich inventory management web application built with **React**, **TypeScript**, **Redux Toolkit**, and **TailwindCSS**. This application allows admins to seamlessly manage products and provides users with a clean interface to view the inventory.

---

## 🚀 Features

### **Admin View**
- **Edit Products**: Modify details like title, category, price, and quantity via a user-friendly modal. The `value` field dynamically updates as the product of `price` and `quantity`.
- **Delete Products**: Remove products from the inventory with a confirmation dialog.
- **Disable Products**: Mark a product as inactive. Disabled rows are visually distinct with strikethrough and faded text, and actions like edit or delete are disabled.

### **User View**
- View-only access to the product list.
- All action buttons are disabled for a secure, restricted experience.

### **Dynamic Widgets**
Real-time updates for:
- **Total Products**: Count of all active products.
- **Total Store Value**: Automatically calculated as the sum of `price * quantity` for all products.
- **Out-of-Stock Items**: Number of products with a quantity of 0.
- **Number of Categories**: Count of unique product categories.

---

## 🛠️ Tech Stack

- **ReactJS**: Component-based UI framework.
- **TypeScript**: For strong typing and maintainable code.
- **Redux Toolkit**: State management for dynamic UI updates.
- **TailwindCSS**: Utility-first CSS framework for consistent and responsive design.
- **Vite**: Lightning-fast development environment.

---


---

## 🖥️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/pranavkastury828/inventory-management.git
cd inventory-management

npm install

npm run dev

npm run build
```
## 🤝 Acknowledgments

This project was an exciting and fun opportunity to showcase my skills. It was a joy to implement features like dynamic state updates, modular components, and responsive design. Working on this assignment for Lucidity allowed me to refine my problem-solving and UI design skills.

Thank you, Lucidity, for the opportunity to work on this assignment and demonstrate my capabilities. I truly enjoyed the process and would be thrilled to collaborate further!

