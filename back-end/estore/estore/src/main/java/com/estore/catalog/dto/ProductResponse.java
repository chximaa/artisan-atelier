package com.estore.catalog.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private Long categoryId;
    private String categoryName;
    private Integer availableQuantity;
    
    // New fields for reviews
    private Double averageRating;
    private Long reviewCount;
}