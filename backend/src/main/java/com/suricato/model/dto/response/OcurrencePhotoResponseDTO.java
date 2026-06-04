package com.suricato.model.dto.response;

import com.suricato.entity.OcurrencePhoto;
import java.time.LocalDateTime;

public record OcurrencePhotoResponseDTO(
        Long id,
        String url,
        LocalDateTime createdAt,
        Long ocurrenceId
) {
    public static OcurrencePhotoResponseDTO from(OcurrencePhoto photo) {
        return new OcurrencePhotoResponseDTO(
                photo.getId(),
                photo.getUrl(),
                photo.getCreatedAt(),
                photo.getOcurrence().getId()
        );
    }
}