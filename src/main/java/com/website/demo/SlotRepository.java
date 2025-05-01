package com.website.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlotRepository extends CrudRepository<slot, Integer> {
    slot findById(int id);
}
