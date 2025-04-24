package com.website.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
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

    @Autowired
    public MessageController(MessageService messageService, MessageRepository messageRepository, EmailService emailService){
        this.messageService = messageService;
        this.messageRepository = messageRepository;
        this.emailService = emailService;
    }
    @PostMapping("/submitChoice")
    public ResponseEntity<Map<String, Object>> submitChoice(@RequestBody Message request) {
        try {
            messageService.saveMessage(request);
            String email = request.getEmail();
            emailService.sendConfirmationEmail(email);
            System.out.println("Received name: " + request.getName());
            System.out.println("Received email: " + request.getEmail());
            System.out.println("Received day: " + request.getConcerts());
            return ResponseEntity.ok(Map.of("success", true, "message", "Reservation successful!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }
// @GetMapping("/api/checkReservation")
// public ResponseEntity<Map<String, Boolean>> checkReservation(
//     @RequestParam String name, 
//     @RequestParam String email) {
//     boolean exists = messageRepository.existsByNameAndEmail(name, email);
//     Map<String, Boolean> response = new HashMap<>();
//     response.put("exists", exists);
//     return ResponseEntity.ok(response);
// }
}