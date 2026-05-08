package com.estore.catalog.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewResponse {
    private Long id;
    private Long productId;
    private String productName;
    private Long userId;
    private String userFirstName;
    private String userLastName;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}