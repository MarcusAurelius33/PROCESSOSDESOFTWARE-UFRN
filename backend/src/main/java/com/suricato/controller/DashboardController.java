package com.suricato.controller;

import com.suricato.model.dto.response.DashboardStatsDTO;
import com.suricato.service.DashboardService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        DashboardStatsDTO result = dashboardService.getStats();
        return ResponseEntity.ok(result);
    }
}