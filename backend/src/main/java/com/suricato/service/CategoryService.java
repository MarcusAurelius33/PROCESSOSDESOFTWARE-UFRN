package com.suricato.service;

import com.suricato.entity.Category;
import com.suricato.model.dto.response.CategoryResponseDTO;
import com.suricato.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponseDTO> findActiveCategories() {
        return categoryRepository.findByActiveTrue()
            .stream()
            .map(this::toResponse)
            .toList();
    }

    private CategoryResponseDTO toResponse(Category category) {
        return new CategoryResponseDTO(
            category.getId(),
            category.getName(),
            category.getDescription()
        );
    }
}
