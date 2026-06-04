package com.suricato.model.dto.response;

import com.suricato.entity.Category;

public record CategoryResponseDTO(
    Long id,
    String name,
    String icon,
    String description
) {
    public static CategoryResponseDTO fromEntity(Category category) {
        if (category == null) {
            return null;
        }
        return new CategoryResponseDTO(
            category.getId(),
            category.getName(),
            category.getIcon(),
            category.getDescription()
        );
    }
}
