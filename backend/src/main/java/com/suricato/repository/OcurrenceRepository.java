package com.suricato.repository;

import com.suricato.entity.Ocurrence;
import com.suricato.enums.OcurrenceStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface OcurrenceRepository extends JpaRepository<Ocurrence, Long> {
    List<Ocurrence> findByCityId(Long cityId);
    List<Ocurrence> findByStatus(OcurrenceStatusEnum status);
    List<Ocurrence> findByUserId(Long userId);

    long countByStatus(OcurrenceStatusEnum status);

    @Query("SELECT o.category.name, COUNT(o) FROM Ocurrence o GROUP BY o.category.name")
    List<Object[]> countByCategory();

    @Query("SELECT o.createdAt, COUNT(o) FROM Ocurrence o WHERE o.createdAt >= :since GROUP BY o.createdAt")
    List<Object[]> countByDay(@Param("since") LocalDateTime since);
}