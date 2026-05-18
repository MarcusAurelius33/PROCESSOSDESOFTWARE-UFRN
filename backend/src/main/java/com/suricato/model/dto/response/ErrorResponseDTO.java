package com.suricato.model.dto.response;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponseDTO(
    String message,
    Map<String, String> fields,
    LocalDateTime timestamp
) {
}
