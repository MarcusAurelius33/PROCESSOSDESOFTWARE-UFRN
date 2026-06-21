package com.suricato.repository;

import com.suricato.entity.Confirmation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConfirmationRepository extends JpaRepository<Confirmation, Long> {
    boolean existsByUserIdAndOcurrenceId(Long userId, Long ocurrenceId);
    long countByOcurrenceId(Long ocurrenceId);

    @Query("SELECT c.ocurrence.id FROM Confirmation c WHERE c.user.email = :email")
    List<Long> findConfirmedOcurrenceIdsByUserEmail(@Param("email") String email);
}
