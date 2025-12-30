package com.retailmanager.supplierpricelistsv.service;

import com.retailmanager.supplierpricelistsv.dto.ImportResult;
import com.retailmanager.supplierpricelistsv.importer.PriceItemImportService;
import com.retailmanager.supplierpricelistsv.model.SupplierPriceItem;
import com.retailmanager.supplierpricelistsv.repository.SupplierPriceItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PriceItemImportServiceTest {

    @Mock
    private SupplierPriceItemRepository repository;

    @InjectMocks
    private PriceItemImportService service;

    private UUID supplierId;

    @BeforeEach
    void setUp() {
        supplierId = UUID.randomUUID();
    }

    @Test
    void shouldInsertNewItems() {

        SupplierPriceItem newItem = createItem("JBL", "PSB-1");

        when(repository.findProductByBrandAndSupplierCodeAndSupplierId(
                "JBL", "PSB-1", supplierId
        )).thenReturn(null);

        ImportResult result = service.importItems(
                List.of(newItem),
                supplierId,
                true
        );

        verify(repository, times(1)).save(any(SupplierPriceItem.class));

        assertEquals(1, result.inserted());
        assertEquals(0, result.updated());
    }

    @Test
    void shouldUpdateExistingItemWhenUpdateEnabled() {

        SupplierPriceItem existing = createItem("Sony", "XB-20");
        existing.setId(UUID.randomUUID());
        existing.setPrice(new BigDecimal("1000"));

        SupplierPriceItem incoming = createItem("Sony", "XB-20");
        incoming.setPrice(new BigDecimal("2000"));

        when(repository.findProductByBrandAndSupplierCodeAndSupplierId(
                "Sony", "XB-20", supplierId
        )).thenReturn(existing);

        ImportResult result = service.importItems(
                List.of(incoming),
                supplierId,
                true
        );

        verify(repository).save(existing);

        assertEquals(new BigDecimal("2000"), existing.getPrice());
        assertEquals(0, result.inserted());
        assertEquals(1, result.updated());
    }

    @Test
    void shouldNotUpdateExistingItemWhenUpdateDisabled() {

        SupplierPriceItem existing = createItem("LG", "SB-100");
        existing.setId(UUID.randomUUID());
        existing.setPrice(new BigDecimal("500"));

        SupplierPriceItem incoming = createItem("LG", "SB-100");
        incoming.setPrice(new BigDecimal("900"));

        when(repository.findProductByBrandAndSupplierCodeAndSupplierId(
                "LG", "SB-100", supplierId
        )).thenReturn(existing);

        ImportResult result = service.importItems(
                List.of(incoming),
                supplierId,
                false
        );

        assertEquals(new BigDecimal("500"), existing.getPrice());
        assertEquals(0, result.inserted());
        assertEquals(0, result.updated());
    }

    @Test
    void shouldMergeOnlyUpdatableFields() {

        SupplierPriceItem target = createItem("Apple", "HP-1");
        target.setId(UUID.randomUUID());
        target.setPrice(new BigDecimal("100"));
        target.setCurrency("$");
        target.setStockRaw("NO");

        SupplierPriceItem source = createItem("Apple", "HP-1");
        source.setPrice(new BigDecimal("150"));
        source.setCurrency("USD");
        source.setStockRaw("> 10");

        when(repository.findProductByBrandAndSupplierCodeAndSupplierId(
                "Apple", "HP-1", supplierId
        )).thenReturn(target);

        service.importItems(List.of(source), supplierId, true);

        assertEquals(new BigDecimal("150"), target.getPrice());
        assertEquals("USD", target.getCurrency());
        assertEquals("> 10", target.getStockRaw());
        assertEquals("Apple", target.getBrand());
    }

    @Test
    void shouldHandleMultipleItemsMixedInsertAndUpdate() {

        SupplierPriceItem existing = createItem("JBL", "GO-3");
        existing.setId(UUID.randomUUID());

        SupplierPriceItem incomingExisting = createItem("JBL", "GO-3");
        SupplierPriceItem incomingNew = createItem("Sony", "XB-33");

        when(repository.findProductByBrandAndSupplierCodeAndSupplierId(
                "JBL", "GO-3", supplierId
        )).thenReturn(existing);

        when(repository.findProductByBrandAndSupplierCodeAndSupplierId(
                "Sony", "XB-33", supplierId
        )).thenReturn(null);

        ImportResult result = service.importItems(
                List.of(incomingExisting, incomingNew),
                supplierId,
                true
        );

        assertEquals(1, result.inserted());
        assertEquals(1, result.updated());
    }

    // ---------------- HELPERS ----------------

    private SupplierPriceItem createItem(
            String brand,
            String supplierCode
    ) {
        SupplierPriceItem item = new SupplierPriceItem();
        item.setBrand(brand);
        item.setSupplierCode(supplierCode);
        item.setPrice(new BigDecimal("100"));
        item.setTaxRate(new BigDecimal("0.21"));
        item.setCurrency("$");
        item.setLastUpdate(Instant.now());
        return item;
    }
}