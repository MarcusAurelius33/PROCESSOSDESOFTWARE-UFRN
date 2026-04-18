package com.suricato.repository;

import com.suricato.entity.Confirmation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationRepository extends JpaRepository<Confirmation, Long> {
    boolean existsByUserIdAndOcurrenceId(Long userId, Long ocurrenceId);
    long countByOcurrenceId(Long ocurrenceId);
}
