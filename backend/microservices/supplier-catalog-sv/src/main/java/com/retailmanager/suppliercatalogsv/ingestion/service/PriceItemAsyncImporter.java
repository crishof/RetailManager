package com.retailmanager.suppliercatalogsv.ingestion.service;

import com.retailmanager.suppliercatalogsv.dto.ImportResult;
import com.retailmanager.suppliercatalogsv.importer.ExcelPriceItemReader;
import com.retailmanager.suppliercatalogsv.importer.PriceItemImportService;
import com.retailmanager.suppliercatalogsv.ingestion.job.ImportJob;
import com.retailmanager.suppliercatalogsv.ingestion.job.ImportJobRepository;
import com.retailmanager.suppliercatalogsv.ingestion.job.ImportStatus;
import com.retailmanager.suppliercatalogsv.model.SupplierPriceItem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PriceItemAsyncImporter {

    private final ImportJobRepository jobRepository;
    private final ExcelPriceItemReader excelReader;
    private final PriceItemImportService importService;

    @Async("importTaskExecutor")
    public void runImport(UUID jobId) {

        ImportJob job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalStateException("ImportJob not found: " + jobId));

        log.info("Async import started | jobId={}", jobId);

        try {
            job.setStatus(ImportStatus.RUNNING);
            jobRepository.save(job);

            Path path = Path.of(job.getFilePath());

            try (InputStream is = Files.newInputStream(path)) {

                List<SupplierPriceItem> items = excelReader.read(is, path.getFileName().toString());

                ImportResult result = importService.importItems(
                        items,
                        job.getSupplierId(),
                        job.isUpdateExisting()
                );

                job.setInserted(result.inserted());
                job.setUpdated(result.updated());
                job.setFailed(0);
                job.setStatus(ImportStatus.COMPLETED);
            }
        } catch (Exception e) {
            log.error("Async import failed | jobId={}", jobId, e);

            job.setStatus(ImportStatus.FAILED);
            job.setError(e.getMessage());

        } finally {
            job.setFinishedAt(Instant.now());
            jobRepository.save(job);

            try {
                Files.deleteIfExists(Path.of(job.getFilePath()));
            } catch (Exception e) {
                log.warn("Unable to delete temp file {}", job.getFilePath(), e);
            }
        }
    }
}
