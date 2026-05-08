-- =========================
-- USERS
-- =========================
INSERT INTO users VALUES
(1,'2026-04-20 16:02:36','john@example.com','John','Doe','password123'),
(2,'2026-04-20 16:02:36','jane@example.com','Jane','Smith','password123'),
(3,'2026-04-20 16:04:45','alice@example.com','Alice','Johnson','password123');

-- =========================
-- CATEGORIES
-- =========================
INSERT INTO categories VALUES
(1,'Gadgets, devices, and electronic equipment','Electronics'),
(2,'Fashion apparel and accessories','Clothing'),
(3,'Books, magazines, and publications','Books'),
(4,'Kitchenware, utensils and tools','Kitchenware');

-- =========================
-- PRODUCTS
-- =========================
INSERT INTO products VALUES
(1,'High-performance laptop with 16GB RAM, 512GB SSD','http://localhost:8080/images/products/Laptop Pro.jpeg','Laptop Pro',1299.99,1),
(2,'Latest smartphone with 5G, 128GB storage','http://localhost:8080/images/products/Smartphone X.jpeg','Smartphone X',899.99,1),
(3,'Comfortable 100% cotton t-shirt','http://localhost:8080/images/products/Cotton T-Shirt.jpeg','Cotton T-Shirt',19.99,2),
(4,'Bestselling mystery thriller','http://localhost:8080/images/products/Mystery Novel.jpeg','Mystery Novel',14.99,3),
(5,'Blue Comfortable Adidas Specialz shoes','http://localhost:8080/images/products/Blue Sneakers.jpeg','Blue Sneakers',89.99,2),
(6,'Handmade Ceramic Mug','http://localhost:8080/images/products/Ceramic Cup.jpeg','Ceramic Cup',9.89,4),
(7,'Flower Necklace','http://localhost:8080/images/products/Necklace.jpeg','Necklace',10.59,2),
(8,'Canon Camera','http://localhost:8080/images/products/Canon Camera.jpeg','Canon Camera',259.99,1),
(9,'Men Jacket','http://localhost:8080/images/products/Mens Jacket.jpeg','Mens Jacket',89.59,2),
(10,'Set of 6 Self Helping Books','http://localhost:8080/images/products/Set of 6 Books.jpeg','Set of 6 Books',100.99,3),
(11,'Set of 6 Handmade Ceramic Plates','http://localhost:8080/images/products/Plate Set.jpeg','Plate Set',219.99,4),
(12,'High-performance iPad with 8GB RAM, 128GB Storage','http://localhost:8080/images/products/iPad Air.jpeg','iPad Air',619.99,1),
(13,'Handmade Ceramic Mug','http://localhost:8080/images/products/Handmade Mug.jpeg','Handmade Mug',19.99,4);

-- =========================
-- CARTS
-- =========================
INSERT INTO carts VALUES
(1,1),
(2,2),
(3,3);

-- =========================
-- CART ITEMS
-- =========================
INSERT INTO cart_items VALUES
(1,1,1299.99,1,1);

-- =========================
-- INVENTORIES
-- =========================
INSERT INTO inventories VALUES
(1,8,1),
(2,12,2),
(3,49,3),
(4,29,4),
(5,3,5),
(6,20,6),
(8,58,9),
(9,12,10),
(10,25,11),
(11,20,12),
(12,11,13);

-- =========================
-- ORDERS
-- =========================
INSERT INTO orders VALUES
(1,'2026-04-21 19:31:44','CONFIRMED',2719.96,1),
(2,'2026-04-23 14:54:25','CONFIRMED',114.87,2),
(3,'2026-04-23 16:20:43','CONFIRMED',649.95,2),
(4,'2026-04-24 21:53:00','CONFIRMED',1299.99,2),
(5,'2026-04-25 10:00:00','CONFIRMED',2179.97,2);

-- =========================
-- ORDER ITEMS
-- =========================
INSERT INTO order_items VALUES
(1,3,2699.97,899.99,1,2),
(2,1,19.99,19.99,1,3),
(3,1,89.99,89.99,2,5),
(4,1,14.99,14.99,2,4),
(5,1,9.89,9.89,2,6),
(6,1,89.99,89.99,3,5),
(7,2,519.98,259.99,3,8),
(8,2,39.98,19.99,3,13),
(9,1,1299.99,1299.99,4,1),
(10,1,1299.99,1299.99,5,1),
(11,1,619.99,619.99,5,12),
(12,1,259.99,259.99,5,8);

-- =========================
-- PROFILES
-- =========================
INSERT INTO profiles VALUES
(1,NULL,NULL,NULL,NULL,NULL,3);

-- =========================
-- REVIEWS
-- =========================
INSERT INTO reviews VALUES
(1,'Amazing laptop, very fast and smooth performance. Perfect for development work!','2026-04-25 00:00:00',5,1,1);