package com.estore.shopping.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class CartResponse {
    private Long id;
    private Long userId;
    private List<CartItemResponse> items = new ArrayList<>();
    private BigDecimal totalAmount;
    private int totalItems;
}