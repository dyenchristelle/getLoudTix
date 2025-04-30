package com.website.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConcertRepository extends JpaRepository<concert, Integer> {
    concert findById(int id);
}
