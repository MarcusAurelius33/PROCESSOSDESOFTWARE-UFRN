package com.suricato.service;

import com.suricato.entity.Category;
import com.suricato.entity.City;
import com.suricato.entity.Ocurrence;
import com.suricato.entity.StatusHistory;
import com.suricato.entity.User;
import com.suricato.enums.OcurrenceStatusEnum;
import com.suricato.exception.ResourceNotFoundException;
import com.suricato.model.dto.request.OcurrenceRequestDTO;
import com.suricato.model.dto.response.CategoryResponseDTO;
import com.suricato.model.dto.response.CityResponseDTO;
import com.suricato.model.dto.response.OcurrenceResponseDTO;
import com.suricato.repository.CategoryRepository;
import com.suricato.repository.CityRepository;
import com.suricato.repository.OcurrenceRepository;
import com.suricato.repository.StatusHistoryRepository;
import com.suricato.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OcurrenceService {

	private static final String SEED_USER_EMAIL = "cidadao.seed@suricato.local";

	private final OcurrenceRepository ocurrenceRepository;
	private final StatusHistoryRepository statusHistoryRepository;
	private final CategoryRepository categoryRepository;
	private final CityRepository cityRepository;
	private final UserRepository userRepository;
	private final OcurrencePhotoService photoService;

	@Transactional(readOnly = true)
	public List<OcurrenceResponseDTO> findAll() {
		return ocurrenceRepository.findAll()
			.stream()
			.map(OcurrenceResponseDTO::fromEntity)
			.toList();
	}

	@Transactional
	public OcurrenceResponseDTO create(OcurrenceRequestDTO request, MultipartFile photo) throws IOException {
		Category category = categoryRepository.findByIdAndActiveTrue(request.categoryId())
				.orElseThrow(() -> new ResourceNotFoundException("Categoria nao encontrada."));

		City city = cityRepository.findFirstByNameIgnoreCaseAndStateIgnoreCaseAndCountryIgnoreCase(request.city(), request.state(), request.country())
				.orElseGet(() -> createCity(request.city(), request.state(), request.country()));

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
		photoService.upload(savedOcurrence, photo);
		
		statusHistoryRepository.save(StatusHistory.builder()
				.currentStatus(OcurrenceStatusEnum.OPEN)
				.prevStatus(null)
				.ocurrence(savedOcurrence)
				.build());

		return OcurrenceResponseDTO.fromEntity(savedOcurrence);
	}
	
	public List<CategoryResponseDTO> findAllActive() {
		return categoryRepository.findByActiveTrue()
			.stream()
			.map(CategoryResponseDTO::fromEntity) 
			.toList();
	}

	public List<CityResponseDTO> findCity() {
		return cityRepository.findAll()
			.stream()
			.map(CityResponseDTO::fromEntity)
			.toList();
	}

	private City createCity(String cityName, String state, String country) {
		City city = City.builder()
			.name(cityName)
			.state(state)
			.country(country)
			.build();
		return cityRepository.save(city);
	}
}
