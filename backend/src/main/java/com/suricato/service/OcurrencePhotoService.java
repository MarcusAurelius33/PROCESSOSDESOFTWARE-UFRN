package com.suricato.service;

import com.suricato.entity.OcurrencePhoto;
import com.suricato.repository.OcurrencePhotoRepository;
import com.suricato.repository.OcurrenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@Service
@RequiredArgsConstructor
public class OcurrencePhotoService {

    private final OcurrencePhotoRepository photoRepository;
    private final OcurrenceRepository ocurrenceRepository;
    private final CloudinaryService cloudinaryService;

    @Value("${upload.dir:uploads/}")

    public OcurrencePhoto upload(Long ocurrenceId, MultipartFile file) throws IOException {
        var ocurrence = ocurrenceRepository.findById(ocurrenceId)
                .orElseThrow(() -> new RuntimeException("Ocorrência não encontrada"));

        String imageUrl = cloudinaryService.upload(file);

        var photo = OcurrencePhoto.builder()
                .ocurrence(ocurrence)
                .url(imageUrl)
                .build();

        return photoRepository.save(photo);
    }
}