package com.suricato.model.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.suricato.entity.Ocurrence;

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
    String author,
    String photoUrl,
    LocalDateTime createdAt,
    Long totalConfirmation
) {
    public static OcurrenceResponseDTO fromEntity(Ocurrence ocurrence) {
        if (ocurrence == null) {
            return null;
        }
        
        String photoUrl = (ocurrence.getPhotos() != null && !ocurrence.getPhotos().isEmpty())
            ? ocurrence.getPhotos().get(0).getUrl()
            : null;

        return new OcurrenceResponseDTO(
            ocurrence.getId(),
            ocurrence.getTitle(),
            ocurrence.getDescription(),
            ocurrence.getAddress(),
            ocurrence.getLatitude(),
            ocurrence.getLongitude(),
            ocurrence.getStatus().name(),
            CategoryResponseDTO.fromEntity(ocurrence.getCategory()),
            CityResponseDTO.fromEntity(ocurrence.getCity()),
            ocurrence.getUser().getName(),
            photoUrl,
            ocurrence.getCreatedAt(),
            ocurrence.getTotalConfirmation()
        );
    }
}