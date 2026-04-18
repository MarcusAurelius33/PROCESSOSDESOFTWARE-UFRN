package com.suricato.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "confirmation",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "ocurrence_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Confirmation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ocurrence_id", nullable = false)
    private Ocurrence ocurrence;

    @CreationTimestamp
    @Column(name = "confirmed_at", updatable = false)
    private LocalDateTime confirmedAt;
}
