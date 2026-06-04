package com.suricato.service;

import com.suricato.entity.Ocurrence;
import com.suricato.entity.OcurrencePhoto;
import com.suricato.model.dto.response.OcurrencePhotoResponseDTO;
import com.suricato.repository.OcurrencePhotoRepository;
import com.suricato.repository.OcurrenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class OcurrencePhotoService {

    private final OcurrencePhotoRepository photoRepository;
    private final OcurrenceRepository ocurrenceRepository;
    private final CloudinaryService cloudinaryService;

    public OcurrencePhotoResponseDTO upload(Long ocurrenceId, MultipartFile file) throws IOException {
        var ocurrence = ocurrenceRepository.findById(ocurrenceId)
                .orElseThrow(() -> new RuntimeException("Ocorrência não encontrada"));

        String imageUrl = cloudinaryService.upload(file);

        var photo = OcurrencePhoto.builder()
                .ocurrence(ocurrence)
                .url(imageUrl)
                .build();

                
        return OcurrencePhotoResponseDTO.from(photoRepository.save(photo));
    }

    public OcurrencePhotoResponseDTO upload(Ocurrence ocurrence, MultipartFile file) throws IOException {
        String imageUrl = cloudinaryService.upload(file);

        var photo = OcurrencePhoto.builder()
                .ocurrence(ocurrence)
                .url(imageUrl)
                .build();

                
        return OcurrencePhotoResponseDTO.from(photoRepository.save(photo));
    }
}