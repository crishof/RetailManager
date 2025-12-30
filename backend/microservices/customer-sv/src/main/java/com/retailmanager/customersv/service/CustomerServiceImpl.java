package com.retailmanager.customersv.service;

import com.retailmanager.customersv.dto.CustomerRequest;
import com.retailmanager.customersv.dto.CustomerResponse;
import com.retailmanager.customersv.exception.BusinessException;
import com.retailmanager.customersv.exception.ResourceNotFoundException;
import com.retailmanager.customersv.mapper.CustomerMapper;
import com.retailmanager.customersv.model.Customer;
import com.retailmanager.customersv.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    private static final String CUSTOMER_NOT_FOUND = "Customer with id %s not found";

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    @Transactional
    public CustomerResponse create(CustomerRequest customerRequest) {

        log.info("Creating customer | lastname={} | name={}", customerRequest.getLastname(), customerRequest.getName());

        Optional<Customer> existing = customerRepository.findByDniIncludingDeleted(customerRequest.getDni());

        if (existing.isPresent()) {
            Customer customer = existing.get();
            if (customerRepository.existsDeletedById(customer.getId())) {
                log.info("Restoring previously deleted customer | id={} | dni={}", customer.getId(), customerRequest.getDni());
                customerRepository.restoreById(customer.getId());
                return customerMapper.toDto(customerRepository.save(customer));
            }
            throw new IllegalArgumentException("Customer with DNI '" + customerRequest.getDni() + "' already exists.");
        }
        Customer customer = customerMapper.toEntity(customerRequest);

        Customer saved = customerRepository.save(customer);
        log.info("Customer created | id={} | dni={}", saved.getId(), saved.getDni());
        return customerMapper.toDto(saved);
    }

    @Override
    public List<CustomerResponse> findAll() {

        log.debug("Fetching all customers");

        return customerRepository.findAll()
                .stream()
                .sorted(Comparator
                        .comparing(Customer::getLastname)
                        .thenComparing(Customer::getName))
                .map(customerMapper::toDto)
                .toList();
    }

    @Override
    public CustomerResponse findById(UUID id) {
        Customer customer = getCustomerOrThrow(id);
        return customerMapper.toDto(customer);
    }

    @Override
    @Transactional
    public CustomerResponse update(UUID id, CustomerRequest customerRequest) {
        log.info("Updating customer | id={} | name={}", id, customerRequest.getName());
        Customer customer = getCustomerOrThrow(id);
        customerMapper.updateEntityFromRequest(customerRequest, customer);
        return customerMapper.toDto(customerRepository.save(customer));
    }

    @Override
    @Transactional
    public void delete(UUID id) {

        log.info("Deleting customer | id={}", id);
        Customer customer = getCustomerOrThrow(id);
        customerRepository.delete(customer);
        log.info("Customer deleted | id={}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public Long getCustomerCount() {
        return customerRepository.count();
    }

    @Override
    @Transactional
    public CustomerResponse restore(UUID id) {

        log.info("Restoring customer | id={}", id);
        customerRepository.findByIdIncludingDeleted(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                String.format(CUSTOMER_NOT_FOUND, id)
                        )
                );
        if (!customerRepository.existsById(id)) {
            throw new BusinessException(
                    "Customer with id '" + id + "' is not deleted."
            );
        }
        int updated = customerRepository.restoreById(id);

        if (updated == 0) {
            throw new BusinessException(
                    "Failed to restore customer with id '" + id + "'."
            );
        }
        log.info("Customer restored | id={}", id);

        Customer restored = customerRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalStateException("Customer restored but not found")
                );
        return customerMapper.toDto(restored);
    }

    // =========================
    // PRIVATE HELPERS
    // =========================
    private Customer getCustomerOrThrow(UUID id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(String.format(CUSTOMER_NOT_FOUND, id)));
    }
}
