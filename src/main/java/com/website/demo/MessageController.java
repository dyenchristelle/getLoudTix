package com.website.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api")
// @CrossOrigin(origins = "https://f52b-136-158-65-43.ngrok-free.app")
@CrossOrigin(origins = "http://localhost:9090")
public class MessageController {
    private final MessageService messageService;
    private final MessageRepository messageRepository;
    private final EmailService emailService;
    private final SlotService slotService;

    @Autowired
    public MessageController(MessageService messageService, MessageRepository messageRepository, EmailService emailService, SlotService slotService) {
        this.messageService = messageService;
        this.messageRepository = messageRepository;
        this.emailService = emailService;
        this.slotService = slotService;
    }
    @PostMapping("/submitChoice")
    public ResponseEntity<Map<String, Object>> submitChoice(@RequestBody Message request) {
        try {
            messageService.saveMessage(request);

            slotService.decrementSlot(request.getConcert_id());

            emailService.sendConfirmationEmail(request.getEmail(), request.getName(), request.getConcerts());

            System.out.println("Received name: " + request.getName());
            System.out.println("Received email: " + request.getEmail());
            System.out.println("Received day: " + request.getConcerts());
            System.out.println("Received day: " + request.getConcert_id());
            
            return ResponseEntity.ok(Map.of("success", true, "message", "Reservation successful!"));
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }
    @GetMapping("/checkReservation")
    public ResponseEntity<Map<String, Boolean>> checkReservation(@RequestParam String email) {
        boolean exists = messageRepository.existsByEmail(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/deleteReservation")
    public ResponseEntity<Map<String, Object>> deleteReservation(@RequestParam String email) {
        try {
            Message existingReservation = messageRepository.findByEmail(email); // Step 1: find reservation

            if (existingReservation != null) {
                String name = existingReservation.getName();
                List<String> concerts = existingReservation.getConcerts(); 

                boolean deletedMessage = messageService.deleteMessageByEmail(email);
                if (deletedMessage) {
                    emailService.sendDeletionConfirmation(email, name, concerts);
                    return ResponseEntity.ok(Map.of("success", true, "message", "Reservation deleted successfully"));
                } else {
                    return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Failed to delete the reservation"));
                }
            } else {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "No reservation found with the provided email and name"));
              }
        
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }
}