
# 🧵 Artisan Atelier

A full-stack e-commerce web application for products, built with<br>
**React**, **Spring Boot**, and **MySQL**.<br>
The platform allows users to browse products, apply filters, manage a wishlist, place<br>
orders, and track purchases through a secure authentication system.

---

## 🚀 Features

* 🔐 User authentication (JWT-based login & signup)
* 🛍️ Product catalog with detailed product pages
* 🔎 Advanced filtering and search system
* ❤️ Wishlist management
* 🛒 Shopping cart functionality
* 📦 Order placement and tracking
* 👤 User dashboard (orders & account info)
* ⚙️ REST API powered backend
* 🗄️ Persistent database with MySQL

---

## 🧱 Tech Stack

### Frontend

* React.js
* HTML5 / CSS3
* JavaScript (ES6+)

### Backend

* Spring Boot
* Spring Security (authentication)
* Spring Data JPA
* RESTful APIs

### Database

* MySQL

### Tools

* Git & GitHub
* Maven

---

## 🏗️ Architecture

```text
Frontend (React)
      ↓ REST API
Backend (Spring Boot)
      ↓ JPA/Hibernate
MySQL Database
```

---

## 📸 Screenshots

### 🏠 Home Page

![Home](https://raw.githubusercontent.com/chximaa/Artisan-Atelier/71986144583169bb01ba73001e5e1ba4e84bdd5b/images/homepage.jpg)

### 🔐 Login

![Login](https://raw.githubusercontent.com/chximaa/Artisan-Atelier/71986144583169bb01ba73001e5e1ba4e84bdd5b/images/login.jpg)

### 🆕 Signup

![Signup](https://raw.githubusercontent.com/chximaa/Artisan-Atelier/71986144583169bb01ba73001e5e1ba4e84bdd5b/images/signup.jpg)

### 🛍️ Product Details

![Product](https://raw.githubusercontent.com/chximaa/Artisan-Atelier/71986144583169bb01ba73001e5e1ba4e84bdd5b/images/product_des.jpg)

### 🔎 Filters

![Filter](https://raw.githubusercontent.com/chximaa/Artisan-Atelier/71986144583169bb01ba73001e5e1ba4e84bdd5b/images/filter.jpg)

### 📊 Filter Bar

![Filter Bar](https://raw.githubusercontent.com/chximaa/Artisan-Atelier/71986144583169bb01ba73001e5e1ba4e84bdd5b/images/filter_bar.jpg)

### ❤️ Wishlist

![Wishlist](https://raw.githubusercontent.com/chximaa/Artisan-Atelier/71986144583169bb01ba73001e5e1ba4e84bdd5b/images/wishlist.jpg)

### 🛒 Cart

![Cart](https://raw.githubusercontent.com/chximaa/Artisan-Atelier/71986144583169bb01ba73001e5e1ba4e84bdd5b/images/cart.jpg)

### 📦 Orders

![Orders](https://raw.githubusercontent.com/chximaa/Artisan-Atelier/71986144583169bb01ba73001e5e1ba4e84bdd5b/images/orders.jpg)

### 👁️ View Orders

![View Orders](https://raw.githubusercontent.com/chximaa/Artisan-Atelier/71986144583169bb01ba73001e5e1ba4e84bdd5b/images/view_orders.jpg)

---

## ⚙️ Installation & Setup

### 1. Clone repository

```bash
git clone https://github.com/chximaa/Artisan-Atelier.git
cd Artisan-Atelier
```

---

### 2. Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

Make sure your `application.properties` is configured:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/artisan_atelier
spring.datasource.username=root
spring.datasource.password=your_password
```

---

### 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 🗄️ Database

* MySQL schema handles:<br>
  *carts<br>
  *categories<br> 
  *inventories<br>
  *order_items<br>
  *orders<br>
  *products<br>
  *profiles<br>
  *reviews<br>
  *users<br>
  

