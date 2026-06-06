package com.suricato.model.dto.response;

import com.suricato.entity.City;

public record CityResponseDTO(
    Long id,
    String name,
    String state,
    String country
) {
       public static CityResponseDTO fromEntity(City city) {
        if (city == null) {
            return null;
        }
        return new CityResponseDTO(
            city.getId(),
            city.getName(),
            city.getState(),
            city.getCountry()
        );
    }
}