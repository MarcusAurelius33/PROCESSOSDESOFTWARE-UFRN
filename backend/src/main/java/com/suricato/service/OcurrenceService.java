package com.suricato.service;

import com.suricato.entity.Category;
import com.suricato.entity.City;
import com.suricato.entity.Ocurrence;
import com.suricato.entity.OcurrencePhoto;
import com.suricato.entity.StatusHistory;
import com.suricato.entity.User;
import com.suricato.enums.OcurrenceStatusEnum;
import com.suricato.exception.BusinessRuleException;
import com.suricato.exception.ResourceNotFoundException;
import com.suricato.model.dto.request.OcurrenceRequestDTO;
import com.suricato.model.dto.response.CategoryResponseDTO;
import com.suricato.model.dto.response.CityResponseDTO;
import com.suricato.model.dto.response.OcurrenceResponseDTO;
import com.suricato.repository.CategoryRepository;
import com.suricato.repository.CityRepository;
import com.suricato.repository.OcurrencePhotoRepository;
import com.suricato.repository.OcurrenceRepository;
import com.suricato.repository.StatusHistoryRepository;
import com.suricato.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OcurrenceService {

    private static final String SEED_USER_EMAIL = "cidadao.seed@suricato.local";

    private final OcurrenceRepository ocurrenceRepository;
    private final OcurrencePhotoRepository ocurrencePhotoRepository;
    private final StatusHistoryRepository statusHistoryRepository;
    private final CategoryRepository categoryRepository;
    private final CityRepository cityRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<OcurrenceResponseDTO> findAll() {
        return ocurrenceRepository.findAll()
            .stream()
            .map(this::toResponse)
            .toList();
    }

    @Transactional
    public OcurrenceResponseDTO create(OcurrenceRequestDTO request) {
        Category category = categoryRepository.findById(request.categoryId())
            .orElseThrow(() -> new ResourceNotFoundException("Categoria nao encontrada."));

        if (!category.isActive()) {
            throw new BusinessRuleException("Categoria inativa.");
        }

        City city = cityRepository.findById(request.cityId())
            .orElseThrow(() -> new ResourceNotFoundException("Cidade nao encontrada."));

        User user = userRepository.findByEmail(SEED_USER_EMAIL)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario cidadao seed nao encontrado."));

        Ocurrence ocurrence = Ocurrence.builder()
            .title(request.title())
            .description(request.description())
            .address(request.address())
            .latitude(request.latitude())
            .longitude(request.longitude())
            .status(OcurrenceStatusEnum.OPEN)
            .totalConfirmation(0L)
            .user(user)
            .category(category)
            .city(city)
            .build();

        Ocurrence savedOcurrence = ocurrenceRepository.save(ocurrence);

        if (hasText(request.photoUrl())) {
            ocurrencePhotoRepository.save(OcurrencePhoto.builder()
                .url(request.photoUrl())
                .ocurrence(savedOcurrence)
                .build());
        }

        statusHistoryRepository.save(StatusHistory.builder()
            .currentStatus(OcurrenceStatusEnum.OPEN)
            .prevStatus(null)
            .ocurrence(savedOcurrence)
            .build());

        return toResponse(savedOcurrence);
    }

    private OcurrenceResponseDTO toResponse(Ocurrence ocurrence) {
        String photoUrl = ocurrencePhotoRepository
            .findFirstByOcurrenceIdOrderByCreatedAtAsc(ocurrence.getId())
            .map(OcurrencePhoto::getUrl)
            .orElse(null);

        return new OcurrenceResponseDTO(
            ocurrence.getId(),
            ocurrence.getTitle(),
            ocurrence.getDescription(),
            ocurrence.getAddress(),
            ocurrence.getLatitude(),
            ocurrence.getLongitude(),
            ocurrence.getStatus().name(),
            toCategoryResponse(ocurrence.getCategory()),
            toCityResponse(ocurrence.getCity()),
            photoUrl,
            ocurrence.getCreatedAt()
        );
    }

    private CategoryResponseDTO toCategoryResponse(Category category) {
        return new CategoryResponseDTO(
            category.getId(),
            category.getName(),
            category.getDescription()
        );
    }

    private CityResponseDTO toCityResponse(City city) {
        return new CityResponseDTO(
            city.getId(),
            city.getName(),
            city.getState()
        );
    }

    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}
