package com.suricato.service;

import com.suricato.enums.OcurrenceStatusEnum;
import com.suricato.model.dto.response.CategoryStatsDTO;
import com.suricato.model.dto.response.DashboardStatsDTO;
import com.suricato.model.dto.response.PeriodStatsDTO;
import com.suricato.repository.OcurrenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final OcurrenceRepository ocurrenceRepository;

    public DashboardStatsDTO getStats() {
        long open       = ocurrenceRepository.countByStatus(OcurrenceStatusEnum.OPEN);
        long inProgress = ocurrenceRepository.countByStatus(OcurrenceStatusEnum.IN_PROGRESS);
        long resolved   = ocurrenceRepository.countByStatus(OcurrenceStatusEnum.RESOLVED);
        long closed     = ocurrenceRepository.countByStatus(OcurrenceStatusEnum.CLOSED);

        List<CategoryStatsDTO> byCategory = ocurrenceRepository.countByCategory()
                .stream()
                .map(row -> new CategoryStatsDTO((String) row[0], (Long) row[1]))
                .toList();

        List<PeriodStatsDTO> byPeriod = ocurrenceRepository.countByDay(LocalDateTime.now().minusDays(7))
                .stream()
                .map(row -> new PeriodStatsDTO(row[0].toString(), (Long) row[1]))
                .toList();

        return new DashboardStatsDTO(
                open + inProgress + resolved + closed,
                open,
                inProgress,
                resolved,
                closed,
                byCategory,
                byPeriod
        );
    }
}