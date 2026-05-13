package com.crishof.purchasesv.repository;

import com.crishof.purchasesv.model.SupplierPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SupplierPaymentRepository extends JpaRepository<SupplierPayment, UUID> {

    List<SupplierPayment> findAllBySupplierIdOrderByPaymentDateDesc(UUID supplierId);
}
