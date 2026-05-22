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
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OcurrencePhotoService {

    private final OcurrencePhotoRepository photoRepository;
    private final OcurrenceRepository ocurrenceRepository;

    @Value("${upload.dir:uploads/}")
    private String uploadDir;

    public OcurrencePhoto upload(Long ocurrenceId, MultipartFile file) throws IOException {
        var ocurrence = ocurrenceRepository.findById(ocurrenceId)
                .orElseThrow(() -> new RuntimeException("Ocorrência não encontrada"));

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir + filename);

        Files.createDirectories(path.getParent());
        Files.write(path, file.getBytes());

        var photo = OcurrencePhoto.builder()
                .ocurrence(ocurrence)
                .url("/uploads/" + filename)
                .build();

        return photoRepository.save(photo);
    }
}