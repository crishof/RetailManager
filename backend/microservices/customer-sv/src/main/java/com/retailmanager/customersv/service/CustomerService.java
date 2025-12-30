package com.retailmanager.customersv.service;

import com.retailmanager.customersv.dto.CustomerRequest;
import com.retailmanager.customersv.dto.CustomerResponse;

import java.util.List;
import java.util.UUID;

public interface CustomerService {

    CustomerResponse create(CustomerRequest customerRequest);

    List<CustomerResponse> findAll();

    CustomerResponse findById(UUID id);

    CustomerResponse update(UUID id, CustomerRequest customerRequest);

    void delete(UUID id);

    Long getCustomerCount();

    CustomerResponse restore(UUID id);
}
