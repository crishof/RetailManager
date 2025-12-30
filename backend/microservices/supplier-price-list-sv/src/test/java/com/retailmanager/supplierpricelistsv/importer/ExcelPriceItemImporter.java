package com.retailmanager.supplierpricelistsv.importer;

import com.retailmanager.supplierpricelistsv.exception.ImportFileException;
import com.retailmanager.supplierpricelistsv.model.SupplierPriceItem;
import com.retailmanager.supplierpricelistsv.util.TestExcelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ExcelPriceItemReaderTest {

    private ExcelPriceItemReader reader;

    @BeforeEach
    void setUp() {
        reader = new ExcelPriceItemReader();
    }

    @Test
    void shouldReadMinimalRequiredColumns() {
        MultipartFile file = TestExcelFactory.createExcel(
                List.of("brand", "model", "price"),
                List.of("JBL", "PSB-1", "16.441,74")
        );

        List<SupplierPriceItem> items = reader.read(file);

        assertEquals(1, items.size());
        SupplierPriceItem item = items.getFirst();

        assertEquals("JBL", item.getBrand());
        assertEquals("PSB-1", item.getModel());
        assertEquals(new BigDecimal("16441.74"), item.getPrice());
        assertEquals("$", item.getCurrency()); // default
    }

    @Test
    void shouldParseLatamPricesAndPercentTax() {
        MultipartFile file = TestExcelFactory.createExcel(
                List.of("brand", "model", "price", "tax-rate"),
                List.of("Sony", "XB-20", "98.282,21", "10,5%")
        );

        SupplierPriceItem item = reader.read(file).getFirst();

        assertEquals(new BigDecimal("98282.21"), item.getPrice());
        assertEquals(new BigDecimal("0.1050"), item.getTaxRate());
    }

    @Test
    void shouldHandleUsFormattedPrices() {
        MultipartFile file = TestExcelFactory.createExcel(
                List.of("brand", "model", "price"),
                List.of("Apple", "HomePod", "1,261,673.31")
        );

        SupplierPriceItem item = reader.read(file).getFirst();

        assertEquals(new BigDecimal("1261673.31"), item.getPrice());
    }

    @Test
    void shouldKeepStockRawAsIs() {
        MultipartFile file = TestExcelFactory.createExcel(
                List.of("brand", "model", "price", "stock"),
                List.of("JBL", "Xtreme", "10000", "> 10")
        );

        SupplierPriceItem item = reader.read(file).getFirst();

        assertEquals("> 10", item.getStockRaw());
    }

    @Test
    void shouldDefaultTaxRateWhenInvalid() {
        MultipartFile file = TestExcelFactory.createExcel(
                List.of("brand", "model", "price", "tax-rate"),
                List.of("LG", "SoundBar", "50000", "invalid")
        );

        SupplierPriceItem item = reader.read(file).getFirst();

        assertEquals(new BigDecimal("0.21"), item.getTaxRate());
    }

    @Test
    void shouldTruncateLongDescription() {
        String longDescription = "A".repeat(500);

        MultipartFile file = TestExcelFactory.createExcel(
                List.of("brand", "model", "price", "description"),
                List.of("Sony", "HT-X", "1000", longDescription)
        );

        SupplierPriceItem item = reader.read(file).getFirst();

        assertEquals(255, item.getDescription().length());
    }

    @Test
    void shouldThrowIfRequiredHeadersMissing() {
        MultipartFile file = TestExcelFactory.createExcel(
                List.of("brand", "model"), // price missing
                List.of("JBL", "PSB-1")
        );

        assertThrows(
                ImportFileException.class,
                () -> reader.read(file)
        );
    }

    @Test
    void shouldIgnoreUnknownColumns() {
        MultipartFile file = TestExcelFactory.createExcel(
                List.of("brand", "model", "price", "unknown-column"),
                List.of("JBL", "GO-3", "3000", "whatever")
        );

        SupplierPriceItem item = reader.read(file).getFirst();

        assertEquals("JBL", item.getBrand());
        assertEquals(new BigDecimal("3000"), item.getPrice());
    }
}