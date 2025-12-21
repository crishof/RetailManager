package com.retailmanager.supplierpricelistsv.ingestion.service;

import com.retailmanager.supplierpricelistsv.ingestion.job.ImportJob;
import com.retailmanager.supplierpricelistsv.ingestion.job.ImportJobRepository;
import com.retailmanager.supplierpricelistsv.ingestion.job.ImportStatus;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImportJobService {

    private final ImportJobRepository repository;
    private final PriceItemAsyncImporter asyncImporter;

    public ImportJob startImport(
            UUID supplierId,
            String filePath,
            boolean updateExisting
    ) {

        ImportJob job = ImportJob.builder()
                .supplierId(supplierId)
                .filePath(filePath)
                .updateExisting(updateExisting)
                .status(ImportStatus.PENDING)
                .startedAt(Instant.now())
                .build();

        job = repository.saveAndFlush(job);

        log.info("Import job created | jobId={} | supplierId={}", job.getId(), supplierId);

        asyncImporter.runImport(job.getId());

        return job;
    }

    public ImportJob getJob(UUID jobId) {
        return repository.findById(jobId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Import job not found: " + jobId)
                );
    }
}