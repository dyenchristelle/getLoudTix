package com.website.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
    boolean existsByEmail(String email);
    
    Message findByEmail(String email);
    
}
