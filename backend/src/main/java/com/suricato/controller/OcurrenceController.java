package com.suricato.controller;

import com.suricato.model.dto.request.OcurrenceRequestDTO;
import com.suricato.model.dto.response.OcurrencePhotoResponseDTO;
import com.suricato.model.dto.response.OcurrenceResponseDTO;
import com.suricato.service.OcurrencePhotoService;
import com.suricato.service.OcurrenceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OcurrenceResponseDTO create(@Valid @RequestBody OcurrenceRequestDTO request) {
        return ocurrenceService.create(request);
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

        var photo = photoService.upload(id, file);
        return ResponseEntity.ok(OcurrencePhotoResponseDTO.from(photo));
    }
}
