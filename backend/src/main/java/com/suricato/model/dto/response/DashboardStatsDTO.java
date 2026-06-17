package com.suricato.model.dto.response;

import java.util.List;

public record DashboardStatsDTO(
    long totalOcurrences,
    long open,
    long inProgress,
    long resolved,
    long closed,
    List<CategoryStatsDTO> byCategory,
    List<PeriodStatsDTO> byPeriod
) {}