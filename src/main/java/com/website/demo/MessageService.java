package com.website.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.website.demo.MessageRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public void saveMessage(Message request) {
        if (messageRepository.existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("You're already reserved.");
        }
        if (request.getConcerts().isEmpty()) {
            throw new IllegalArgumentException("Please select at least one day.");
        }
        // MessageService concert = MessageRepository.findById(request.getConcert_id()).orElseThrow(() -> new IllegalArgumentException("Concert not found"));
        try {
            Message msg = new Message(request.getName(), request.getEmail(), request.getConcerts(), request.getConcert_id());
            messageRepository.save(msg);
            System.out.println("Save successful!");
        } catch (Exception e) {
            System.err.println("Error saving message: " + e.getMessage());
        }
    }

    @Transactional
    public boolean deleteMessageByEmail(String email) {
        try {
            Message message = messageRepository.findByEmail(email);
            if (message != null) {
                messageRepository.delete(message);
                return true; // Successfully deleted
            } else {
                return false; // Reservation not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
