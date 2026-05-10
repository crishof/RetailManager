package com.crishof.suppliercatalogsv.importer;

import com.crishof.suppliercatalogsv.dto.ImportResult;
import com.crishof.suppliercatalogsv.model.SupplierPriceItem;
import com.crishof.suppliercatalogsv.repository.SupplierPriceItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PriceItemImportServiceTest {

    @Mock
    private SupplierPriceItemRepository repository;

    private PriceItemImportService service;

    @BeforeEach
    void setUp() {
        service = new PriceItemImportService(repository);
    }

    @Test
    void shouldInsertWhenProductDoesNotExist() {
        UUID supplierId = UUID.randomUUID();
        SupplierPriceItem incoming = baseItem("ACME", "A-1");

        when(repository.findProductByBrandAndSupplierCodeAndSupplierId("ACME", "A-1", supplierId))
                .thenReturn(null);

        ImportResult result = service.importItems(List.of(incoming), supplierId, false);

        assertEquals(1, result.getTotal());
        assertEquals(1, result.getImported());
        assertEquals(1, result.getInserted());
        assertEquals(0, result.getUpdated());
        assertEquals(0, result.getSkipped());
        assertEquals(0, result.getFailed());

        ArgumentCaptor<SupplierPriceItem> captor = ArgumentCaptor.forClass(SupplierPriceItem.class);
        verify(repository).save(captor.capture());
        assertEquals(supplierId, captor.getValue().getSupplierId());
    }

    @Test
    void shouldSkipWhenProductExistsAndUpdateExistingIsFalse() {
        UUID supplierId = UUID.randomUUID();
        SupplierPriceItem incoming = baseItem("ACME", "A-1");
        SupplierPriceItem existing = baseItem("ACME", "A-1");

        when(repository.findProductByBrandAndSupplierCodeAndSupplierId("ACME", "A-1", supplierId))
                .thenReturn(existing);

        ImportResult result = service.importItems(List.of(incoming), supplierId, false);

        assertEquals(1, result.getTotal());
        assertEquals(0, result.getImported());
        assertEquals(0, result.getInserted());
        assertEquals(0, result.getUpdated());
        assertEquals(1, result.getSkipped());
        assertEquals(0, result.getFailed());

        verify(repository, never()).save(any(SupplierPriceItem.class));
    }

    @Test
    void shouldUpdateOnlyPriceAndTaxFieldsWhenProductExistsAndUpdateExistingIsTrue() {
        UUID supplierId = UUID.randomUUID();

        SupplierPriceItem existing = baseItem("ACME", "A-1");
        existing.setModel("OriginalModel");
        existing.setDescription("OriginalDescription");
        existing.setStockRaw("OriginalStock");
        existing.setPrice(new BigDecimal("10.00"));
        existing.setTaxRate(new BigDecimal("0.2100"));
        existing.setInternalTax(new BigDecimal("0.0500"));
        existing.setSuggestedPrice(new BigDecimal("12.00"));
        existing.setSuggestedWebPrice(new BigDecimal("13.00"));
        Instant previousUpdate = Instant.now().minusSeconds(3600);
        existing.setLastUpdate(previousUpdate);

        SupplierPriceItem incoming = baseItem("ACME", "A-1");
        incoming.setModel("NuevoModel");
        incoming.setDescription("NuevaDescription");
        incoming.setStockRaw("NuevoStock");
        incoming.setPrice(new BigDecimal("20.00"));
        incoming.setTaxRate(new BigDecimal("0.1050"));
        incoming.setInternalTax(new BigDecimal("0.0300"));
        incoming.setSuggestedPrice(new BigDecimal("22.00"));
        incoming.setSuggestedWebPrice(new BigDecimal("23.00"));

        when(repository.findProductByBrandAndSupplierCodeAndSupplierId("ACME", "A-1", supplierId))
                .thenReturn(existing);

        ImportResult result = service.importItems(List.of(incoming), supplierId, true);

        assertEquals(1, result.getTotal());
        assertEquals(1, result.getImported());
        assertEquals(0, result.getInserted());
        assertEquals(1, result.getUpdated());
        assertEquals(0, result.getSkipped());
        assertEquals(0, result.getFailed());

        verify(repository).save(existing);

        assertEquals("OriginalModel", existing.getModel());
        assertEquals("OriginalDescription", existing.getDescription());
        assertEquals("OriginalStock", existing.getStockRaw());
        assertEquals(new BigDecimal("20.00"), existing.getPrice());
        assertEquals(new BigDecimal("0.1050"), existing.getTaxRate());
        assertEquals(new BigDecimal("0.0300"), existing.getInternalTax());
        assertEquals(new BigDecimal("22.00"), existing.getSuggestedPrice());
        assertEquals(new BigDecimal("23.00"), existing.getSuggestedWebPrice());
        assertNotNull(existing.getLastUpdate());
        assertTrue(existing.getLastUpdate().isAfter(previousUpdate));
    }

    private SupplierPriceItem baseItem(String brand, String code) {
        SupplierPriceItem item = new SupplierPriceItem();
        item.setBrand(brand);
        item.setSupplierCode(code);
        item.setModel("M");
        item.setPrice(BigDecimal.ONE);
        item.setTaxRate(new BigDecimal("0.2100"));
        item.setInternalTax(new BigDecimal("0.0000"));
        item.setCurrency("ARS");
        item.setLastUpdate(Instant.now());
        return item;
    }
}