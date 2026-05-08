package com.estore.inventory.service;

import com.estore.catalog.entity.Product;
import com.estore.catalog.repository.ProductRepository;
import com.estore.exception.ResourceNotFoundException;
import com.estore.inventory.entity.Inventory;
import com.estore.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventoryService {
    
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    
    public Integer getStockByProductId(Long productId) {
        return inventoryRepository.findByProductId(productId)
            .map(Inventory::getQuantity)
            .orElse(0);
    }
    
    @Transactional
    public boolean checkAvailability(Long productId, int requestedQuantity) {
        return inventoryRepository.findByProductId(productId)
            .map(inv -> inv.getQuantity() >= requestedQuantity)
            .orElse(false);
    }
    
    @Transactional
    public void reserveStock(Long productId, int quantity) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product: " + productId));
        
        if (inventory.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock for product: " + productId);
        }
        
        inventory.setQuantity(inventory.getQuantity() - quantity);
        inventoryRepository.save(inventory);
    }
    
    @Transactional
    public void updateStock(Long productId, int newQuantity) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
            .orElseGet(() -> {
                Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + productId));
                Inventory newInv = new Inventory();
                newInv.setProduct(product);
                return newInv;
            });
        
        inventory.setQuantity(newQuantity);
        inventoryRepository.save(inventory);
    }
}