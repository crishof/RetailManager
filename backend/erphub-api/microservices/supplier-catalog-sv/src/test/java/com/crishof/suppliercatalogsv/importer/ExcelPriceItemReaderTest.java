package com.crishof.suppliercatalogsv.importer;

import com.crishof.suppliercatalogsv.exception.ImportFileException;
import com.crishof.suppliercatalogsv.model.SupplierPriceItem;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ExcelPriceItemReaderTest {

    private final ExcelPriceItemReader reader = new ExcelPriceItemReader();

    @Test
    void shouldImportWhenHeadersUseSpanishAliases() throws IOException {
        List<String> headers = List.of("Marca", "Modelo", "Codigo", "Precio", "Moneda", "IVA");
        List<String> values = List.of("Acme", "M1", "ART-001", "1234,56", "ARS", "21%");

        List<SupplierPriceItem> items = readWorkbook(headers, values);

        assertEquals(1, items.size());
        SupplierPriceItem item = items.get(0);
        assertEquals("Acme", item.getBrand());
        assertEquals("M1", item.getModel());
        assertEquals("ART-001", item.getSupplierCode());
        assertEquals(new BigDecimal("1234.56"), item.getPrice());
        assertEquals("ARS", item.getCurrency());
        assertEquals(new BigDecimal("0.2100"), item.getTaxRate());
        assertNotNull(item.getLastUpdate());
    }

    @Test
    void shouldImportWhenHeadersHaveAccentsAndPunctuation() throws IOException {
        List<String> headers = List.of("Marca", "Modelo", "Cod", "Precio final ($)", "C\u00f3digo barras");
        List<String> values = List.of("Foo", "X2", "FOO-X2", "$ 1.999,99", "7791234567890");

        List<SupplierPriceItem> items = readWorkbook(headers, values);

        assertEquals(1, items.size());
        SupplierPriceItem item = items.get(0);
        assertEquals("Foo", item.getBrand());
        assertEquals("X2", item.getModel());
        assertEquals("FOO-X2", item.getSupplierCode());
        assertEquals(new BigDecimal("1999.99"), item.getPrice());
        assertEquals("7791234567890", item.getBarcode());
    }

    @Test
    void shouldFailWhenRequiredColumnsAreMissing() throws IOException {
        List<String> headers = List.of("Marca", "Precio");
        List<String> values = List.of("Acme", "10");

        ImportFileException ex = assertThrows(ImportFileException.class, () -> readWorkbook(headers, values));

        assertEquals("Missing required columns. Required: [brand, model, code] | Missing: [model, code]", ex.getMessage());
    }

    private List<SupplierPriceItem> readWorkbook(List<String> headers, List<String> rowValues) throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("items");
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.size(); i++) {
                headerRow.createCell(i).setCellValue(headers.get(i));
            }

            Row dataRow = sheet.createRow(1);
            for (int i = 0; i < rowValues.size(); i++) {
                dataRow.createCell(i).setCellValue(rowValues.get(i));
            }

            workbook.write(out);

            try (ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray())) {
                return reader.read(in, "test.xlsx");
            }
        }
    }
}

