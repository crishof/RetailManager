package com.crishof.suppliercatalogsv.importer;

import com.crishof.suppliercatalogsv.model.SupplierPriceItem;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ExcelPriceItemReaderNumericTest {

    private ExcelPriceItemReader excelPriceItemReader;
    private Workbook workbook;

    @BeforeEach
    void setUp() {
        excelPriceItemReader = new ExcelPriceItemReader();
        workbook = new XSSFWorkbook();
    }

    @Test
    void testFormulaHandling() throws IOException {
        // Test: Excel formulas should be sanitized (treated as null)
        var sheet = workbook.createSheet();
        
        var headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("brand");
        headerRow.createCell(1).setCellValue("code");
        headerRow.createCell(2).setCellValue("model");
        headerRow.createCell(3).setCellValue("price");
        
        var dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("TestBrand");
        dataRow.createCell(1).setCellValue("TEST001");
        dataRow.createCell(2).setCellValue("Model1");
        dataRow.createCell(3).setCellValue("+IF(Tabla1[ [#This Row], [PMPI]]=\"SÍ\", +Tabla1[ [#This Row], [PVL]]*1.055,\"-\")");
        
        var bytes = getWorkbookBytes();
        var items = excelPriceItemReader.read(new java.io.ByteArrayInputStream(bytes), "test.xlsx");
        
        assertEquals(1, items.size());
        var item = items.get(0);
        assertEquals("TestBrand", item.getBrand());
        // Formula should be sanitized to null, so price defaults to 0
        assertEquals(BigDecimal.ZERO, item.getPrice());
    }

    @Test
    void testEuropeanNumericFormat() throws IOException {
        // Test: European format 2.731.840 (separador de miles)
        var sheet = workbook.createSheet();
        
        var headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("brand");
        headerRow.createCell(1).setCellValue("code");
        headerRow.createCell(2).setCellValue("model");
        headerRow.createCell(3).setCellValue("price");
        
        var dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("TestBrand");
        dataRow.createCell(1).setCellValue("TEST002");
        dataRow.createCell(2).setCellValue("Model1");
        // European format: 2.731.840 (should be 2,731,840 not 2.73)
        dataRow.createCell(3).setCellValue("2.731.840");
        
        var bytes = getWorkbookBytes();
        var items = excelPriceItemReader.read(new java.io.ByteArrayInputStream(bytes), "test.xlsx");
        
        assertEquals(1, items.size());
        var item = items.get(0);
        // Should parse as 2731840, not as 2.73
        assertEquals(new BigDecimal("2731840"), item.getPrice());
    }

    @Test
    void testEuropeanNumericFormatWithDecimal() throws IOException {
        // Test: European format 2.731,8 (con decimal)
        var sheet = workbook.createSheet();
        
        var headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("brand");
        headerRow.createCell(1).setCellValue("code");
        headerRow.createCell(2).setCellValue("model");
        headerRow.createCell(3).setCellValue("price");
        
        var dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("TestBrand");
        dataRow.createCell(1).setCellValue("TEST003");
        dataRow.createCell(2).setCellValue("Model1");
        // European format: 2.731,8 (should be 2,731.8 not 2.73)
        dataRow.createCell(3).setCellValue("2.731,8");
        
        var bytes = getWorkbookBytes();
        var items = excelPriceItemReader.read(new java.io.ByteArrayInputStream(bytes), "test.xlsx");
        
        assertEquals(1, items.size());
        var item = items.get(0);
        assertEquals(new BigDecimal("2731.8"), item.getPrice());
    }

    @Test
    void testStockRawTruncation() throws IOException {
        // Test: stock_raw with value exceeding 50 chars should be truncated
        var sheet = workbook.createSheet();
        
        var headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("brand");
        headerRow.createCell(1).setCellValue("code");
        headerRow.createCell(2).setCellValue("model");
        headerRow.createCell(3).setCellValue("stock");
        
        var dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("TestBrand");
        dataRow.createCell(1).setCellValue("TEST004");
        dataRow.createCell(2).setCellValue("Model1");
        // Formula (which will be sanitized to null)
        dataRow.createCell(3).setCellValue("+IF(Tabla1[ [#This Row], [PMPI]]=\"SÍ\", +Tabla1[ [#This Row], [PVL]]*1.055,\"-\")");
        
        var bytes = getWorkbookBytes();
        var items = excelPriceItemReader.read(new java.io.ByteArrayInputStream(bytes), "test.xlsx");
        
        assertEquals(1, items.size());
        var item = items.get(0);
        // Formula should be sanitized to null
        assertNull(item.getStockRaw());
    }

    @Test
    void testStockKeepsRawProviderValueWhenStkAndDisponibilidadExist() throws IOException {
        var sheet = workbook.createSheet();

        var headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("brand");
        headerRow.createCell(1).setCellValue("code");
        headerRow.createCell(2).setCellValue("model");
        headerRow.createCell(3).setCellValue("STK");
        headerRow.createCell(4).setCellValue("Disponibilidad");

        var dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("TestBrand");
        dataRow.createCell(1).setCellValue("TEST005");
        dataRow.createCell(2).setCellValue("Model1");
        dataRow.createCell(3).setCellValue("<10");
        dataRow.createCell(4).setCellFormula("IF(D2=\"No\",\"Sin STK\",\"STK disponible\")");

        var bytes = getWorkbookBytes();
        var items = excelPriceItemReader.read(new java.io.ByteArrayInputStream(bytes), "test.xlsx");

        assertEquals(1, items.size());
        var item = items.get(0);
        assertEquals("<10", item.getStockRaw());
    }

    private byte[] getWorkbookBytes() throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        return bos.toByteArray();
    }
}
