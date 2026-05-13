package com.crishof.suppliercatalogsv.ingestion.job;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ImportJobRepository extends JpaRepository<ImportJob, UUID> {

    List<ImportJob> findTop50BySupplierId(UUID supplierId);

    List<ImportJob> findTop50ByOrderByStartedAtDesc();
}