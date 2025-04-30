package com.website.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<slot, Integer> {
    slot findById(int id);
}
