package com.suricato.repository;

import com.suricato.entity.City;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
  public Optional<City> findFirstByNameIgnoreCaseAndStateIgnoreCaseAndCountryIgnoreCase(String name, String state, String country);
}
