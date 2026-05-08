package com.estore.catalog.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.estore.catalog.dto.CategoryResponse;
import com.estore.catalog.dto.ProductResponse;
import com.estore.catalog.entity.Category;
import com.estore.catalog.entity.Product;
import com.estore.catalog.repository.CategoryRepository;
import com.estore.catalog.repository.ProductRepository;
import com.estore.exception.ResourceNotFoundException;
import com.estore.inventory.repository.InventoryRepository;
import com.estore.catalog.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CatalogService {
    
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final InventoryRepository inventoryRepository;
    private final ReviewService reviewService;
    private final ReviewRepository reviewRepository;
    
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
            .map(this::mapToProductResponse)
            .collect(Collectors.toList());
    }
    
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return mapToProductResponse(product);
    }
    
    public List<ProductResponse> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
            .map(this::mapToProductResponse)
            .collect(Collectors.toList());
    }
    
    public List<ProductResponse> searchProducts(String keyword) {
        return productRepository.searchByKeyword(keyword).stream()
            .map(this::mapToProductResponse)
            .collect(Collectors.toList());
    }
    
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
            .map(this::mapToCategoryResponse)
            .collect(Collectors.toList());
    }
    
    private ProductResponse mapToProductResponse(Product product) {
    ProductResponse response = new ProductResponse();
    response.setId(product.getId());
    response.setName(product.getName());
    response.setDescription(product.getDescription());
    response.setPrice(product.getPrice());
    response.setImageUrl(product.getImageUrl());
    
    if (product.getCategory() != null) {
        response.setCategoryId(product.getCategory().getId());
        response.setCategoryName(product.getCategory().getName());
    }
    
    // Get available quantity from Inventory
    inventoryRepository.findByProductId(product.getId())
        .ifPresent(inv -> response.setAvailableQuantity(inv.getQuantity()));
    
    // Get rating information
    Double avgRating = reviewService.getProductAverageRating(product.getId());
    response.setAverageRating(avgRating != null ? avgRating : 0.0);
    response.setReviewCount(reviewRepository.getReviewCountByProductId(product.getId()));
    
    return response;
}
    
    private CategoryResponse mapToCategoryResponse(Category category) {
        CategoryResponse response = new CategoryResponse();
        response.setId(category.getId());
        response.setName(category.getName());
        response.setDescription(category.getDescription());
        return response;
    }
}