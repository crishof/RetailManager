package com.retailmanager.supplierpricelistsv.importer;

import com.retailmanager.supplierpricelistsv.exception.ImportFileException;
import com.retailmanager.supplierpricelistsv.model.SupplierPriceItem;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@Slf4j
public class ExcelPriceItemReader {

    private static final int MAX_LENGTH = 255;
    private static final BigDecimal DEFAULT_TAX_RATE = new BigDecimal("0.21");
    private static final BigDecimal ONE_HUNDRED = BigDecimal.valueOf(100);

    public List<SupplierPriceItem> read(MultipartFile file) {

        try (InputStream is = file.getInputStream();
             Workbook workbook = WorkbookFactory.create(is)) {

            Sheet sheet = workbook.getSheetAt(0);

            if (sheet.getPhysicalNumberOfRows() < 2) {
                throw new ImportFileException("Excel file has no data rows");
            }

            List<String> headers = extractHeaders(sheet.getRow(0));
            validateHeaders(headers);

            return parseRows(sheet, headers);

        } catch (IOException | EncryptedDocumentException e) {
            log.error("Failed to read excel file", e);
            throw new ImportFileException("Error reading excel file");
        }
    }

    // ---------------- PRIVATE ----------------

    private List<String> extractHeaders(Row headerRow) {
        List<String> headers = new ArrayList<>();
        headerRow.forEach(cell ->
                headers.add(cell.getStringCellValue().toLowerCase().trim())
        );
        return headers;
    }

    private void validateHeaders(List<String> headers) {
        Set<String> headerSet = new HashSet<>(headers);

        List<String> required = List.of("brand", "code", "price");

        if (!headerSet.containsAll(required)) {
            throw new ImportFileException(
                    "Missing required columns: " + required
            );
        }
    }

    private List<SupplierPriceItem> parseRows(Sheet sheet, List<String> headers) {
        List<SupplierPriceItem> items = new ArrayList<>();
        DataFormatter formatter = new DataFormatter();

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            SupplierPriceItem item = new SupplierPriceItem();
            parseRow(row, headers, formatter, item);
            item.setLastUpdate(Instant.now());

            items.add(item);
        }
        return items;
    }

    private void parseRow(
            Row row,
            List<String> headers,
            DataFormatter formatter,
            SupplierPriceItem item
    ) {
        for (int col = 0; col < headers.size(); col++) {
            Cell cell = row.getCell(col);
            String value = formatter.formatCellValue(cell);

            applyCell(item, headers.get(col), value);
        }
    }

    private void applyCell(SupplierPriceItem item, String header, String value) {

        switch (header) {
            case "brand" -> item.setBrand(value);
            case "code" -> item.setSupplierCode(emptyToNull(value));
            case "model" -> item.setModel(emptyToNull(value));
            case "description" -> item.setDescription(truncate(value));
            case "category" -> item.setCategory(emptyToNull(value));
            case "price" -> item.setPrice(parseBigDecimal(value));
            case "tax-rate" -> item.setTaxRate(parseTaxRate(value));
            case "suggested-price" -> item.setSuggestedPrice(parseBigDecimal(value));
            case "suggested-web-price" -> item.setSuggestedWebPrice(parseBigDecimal(value));
            case "stock" -> item.setStockRaw(emptyToNull(value));
            case "bar-code" -> item.setBarcode(emptyToNull(value));
            case "currency" -> item.setCurrency(value.isBlank() ? "$" : value);
            default -> log.debug("Skipping unmapped column: {}", value);
        }
    }

    private String emptyToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }

    private String truncate(String value) {
        if (value == null) return null;
        return value.length() > MAX_LENGTH ? value.substring(0, MAX_LENGTH) : value;
    }

    private BigDecimal parseBigDecimal(String value) {
        if (value == null || value.isBlank()) return BigDecimal.ZERO;
        try {
            return new BigDecimal(value.replace(",", "").trim());
        } catch (NumberFormatException _) {
            return BigDecimal.ZERO;
        }
    }

    private BigDecimal parseTaxRate(String rawValue) {

        if (rawValue == null || rawValue.isBlank()) {
            return DEFAULT_TAX_RATE;
        }

        boolean isPercentage = rawValue.contains("%");

        String normalized = rawValue
                .replace("%", "")
                .replace(",", ".")
                .trim();

        try {
            BigDecimal rate = new BigDecimal(normalized);

            if (isPercentage) {
                return rate.divide(ONE_HUNDRED, 4, RoundingMode.HALF_UP);
            }

            return rate;

        } catch (NumberFormatException _) {
            return DEFAULT_TAX_RATE;
        }
    }
}