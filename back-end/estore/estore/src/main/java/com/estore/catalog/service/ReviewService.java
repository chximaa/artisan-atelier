package com.estore.catalog.service;

import com.estore.catalog.dto.ReviewRequest;
import com.estore.catalog.dto.ReviewResponse;
import com.estore.catalog.entity.Product;
import com.estore.catalog.entity.Review;
import com.estore.catalog.repository.ProductRepository;
import com.estore.catalog.repository.ReviewRepository;
import com.estore.customer.entity.User;
import com.estore.customer.repository.UserRepository;
import com.estore.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {
    
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public ReviewResponse addReview(ReviewRequest request) {
        Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Review review = new Review();
        review.setProduct(product);
        review.setUser(user);
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        
        Review savedReview = reviewRepository.save(review);
        return mapToResponse(savedReview);
    }
    
    public List<ReviewResponse> getReviewsByProduct(Long productId) {
        // Verify product exists
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found");
        }
        
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId).stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }
    
    public List<ReviewResponse> getReviewsByUser(Long userId) {
        return reviewRepository.findByUserId(userId).stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }
    
    public Double getProductAverageRating(Long productId) {
        return reviewRepository.getAverageRatingByProductId(productId);
    }
    
    private ReviewResponse mapToResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setProductId(review.getProduct().getId());
        response.setProductName(review.getProduct().getName());
        response.setUserId(review.getUser().getId());
        response.setUserFirstName(review.getUser().getFirstName());
        response.setUserLastName(review.getUser().getLastName());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        return response;
    }
}