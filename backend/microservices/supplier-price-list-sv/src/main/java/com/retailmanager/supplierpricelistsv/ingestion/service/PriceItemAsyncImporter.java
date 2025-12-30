package com.retailmanager.supplierpricelistsv.ingestion.service;

import com.retailmanager.supplierpricelistsv.dto.ImportResult;
import com.retailmanager.supplierpricelistsv.ingestion.job.ImportJob;
import com.retailmanager.supplierpricelistsv.ingestion.job.ImportJobRepository;
import com.retailmanager.supplierpricelistsv.ingestion.job.ImportStatus;
import com.retailmanager.supplierpricelistsv.service.PriceItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PriceItemAsyncImporter {

    private final ImportJobRepository jobRepository;
    private final PriceItemService priceItemService;

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

                MultipartFile multipartFile = new MockMultipartFile(
                        path.getFileName().toString(),
                        path.getFileName().toString(),
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        is
                );

                ImportResult result = priceItemService.importFile(
                        multipartFile,
                        job.getSupplierId(),
                        job.isUpdateExisting()
                );
//TODO: remove sleep
                Thread.sleep(10_000); // Simulate long processing

                job.setInserted(result.inserted());
                job.setUpdated(result.updated());
                job.setFailed(0);
                job.setStatus(ImportStatus.COMPLETED);
            }
//TODO: catch specific exceptions from priceItemService.importFile
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