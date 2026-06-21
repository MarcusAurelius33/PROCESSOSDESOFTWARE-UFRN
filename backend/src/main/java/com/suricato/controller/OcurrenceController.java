package com.suricato.controller;

import com.suricato.model.dto.request.OcurrenceRequestDTO;
import com.suricato.model.dto.response.OcurrencePhotoResponseDTO;
import com.suricato.model.dto.response.OcurrenceResponseDTO;
import com.suricato.service.OcurrencePhotoService;
import com.suricato.service.OcurrenceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/ocurrences")
@RequiredArgsConstructor
public class OcurrenceController {

	private final OcurrenceService ocurrenceService;
	private final OcurrencePhotoService photoService;

	@GetMapping
	public List<OcurrenceResponseDTO> findAll() {
		return ocurrenceService.findAll();
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<OcurrenceResponseDTO> create(
			@Valid @ModelAttribute OcurrenceRequestDTO request,
			@RequestParam(value = "photo", required = false) MultipartFile photo) throws IOException {
		return ResponseEntity.ok(ocurrenceService.create(request, photo));
	}

	@PostMapping("/{id}/photos")
	public ResponseEntity<OcurrencePhotoResponseDTO> uploadPhoto(
			@PathVariable Long id,
			@RequestParam("file") MultipartFile file) throws IOException {
		if (file.isEmpty()) {
			return ResponseEntity.badRequest().build();
		}

		String contentType = file.getContentType();
		if (contentType == null || !contentType.startsWith("image/")) {
			return ResponseEntity.badRequest().build();
		}

		return ResponseEntity.ok(photoService.upload(id, file));
	}

	@PostMapping("/{id}/confirmations")
	public ResponseEntity<OcurrenceResponseDTO> confirm(
			@PathVariable Long id,
			@RequestHeader(value = "X-Mock-User-Email", defaultValue = "cidadao.seed@suricato.local") String userEmail) {

		return ResponseEntity.ok(ocurrenceService.confirmOcurrence(id, userEmail));
	}

	@GetMapping("/my-confirmations")
	public ResponseEntity<List<Long>> getMyConfirmations(
        @RequestHeader(value = "X-Mock-User-Email", defaultValue = "cidadao.seed@suricato.local") String userEmail) {
    		List<Long> confirmedIds = ocurrenceService.findMyConfirmations(userEmail);
    		return ResponseEntity.ok(confirmedIds);
}
}
