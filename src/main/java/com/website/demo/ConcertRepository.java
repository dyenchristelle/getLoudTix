package com.website.demo;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface ConcertRepository extends CrudRepository<concert, Integer> {
    concert findById(int id);

    List<concert> findAll();
}
