package com.website.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://dress-entitled-peoples-area.trycloudflare.com")
// @CrossOrigin(origins = "http://localhost:9090")
public class MessageController {
    private final MessageService messageService;
    private final MessageRepository messageRepository;
    private final EmailService emailService;
    private final ConcertService concertService;
    private final SlotRepository slotRepository;

    @Autowired
    public MessageController(MessageService messageService, MessageRepository messageRepository, EmailService emailService, ConcertService concertService, SlotRepository slotRepository) {
        this.messageService = messageService;
        this.messageRepository = messageRepository;
        this.emailService = emailService;
        this.concertService = concertService;
        this.slotRepository = slotRepository;
    }
    @PostMapping("/submitChoice") // http request - post means insert 
    public ResponseEntity<Map<String, Object>> submitChoice(@RequestBody Message request) { // triggered when frontend send POST (checkout is clicked)
        try {
            messageService.saveMessage(request); // this saves the info from the parameter like name, email, concert_id in the db

            List<concert> concerts = new ArrayList<>();
            for (Integer concertId : request.getConcert_id()) { // for each concert_id, the info in concert db were retrieved, it will sent to the email 
                concert concert = concertService.getConcertById(concertId);  
                if (concert != null) {
                    concerts.add(concert); // this will be added to concerts list that is in parameter in line58
                }
            }
            emailService.sendConfirmationEmail(request.getEmail(), request.getName(), concerts); // email will be sent to the user containing the parameters

            System.out.println("Received name: " + request.getName());
            System.out.println("Received email: " + request.getEmail());      // for debugging purposes
            System.out.println("Received day: " + request.getConcert_id());
            
            return ResponseEntity.ok(Map.of("success", true, "message", "Reservation successful!")); //if successfull, this will return to frontend
        } catch (IllegalArgumentException e) { // error in saveMessage or decrementSlot, minsan hindi tugma ung variable names sa column names
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        } catch (Exception e) { // any error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }
    @GetMapping("/slots")
    public ResponseEntity<Map<String, Integer>> getSlotAvailability() {
        slot slotData = slotRepository.findById(1);
        if (slotData != null) {
            Map<String, Integer> dayKeys = new HashMap<>();
            
            dayKeys.put("day1", slotData.getDay1());
            dayKeys.put("day2", slotData.getDay2());
            dayKeys.put("day3", slotData.getDay3());
            dayKeys.put("day4", slotData.getDay4());
            dayKeys.put("day5", slotData.getDay5());
            dayKeys.put("day6", slotData.getDay6());
            dayKeys.put("day7", slotData.getDay7());
            dayKeys.put("day8", slotData.getDay8());
            dayKeys.put("day9", slotData.getDay9());
            dayKeys.put("day10", slotData.getDay10());
            
            return ResponseEntity.ok(dayKeys);  // Return the slot data as JSON
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if slot doesn't exist
        }
    }
    @GetMapping("/checkReservation") // http request - get means retrieve
    public ResponseEntity<Map<String, Boolean>> checkReservation(@RequestParam String email) { // triggered when get is sent from frontend (in start - must not exist ; in delete - must exist)
        boolean exists = messageRepository.existsByEmail(email); // this checks the email input in database
        
        return ResponseEntity.ok(Map.of("exists", exists));  // used to create response in json format (which springboot does)
        // will return true: exists ; false: not exists
        // ^^^^^ will be sent to frontend
    }
    @DeleteMapping("/deleteReservation")
    public ResponseEntity<Map<String, Object>> deleteReservation(@RequestParam String email) {
        try {
            String name = messageRepository.findByEmail(email).getName(); // gets the name in the row of email to be deleted
            messageService.deleteMessageByEmail(email); // calls deletion in service
            emailService.sendDeletionConfirmation(email, name);
            return ResponseEntity.ok(Map.of("success", true, "message", "Reservation deleted successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }
}