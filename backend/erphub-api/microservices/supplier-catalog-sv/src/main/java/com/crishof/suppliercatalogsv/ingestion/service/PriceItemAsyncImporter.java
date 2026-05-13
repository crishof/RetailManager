package com.crishof.suppliercatalogsv.ingestion.service;

import com.crishof.suppliercatalogsv.dto.ImportResult;
import com.crishof.suppliercatalogsv.importer.ExcelPriceItemReader;
import com.crishof.suppliercatalogsv.importer.PriceItemImportService;
import com.crishof.suppliercatalogsv.ingestion.job.ImportJob;
import com.crishof.suppliercatalogsv.ingestion.job.ImportJobRepository;
import com.crishof.suppliercatalogsv.ingestion.job.ImportStatus;
import com.crishof.suppliercatalogsv.model.SupplierPriceItem;
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

                job.setInserted(result.getInserted());
                job.setUpdated(result.getUpdated());
                job.setFailed(result.getFailed());
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
