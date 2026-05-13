package com.crishof.branchsv.service;

import com.crishof.branchsv.dto.BranchRequest;
import com.crishof.branchsv.dto.BranchResponse;
import com.crishof.branchsv.dto.LocationRequest;
import com.crishof.branchsv.dto.LocationResponse;
import com.crishof.branchsv.exception.BranchNotFoundException;
import com.crishof.branchsv.exception.DuplicateNameException;
import com.crishof.branchsv.model.Branch;
import com.crishof.branchsv.model.StockLocation;
import com.crishof.branchsv.repository.BranchRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private static final String DEFAULT_LOCATION_CODE = "MAIN";
    private static final String DEFAULT_LOCATION_NAME = "Main Showroom";
    private final BranchRepository branchRepository;

    @Override
    public List<BranchResponse> getAllBranches() {
        return branchRepository.findAll().stream().map(this::toBranchResponse).toList();
    }

    @Override
    public BranchResponse getBranchResponseById(UUID id) throws BranchNotFoundException {
        Branch branch = branchRepository.findById(id).orElseThrow(() -> new BranchNotFoundException(id));
        return toBranchResponse(branch);
    }

    @Override
    public Branch getBranchById(UUID branchId) throws BranchNotFoundException {
        return branchRepository.findById(branchId).orElseThrow(BranchNotFoundException::new);
    }

    @Override
    public BranchResponse createBranch(BranchRequest request) {
        if (branchRepository.findByNameIgnoreCase(request.getName()).isPresent()) {
            throw new DuplicateNameException("Branch with name '" + request.getName() + "' already exists");
        }

        StockLocation defaultLocation = StockLocation.builder()
                .code(DEFAULT_LOCATION_CODE)
                .name(DEFAULT_LOCATION_NAME)
                .locationType(StockLocation.LocationType.SALES)
                .active(true)
                .build();

        Branch branch = Branch.builder()
                .code(request.getCode().toUpperCase())
                .name(request.getName())
                .address(request.getAddress())
                .active(request.isActive())
                .locations(new ArrayList<>(List.of(defaultLocation)))
                .build();

        defaultLocation.setBranch(branch);

        return toBranchResponse(branchRepository.save(branch));
    }

    @Override
    public BranchResponse updateBranch(UUID branchId, BranchRequest request) throws BranchNotFoundException {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new BranchNotFoundException(branchId));

        branch.setCode(request.getCode().toUpperCase());
        branch.setName(request.getName());
        branch.setAddress(request.getAddress());
        branch.setActive(request.isActive());

        return toBranchResponse(branchRepository.save(branch));
    }

    @Override
    public void deleteBranch(UUID branchId) throws BranchNotFoundException {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new BranchNotFoundException(branchId));
        branchRepository.delete(branch);
    }

    @Override
    public BranchResponse createLocation(UUID branchId, LocationRequest request) {
        Branch branch = branchRepository.getReferenceById(branchId);

        StockLocation location = StockLocation.builder()
                .code(request.getCode().toUpperCase())
                .name(request.getName())
                .locationType(request.getLocationType())
                .active(request.isActive())
                .branch(branch)
                .build();

        branch.getLocations().add(location);
        return toBranchResponse(branchRepository.save(branch));
    }

    @Override
    public BranchResponse updateLocation(UUID branchId, UUID locationId, LocationRequest request) throws BranchNotFoundException {
        Branch branch = getBranchById(branchId);

        StockLocation location = branch.getLocations().stream()
                .filter(l -> l.getId().equals(locationId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException(
                        "Location " + locationId + " not found in branch " + branchId));

        location.setCode(request.getCode().toUpperCase());
        location.setName(request.getName());
        location.setLocationType(request.getLocationType());
        location.setActive(request.isActive());

        return toBranchResponse(branchRepository.save(branch));
    }

    @Override
    public BranchResponse deleteLocation(UUID branchId, UUID locationId) throws BranchNotFoundException {
        Branch branch = getBranchById(branchId);

        StockLocation location = branch.getLocations().stream()
                .filter(l -> l.getId().equals(locationId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException(
                        "Location " + locationId + " not found in branch " + branchId));

        branch.getLocations().remove(location);
        return toBranchResponse(branchRepository.save(branch));
    }

    // ── Mappers ─────────────────────────────────────────────────────────────────

    private BranchResponse toBranchResponse(Branch branch) {
        return BranchResponse.builder()
                .id(branch.getId())
                .code(branch.getCode())
                .name(branch.getName())
                .address(branch.getAddress())
                .active(branch.isActive())
                .locations(branch.getLocations() != null
                        ? branch.getLocations().stream().map(this::toLocationResponse).toList()
                        : List.of())
                .createdAt(branch.getCreatedAt())
                .updatedAt(branch.getUpdatedAt())
                .build();
    }

    private LocationResponse toLocationResponse(StockLocation loc) {
        return LocationResponse.builder()
                .id(loc.getId())
                .code(loc.getCode())
                .name(loc.getName())
                .locationType(loc.getLocationType())
                .active(loc.isActive())
                .build();
    }
}

