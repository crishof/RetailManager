package com.crishof.customersv.mapper;

import com.crishof.customersv.dto.CustomerRequest;
import com.crishof.customersv.dto.CustomerResponse;
import com.crishof.customersv.model.Customer;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CustomerMapper {

    // CREATE
    @Mapping(target = "id", ignore = true)
    Customer toEntity(CustomerRequest request);

    // READ
    CustomerResponse toDto(Customer customer);

    // UPDATE (PATCH / PUT partial)

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(CustomerRequest request, @MappingTarget Customer customer);
}
