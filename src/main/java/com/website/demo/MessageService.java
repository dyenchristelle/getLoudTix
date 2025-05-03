package com.website.demo;

import org.aspectj.weaver.patterns.ConcreteCflowPointcut.Slot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// import java.util.ArrayList;
// import java.util.Arrays;
import java.util.List;
// import java.util.Optional;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final SlotRepository slotRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository, SlotRepository slotRepository) {
        this.messageRepository = messageRepository;
        this.slotRepository = slotRepository;
    }

    @Transactional
    public void saveMessage(Message request) {
        if (messageRepository.existsByEmail(request.getEmail())){ // checks if email already exists
            throw new IllegalArgumentException("Already reserved.");
        }
        if (request.getConcert_id().isEmpty()) { // checks if at leats one ticket is selected
            throw new IllegalArgumentException("No ticket is selected.");
        }
        try {
            updateSlotAvailability(request.getConcert_id(), true);  // this retrieves the concert_id fro decrementing the slots
            Message msg = new Message(request.getName(), request.getEmail(), request.getConcert_id()); // this gets the parameters to be stored in db
            messageRepository.save(msg); // save() is automatically understood as insert as provided by crudrepository interface
            System.out.println("Save successful!"); // debugging purposes
        } catch (Exception e) {
            System.err.println("Error saving message: " + e.getMessage());
        }
    }

    @Transactional
    public boolean deleteMessageByEmail(String email) {
        try {
            Message message = messageRepository.findByEmail(email);
            if (message != null) {
                updateSlotAvailability(message.getConcert_id(), false); // increment slot of the concert_id stored
                messageRepository.delete(message); // delete() is automatically understood to delete as provided by crudrepository interface
                return true; // Successfully deleted
            } else {
                return false; // Reservation not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
//decrement and increment
        public slot updateSlotAvailability(List<Integer> concert_id, boolean isDecrement) {
        slot availableSlot = slotRepository.findById(1);

        for (Integer concertId : concert_id) {
            switch (concertId) {
                case 1 -> {
                    int current = availableSlot.getDay1();
                    if (isDecrement) {
                        if (current > 0) availableSlot.setDay1(current - 1);
                        else throw new IllegalStateException("No available slots for Day 1.");
                    } else {
                        availableSlot.setDay1(current + 1);
                    }
                }
                case 2 -> {
                    int current = availableSlot.getDay2();
                    if (isDecrement) {
                        if (current > 0) availableSlot.setDay2(current - 1);
                        else throw new IllegalStateException("No available slots for Day 2.");
                    } else {
                        availableSlot.setDay2(current + 1);
                    }
                }
                case 3 -> {
                    int current = availableSlot.getDay3();
                    if (isDecrement) {
                        if (current > 0) availableSlot.setDay3(current - 1);
                        else throw new IllegalStateException("No available slots for Day 3.");
                    } else {
                        availableSlot.setDay3(current + 1);
                    }
                }
                case 4 -> {
                    int current = availableSlot.getDay4();
                    if (isDecrement) {
                        if (current > 0) availableSlot.setDay4(current - 1);
                        else throw new IllegalStateException("No available slots for Day 4.");
                    } else {
                        availableSlot.setDay4(current + 1);
                    }
                }
                case 5 -> {
                    int current = availableSlot.getDay5();
                    if (isDecrement) {
                        if (current > 0) availableSlot.setDay5(current - 1);
                        else throw new IllegalStateException("No available slots for Day 5.");
                    } else {
                        availableSlot.setDay5(current + 1);
                    }
                }
                case 6 -> {
                    int current = availableSlot.getDay6();
                    if (isDecrement) {
                        if (current > 0) availableSlot.setDay6(current - 1);
                        else throw new IllegalStateException("No available slots for Day 6.");
                    } else {
                        availableSlot.setDay6(current + 1);
                    }
                }
                case 7 -> {
                    int current = availableSlot.getDay7();
                    if (isDecrement) {
                        if (current > 0) availableSlot.setDay7(current - 1);
                        else throw new IllegalStateException("No available slots for Day 7.");
                    } else {
                        availableSlot.setDay7(current + 1);
                    }
                }
                case 8 -> {
                    int current = availableSlot.getDay8();
                    if (isDecrement) {
                        if (current > 0) availableSlot.setDay8(current - 1);
                        else throw new IllegalStateException("No available slots for Day 8.");
                    } else {
                        availableSlot.setDay8(current + 1);
                    }
                }
                case 9 -> {
                    int current = availableSlot.getDay9();
                    if (isDecrement) {
                        if (current > 0) availableSlot.setDay9(current - 1);
                        else throw new IllegalStateException("No available slots for Day 9.");
                    } else {
                        availableSlot.setDay9(current + 1);
                    }
                }
                case 10 -> {
                    int current = availableSlot.getDay10();
                    if (isDecrement) {
                        if (current > 0) availableSlot.setDay10(current - 1);
                        else throw new IllegalStateException("No available slots for Day 10.");
                    } else {
                        availableSlot.setDay10(current + 1);
                    }
                }
                default -> throw new IllegalArgumentException("Invalid concert ID: " + concertId);
            }
        }

        slotRepository.save(availableSlot);
        return availableSlot;
    }
}