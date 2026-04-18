package com.suricato.repository;

import com.suricato.entity.Ocurrence;
import com.suricato.entity.OcurrenceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OcurrenceRepository extends JpaRepository<Ocurrence, Long> {
    List<Ocurrence> findByCityId(Long cityId);
    List<Ocurrence> findByStatus(OcurrenceStatus status);
    List<Ocurrence> findByUserId(Long userId);
}
