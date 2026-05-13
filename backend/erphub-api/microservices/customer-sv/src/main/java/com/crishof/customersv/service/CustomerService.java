package com.crishof.customersv.service;

import com.crishof.customersv.dto.CustomerMergeResponse;
import com.crishof.customersv.dto.CustomerRequest;
import com.crishof.customersv.dto.CustomerResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CustomerService {

    CustomerResponse create(CustomerRequest customerRequest);

    Page<CustomerResponse> getAll(Pageable pageable);

    CustomerResponse getById(UUID id);

    CustomerResponse update(UUID id, CustomerRequest customerRequest);

    void delete(UUID id);

    void forceDelete(UUID id);

    Long getCustomerCount();

    CustomerResponse restore(UUID id);

    CustomerMergeResponse mergeCustomerInto(@NotNull UUID id, @NotNull UUID targetCustomerId);

    java.util.List<CustomerResponse> search(String searchTerm);
}
