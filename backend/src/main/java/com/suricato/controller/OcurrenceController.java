package com.suricato.controller;

import com.suricato.model.dto.request.OcurrenceRequestDTO;
import com.suricato.model.dto.response.OcurrenceResponseDTO;
import com.suricato.service.OcurrenceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ocurrences")
@RequiredArgsConstructor
public class OcurrenceController {

    private final OcurrenceService ocurrenceService;

    @GetMapping
    public List<OcurrenceResponseDTO> findAll() {
        return ocurrenceService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OcurrenceResponseDTO create(@Valid @RequestBody OcurrenceRequestDTO request) {
        return ocurrenceService.create(request);
    }
}
