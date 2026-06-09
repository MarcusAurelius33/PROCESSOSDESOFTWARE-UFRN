package com.suricato.service;

import com.suricato.enums.OcurrenceStatusEnum;
import com.suricato.model.dto.response.DashboardStatsDTO;
import com.suricato.repository.OcurrenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final OcurrenceRepository ocurrenceRepository;

    public DashboardStatsDTO getStats() {
        return new DashboardStatsDTO(
                ocurrenceRepository.count(),
                ocurrenceRepository.countByStatus(OcurrenceStatusEnum.OPEN),
                ocurrenceRepository.countByStatus(OcurrenceStatusEnum.IN_PROGRESS),
                ocurrenceRepository.countByStatus(OcurrenceStatusEnum.RESOLVED),
                ocurrenceRepository.countByStatus(OcurrenceStatusEnum.CLOSED),
                ocurrenceRepository.countByCategory(),
                ocurrenceRepository.countByDay(LocalDateTime.now().minusDays(30))
        );
    }
}