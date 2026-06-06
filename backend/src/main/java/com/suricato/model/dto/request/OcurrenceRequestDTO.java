package com.suricato.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record OcurrenceRequestDTO(
    @NotBlank
    String title,
    String description,
    String address,
    @NotNull
    BigDecimal latitude,
    @NotNull
    BigDecimal longitude,
    @NotNull
    Long categoryId,
    @NotNull
    String city,
    @NotNull
    String state,
    @NotNull
    String country
) {
}

