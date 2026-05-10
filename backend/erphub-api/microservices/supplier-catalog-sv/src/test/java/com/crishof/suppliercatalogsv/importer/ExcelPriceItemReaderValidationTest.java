package com.crishof.suppliercatalogsv.importer;

import com.crishof.suppliercatalogsv.model.SupplierPriceItem;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ExcelPriceItemReaderValidationTest {

    private ExcelPriceItemReader excelPriceItemReader;
    private Workbook workbook;

    @BeforeEach
    void setUp() {
        excelPriceItemReader = new ExcelPriceItemReader();
        workbook = new XSSFWorkbook();
    }

    @Test
    void testRejectRowWithMissingBrand() throws IOException {
        var sheet = workbook.createSheet();
        
        var headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("brand");
        headerRow.createCell(1).setCellValue("code");
        headerRow.createCell(2).setCellValue("model");
        
        // Missing brand (null/empty)
        var dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("");
        dataRow.createCell(1).setCellValue("TEST001");
        dataRow.createCell(2).setCellValue("Model1");
        
        var bytes = getWorkbookBytes();
        var items = excelPriceItemReader.read(new java.io.ByteArrayInputStream(bytes), "test.xlsx");
        
        // Should be rejected (empty list)
        assertEquals(0, items.size(), "Row with missing brand should be rejected");
    }

    @Test
    void testRejectRowWithMissingCode() throws IOException {
        var sheet = workbook.createSheet();
        
        var headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("brand");
        headerRow.createCell(1).setCellValue("code");
        headerRow.createCell(2).setCellValue("model");
        
        // Missing code (null/empty)
        var dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("TestBrand");
        dataRow.createCell(1).setCellValue("");
        dataRow.createCell(2).setCellValue("Model1");
        
        var bytes = getWorkbookBytes();
        var items = excelPriceItemReader.read(new java.io.ByteArrayInputStream(bytes), "test.xlsx");
        
        // Should be rejected
        assertEquals(0, items.size(), "Row with missing code should be rejected");
    }

    @Test
    void testRejectRowWithMissingModel() throws IOException {
        var sheet = workbook.createSheet();
        
        var headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("brand");
        headerRow.createCell(1).setCellValue("code");
        headerRow.createCell(2).setCellValue("model");
        
        // Missing model (null/empty)
        var dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("TestBrand");
        dataRow.createCell(1).setCellValue("TEST001");
        dataRow.createCell(2).setCellValue("");
        
        var bytes = getWorkbookBytes();
        var items = excelPriceItemReader.read(new java.io.ByteArrayInputStream(bytes), "test.xlsx");
        
        // Should be rejected
        assertEquals(0, items.size(), "Row with missing model should be rejected");
    }

    @Test
    void testRejectRowWithFormulaInCode() throws IOException {
        var sheet = workbook.createSheet();
        
        var headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("brand");
        headerRow.createCell(1).setCellValue("code");
        headerRow.createCell(2).setCellValue("model");
        
        // Formula in code column (will be sanitized to null)
        var dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("TestBrand");
        dataRow.createCell(1).setCellValue("=IF(A1>0,\"YES\",\"NO\")");
        dataRow.createCell(2).setCellValue("Model1");
        
        var bytes = getWorkbookBytes();
        var items = excelPriceItemReader.read(new java.io.ByteArrayInputStream(bytes), "test.xlsx");
        
        // Should be rejected because formula → null → invalid
        assertEquals(0, items.size(), "Row with formula in code should be rejected");
    }

    @Test
    void testAcceptValidRow() throws IOException {
        var sheet = workbook.createSheet();
        
        var headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("brand");
        headerRow.createCell(1).setCellValue("code");
        headerRow.createCell(2).setCellValue("model");
        
        // Valid row
        var dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("TestBrand");
        dataRow.createCell(1).setCellValue("TEST001");
        dataRow.createCell(2).setCellValue("Model1");
        
        var bytes = getWorkbookBytes();
        var items = excelPriceItemReader.read(new java.io.ByteArrayInputStream(bytes), "test.xlsx");
        
        assertEquals(1, items.size(), "Valid row should be accepted");
        var item = items.get(0);
        assertEquals("TestBrand", item.getBrand());
        assertEquals("TEST001", item.getSupplierCode());
        assertEquals("Model1", item.getModel());
    }

    private byte[] getWorkbookBytes() throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        return bos.toByteArray();
    }
}
