package com.retailmanager.customersv.service;

import com.retailmanager.customersv.client.OrderClient;
import com.retailmanager.customersv.exception.BusinessException;
import com.retailmanager.customersv.exception.ResourceNotFoundException;
import com.retailmanager.customersv.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerDeletionService {

    private final CustomerRepository customerRepository;
    private final OrderClient orderClient;

    @Transactional
    public void forceDelete(UUID id) {

        log.info("Force deleting customer | id={}", id);

        customerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer with id %s not found".formatted(id)));

        boolean hasOrders = orderClient.hasOrdersForCustomer(id);
        if (hasOrders) {
            throw new BusinessException("Cannot delete customer because it is used by products");
        }

        customerRepository.forceDelete(id);

        log.info("Customer force deleted | id={}", id);
    }
}