package com.estore.config;

import com.estore.catalog.entity.Category;
import com.estore.catalog.entity.Product;
import com.estore.catalog.repository.CategoryRepository;
import com.estore.catalog.repository.ProductRepository;
import com.estore.customer.entity.User;
import com.estore.customer.repository.UserRepository;
import com.estore.inventory.entity.Inventory;
import com.estore.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final InventoryRepository inventoryRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Create categories if none exist
        if (categoryRepository.count() == 0) {
            Category electronics = new Category();
            electronics.setName("Electronics");
            electronics.setDescription("Gadgets, devices, and electronic equipment");
            categoryRepository.save(electronics);
            
            Category clothing = new Category();
            clothing.setName("Clothing");
            clothing.setDescription("Fashion apparel and accessories");
            categoryRepository.save(clothing);
            
            Category books = new Category();
            books.setName("Books");
            books.setDescription("Books, magazines, and publications");
            categoryRepository.save(books);
            
            // Create products
            Product laptop = new Product();
            laptop.setName("Laptop Pro");
            laptop.setDescription("High-performance laptop with 16GB RAM, 512GB SSD");
            laptop.setPrice(new BigDecimal("1299.99"));
            laptop.setImageUrl("https://via.placeholder.com/300x200?text=Laptop");
            laptop.setCategory(electronics);
            productRepository.save(laptop);
            
            Product smartphone = new Product();
            smartphone.setName("Smartphone X");
            smartphone.setDescription("Latest smartphone with 5G, 128GB storage");
            smartphone.setPrice(new BigDecimal("899.99"));
            smartphone.setImageUrl("https://via.placeholder.com/300x200?text=Smartphone");
            smartphone.setCategory(electronics);
            productRepository.save(smartphone);
            
            Product tshirt = new Product();
            tshirt.setName("Cotton T-Shirt");
            tshirt.setDescription("Comfortable 100% cotton t-shirt");
            tshirt.setPrice(new BigDecimal("19.99"));
            tshirt.setImageUrl("https://via.placeholder.com/300x200?text=TShirt");
            tshirt.setCategory(clothing);
            productRepository.save(tshirt);
            
            Product novel = new Product();
            novel.setName("Mystery Novel");
            novel.setDescription("Bestselling mystery thriller");
            novel.setPrice(new BigDecimal("14.99"));
            novel.setImageUrl("https://via.placeholder.com/300x200?text=Book");
            novel.setCategory(books);
            productRepository.save(novel);
            
            // Create inventory
            Inventory inv1 = new Inventory();
            inv1.setProduct(laptop);
            inv1.setQuantity(10);
            inventoryRepository.save(inv1);
            
            Inventory inv2 = new Inventory();
            inv2.setProduct(smartphone);
            inv2.setQuantity(15);
            inventoryRepository.save(inv2);
            
            Inventory inv3 = new Inventory();
            inv3.setProduct(tshirt);
            inv3.setQuantity(50);
            inventoryRepository.save(inv3);
            
            Inventory inv4 = new Inventory();
            inv4.setProduct(novel);
            inv4.setQuantity(30);
            inventoryRepository.save(inv4);
        }
        
        // Create test user if none exists
        if (userRepository.count() == 0) {
            User testUser = new User();
            testUser.setFirstName("John");
            testUser.setLastName("Doe");
            testUser.setEmail("john@example.com");
            testUser.setPassword("password123");
            userRepository.save(testUser);
            
            User testUser2 = new User();
            testUser2.setFirstName("Jane");
            testUser2.setLastName("Smith");
            testUser2.setEmail("jane@example.com");
            testUser2.setPassword("password123");
            userRepository.save(testUser2);
        }
    }
}