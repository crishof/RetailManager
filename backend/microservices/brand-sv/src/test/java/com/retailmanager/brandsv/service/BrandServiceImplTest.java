package com.retailmanager.brandsv.service;

import com.retailmanager.brandsv.client.ProductServiceClient;
import com.retailmanager.brandsv.dto.BrandMergeResponse;
import com.retailmanager.brandsv.dto.BrandResponse;
import com.retailmanager.brandsv.dto.ReassignBrandResponse;
import com.retailmanager.brandsv.exception.BusinessException;
import com.retailmanager.brandsv.mapper.BrandMapper;
import com.retailmanager.brandsv.model.Brand;
import com.retailmanager.brandsv.repository.BrandRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BrandServiceImplTest {

    @Mock
    private BrandRepository brandRepository;

    @Mock
    private BrandMapper brandMapper;

    @Mock
    private ProductServiceClient productClient;

    @Mock
    private BrandDeletionService brandDeletionService;

    @InjectMocks
    private BrandServiceImpl brandService;

    @Test
    void create_shouldCreateBrand_whenNameIsValidAndNoLogo() {

        String name = "Nike";
        Brand saved = new Brand();
        saved.setId(UUID.randomUUID());
        saved.setName(name);

        when(brandRepository.findByNameIncludingDeleted("Nike")).thenReturn(Optional.empty());
        when(brandRepository.save(any(Brand.class))).thenReturn(saved);

        BrandResponse dto = mock(BrandResponse.class);
        when(brandMapper.toDto(saved)).thenReturn(dto);

        BrandResponse response = brandService.create(name, null);

        assertThat(response).isNotNull();

        verify(brandRepository).save(any(Brand.class));
        verify(brandMapper).toDto(saved);
    }

    @Test
    void create_shouldFail_whenBrandAlreadyExists() {
        Brand existing = new Brand();
        existing.setId(UUID.randomUUID());

        when(brandRepository.findByNameIncludingDeleted("Nike")).thenReturn(Optional.of(existing));
        when(brandRepository.existsDeletedById(existing.getId())).thenReturn(false);

        assertThatThrownBy(() -> brandService.create("Nike", null)).isInstanceOf(BusinessException.class).hasMessageContaining("already exists");
    }

    @Test
    void delete_shouldFail_whenBrandHasProducts() {
        UUID id = UUID.randomUUID();
        Brand brand = new Brand();
        brand.setId(id);

        when(brandRepository.findById(id)).thenReturn(Optional.of(brand));
        when(productClient.hasProductsForBrand(id)).thenReturn(true);

        assertThatThrownBy(() -> brandService.delete(id)).isInstanceOf(BusinessException.class).hasMessageContaining("used by products");
    }

    @Test
    void merge_shouldReassignProductsAndDeleteSourceBrand() {
        UUID sourceId = UUID.randomUUID();
        UUID targetId = UUID.randomUUID();

        when(brandRepository.findById(sourceId)).thenReturn(Optional.of(new Brand()));
        when(brandRepository.findById(targetId)).thenReturn(Optional.of(new Brand()));

        when(productClient.replaceBrand(sourceId, targetId)).thenReturn(new ReassignBrandResponse(5));

        BrandMergeResponse response = brandService.mergeBrandInto(sourceId, targetId);

        assertThat(response.productsReassigned()).isEqualTo(5);

        verify(brandDeletionService).forceDelete(sourceId);
    }
}