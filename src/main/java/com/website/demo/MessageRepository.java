package com.website.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends CrudRepository<Message, String> {
    boolean existsByEmail(String email);
    
    Message findByEmail(String email);
    
}
