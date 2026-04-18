package com.suricato.repository;

import com.suricato.model.entity.Ocurrence;
import com.suricato.model.entity.OcurrenceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OcurrenceRepository extends JpaRepository<Ocurrence, Long> {
    List<Ocurrence> findByCityId(Long cityId);
    List<Ocurrence> findByStatus(OcurrenceStatus status);
    List<Ocurrence> findByUserId(Long userId);
}
