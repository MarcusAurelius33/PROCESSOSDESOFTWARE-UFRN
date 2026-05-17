package com.suricato.model.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OcurrenceResponseDTO(
    Long id,
    String title,
    String description,
    String address,
    BigDecimal latitude,
    BigDecimal longitude,
    String status,
    CategoryResponseDTO category,
    CityResponseDTO city,
    String photoUrl,
    LocalDateTime createdAt
) {
}