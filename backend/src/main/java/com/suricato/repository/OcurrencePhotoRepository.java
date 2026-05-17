package com.suricato.repository;

import com.suricato.entity.OcurrencePhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OcurrencePhotoRepository extends JpaRepository<OcurrencePhoto, Long> {
    Optional<OcurrencePhoto> findFirstByOcurrenceIdOrderByCreatedAtAsc(Long ocurrenceId);
}
