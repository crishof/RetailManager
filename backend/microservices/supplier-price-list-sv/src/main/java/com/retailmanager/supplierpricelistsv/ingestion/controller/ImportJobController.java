package com.retailmanager.supplierpricelistsv.ingestion.controller;

import com.retailmanager.supplierpricelistsv.ingestion.dto.ImportJobResponse;
import com.retailmanager.supplierpricelistsv.ingestion.job.ImportJob;
import com.retailmanager.supplierpricelistsv.ingestion.service.ImportJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/import-jobs")
@RequiredArgsConstructor
public class ImportJobController {

    private final ImportJobService service;

    @PostMapping
    public ImportJobResponse start(
            @RequestParam MultipartFile file,
            @RequestParam UUID supplierId,
            @RequestParam(defaultValue = "false") boolean updateExisting
    ) throws IOException {

        Path tempFile = Files.createTempFile("price-import-", ".xlsx");
        file.transferTo(tempFile.toFile());

        ImportJob job = service.startImport(
                supplierId,
                tempFile.toString(),
                updateExisting
        );

        return ImportJobResponse.from(job);
    }

    @GetMapping("/{jobId}")
    public ImportJobResponse status(@PathVariable UUID jobId) {
        return ImportJobResponse.from(service.getJob(jobId));
    }
}