package com.retailmanager.customersv.mapper;

import com.retailmanager.customersv.dto.CustomerRequest;
import com.retailmanager.customersv.dto.CustomerResponse;
import com.retailmanager.customersv.model.Customer;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE
)
public interface CustomerMapper {

    // CREATE
    @Mapping(target = "id", ignore = true)
    Customer toEntity(CustomerRequest request);

    // READ
    CustomerResponse toDto(Customer customer);

    // UPDATE (PATCH / PUT partial)

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy =
            NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(
            CustomerRequest request,
            @MappingTarget Customer customer
    );
}
