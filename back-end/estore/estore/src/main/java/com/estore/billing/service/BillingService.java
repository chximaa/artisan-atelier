package com.estore.billing.service;

import com.estore.billing.dto.OrderItemResponse;
import com.estore.billing.dto.OrderResponse;
import com.estore.billing.entity.Order;
import com.estore.billing.entity.OrderItem;
import com.estore.billing.repository.OrderItemRepository;
import com.estore.billing.repository.OrderRepository;
import com.estore.customer.entity.User;
import com.estore.customer.repository.UserRepository;
import com.estore.exception.ResourceNotFoundException;
import com.estore.inventory.service.InventoryService;
import com.estore.shopping.entity.Cart;
import com.estore.shopping.entity.CartItem;
import com.estore.shopping.repository.CartRepository;
import com.estore.shopping.service.ShoppingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillingService {
    
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final InventoryService inventoryService;
    private final ShoppingService shoppingService;
    
    @Transactional
    public OrderResponse createOrder(Long userId) {
        // Get user
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        // Get cart
        Cart cart = cartRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Cart is empty"));
        
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cannot create order from empty cart");
        }
        
        // Check stock for all items
        for (CartItem item : cart.getItems()) {
            if (!inventoryService.checkAvailability(item.getProduct().getId(), item.getQuantity())) {
                throw new RuntimeException("Insufficient stock for product: " + item.getProduct().getName());
            }
        }
        
        // Create order
        Order order = new Order();
        order.setUser(user);
        order.setStatus("CONFIRMED");
        
        BigDecimal total = BigDecimal.ZERO;
        
        // Create order items and reserve stock
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getUnitPrice());
            
            BigDecimal subtotal = cartItem.getUnitPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            orderItem.setSubtotal(subtotal);
            total = total.add(subtotal);
            
            order.getItems().add(orderItem);
            
            // Reserve stock
            inventoryService.reserveStock(cartItem.getProduct().getId(), cartItem.getQuantity());
        }
        
        order.setTotalAmount(total);
        Order savedOrder = orderRepository.save(order);
        
        // Clear cart
        shoppingService.clearCart(userId);
        
        return mapToOrderResponse(savedOrder);
    }
    
    public List<OrderResponse> getUserOrders(Long userId) {
        // Verify user exists
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId).stream()
            .map(this::mapToOrderResponse)
            .collect(Collectors.toList());
    }
    
    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        return mapToOrderResponse(order);
    }
    
    private OrderResponse mapToOrderResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setUserId(order.getUser().getId());
        response.setUserFirstName(order.getUser().getFirstName());
        response.setUserLastName(order.getUser().getLastName());
        response.setUserEmail(order.getUser().getEmail());
        response.setOrderDate(order.getOrderDate());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus());
        
        for (OrderItem item : order.getItems()) {
            OrderItemResponse itemResponse = new OrderItemResponse();
            itemResponse.setId(item.getId());
            itemResponse.setProductId(item.getProduct().getId());
            itemResponse.setProductName(item.getProduct().getName());
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setUnitPrice(item.getUnitPrice());
            itemResponse.setSubtotal(item.getSubtotal());
            response.getItems().add(itemResponse);
        }
        
        return response;
    }
}