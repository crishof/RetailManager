package com.retailmanager.suppliersv.service;

import com.retailmanager.suppliersv.dto.SupplierRequest;
import com.retailmanager.suppliersv.dto.SupplierResponse;
import com.retailmanager.suppliersv.exception.BusinessException;
import com.retailmanager.suppliersv.exception.ResourceNotFoundException;
import com.retailmanager.suppliersv.mapper.SupplierMapper;
import com.retailmanager.suppliersv.model.Supplier;
import com.retailmanager.suppliersv.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private static final String SUPPLIER_NOT_FOUND = "Supplier with id %s not found";
    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;

    @Override
    @Transactional
    public SupplierResponse create(SupplierRequest supplierRequest) {

        log.info("Creating supplier | name={}", supplierRequest.getName());

        Optional<Supplier> existing = supplierRepository.findByNameIncludingDeleted(supplierRequest.getName());

        if (existing.isPresent()) {
            Supplier supplier = existing.get();
            if (supplierRepository.existsById(supplier.getId())) {
                log.info("Restoring previously deleted supplier | id={} | name={}", supplier.getId(), supplierRequest.getName());
                supplierRepository.restoreById(supplier.getId());
                return supplierMapper.toDto(supplierRepository.save(supplier));
            }
            throw new IllegalArgumentException("Supplier with name '" + supplierRequest.getName() + "' already exists.");
        }
        Supplier supplier = supplierMapper.toEntity(supplierRequest);

        Supplier saved = supplierRepository.save(supplier);
        log.info("Supplier created | id={} | name={}", saved.getId(), saved.getName());
        return supplierMapper.toDto(saved);
    }

    @Override
    public List<SupplierResponse> findAll() {
        return supplierRepository.findAll().stream()
                .sorted(Comparator.comparing(Supplier::getName))
                .map(supplierMapper::toDto)
                .toList();
    }

    @Override
    public SupplierResponse findById(UUID id) {
        Supplier supplier = getSupplierOrThrow(id);
        return supplierMapper.toDto(supplier);
    }

    @Override
    @Transactional
    public SupplierResponse update(UUID id, SupplierRequest supplierRequest) {
        log.info("Updating supplier | id={} | name={}", id, supplierRequest.getName());
        Supplier supplier = getSupplierOrThrow(id);
        supplierMapper.updateEntityFromRequest(supplierRequest, supplier);
        return supplierMapper.toDto(supplierRepository.save(supplier));
    }

    @Override
    @Transactional
    public void delete(UUID id) {

        log.info("Deleting supplier | id={}", id);
        Supplier supplier = getSupplierOrThrow(id);
        supplierRepository.delete(supplier);
        log.info("Supplier deleted | id={}", id);

    }

    @Override
    public Long getSupplierCount() {
        return supplierRepository.count();
    }

    @Override
    @Transactional
    public SupplierResponse restore(UUID id) {

        log.info("Restoring supplier | id={}", id);
        supplierRepository.findByIdIncludingDeleted(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                String.format(SUPPLIER_NOT_FOUND, id)
                        )
                );
        if (!supplierRepository.existsById(id)) {
            throw new BusinessException(
                    "Supplier with id '" + id + "' is not deleted or does not exist."
            );
        }
        int updated = supplierRepository.restoreById(id);

        if (updated == 0) {
            throw new BusinessException(
                    "Failed to restore supplier with id '" + id + "'."
            );
        }
        log.info("Supplier restored | id={}", id);

        Supplier restored = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Supplier restored but not found with id '" + id + "'.")
                );
        return supplierMapper.toDto(restored);
    }

    // =========================
    // PRIVATE HELPERS
    // =========================
    private Supplier getSupplierOrThrow(UUID id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(String.format(SUPPLIER_NOT_FOUND, id)));
    }
}
