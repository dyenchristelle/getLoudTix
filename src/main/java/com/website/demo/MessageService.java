package com.website.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.website.demo.MessageRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void saveMessage(RsrvDTO request) {
        if (messageRepository.existsByNameAndEmail(request.getName(), request.getEmail())){
            throw new IllegalArgumentException("You're already reserved. Do you want to view your reservation?");
        }
        if (request.getName().isEmpty() || request.getEmail().isEmpty() || request.getDay().isEmpty()) {
            throw new IllegalArgumentException("Please select at least one day.");
        }
        try {
            Message msg = new Message(request.getName(), request.getEmail(), request.getDay());
            messageRepository.save(msg);
            System.out.println("Save successful!");
        } catch (Exception e) {
            System.err.println("Error saving message: " + e.getMessage());
        }
    }
}
