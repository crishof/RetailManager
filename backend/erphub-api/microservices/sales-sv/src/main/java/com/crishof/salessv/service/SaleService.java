package com.crishof.salessv.service;

import com.crishof.salessv.dto.SaleRequest;
import com.crishof.salessv.dto.SaleResponse;

import java.util.List;
import java.util.UUID;

public interface SaleService {
    List<SaleResponse> getAll();
    SaleResponse getById(UUID id);
    SaleResponse save(SaleRequest request);
    List<SaleResponse> getByCustomerId(UUID customerId);
    List<SaleResponse> getByBranchId(UUID branchId);
}
