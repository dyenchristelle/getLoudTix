package com.website.demo;

import org.aspectj.weaver.patterns.ConcreteCflowPointcut.Slot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.website.demo.MessageRepository;
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
        if (messageRepository.existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("You're already reserved.");
        }
        if (request.getConcerts().isEmpty()) {
            throw new IllegalArgumentException("Please select at least one day.");
        }

        slot availableSlot = slotRepository.findById(1);

        slotRepository.save(availableSlot);
        
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


//decrement
    public void decrementSlotAvailability(List<Integer> concert_id) {
        slot availableSlot = slotRepository.findById(1);
        for (Integer concertId : concert_id) {
            switch (concertId) {
                case 1:
                    if (availableSlot.getDay1() > 0) {
                        availableSlot.setDay1(availableSlot.getDay1() - 1);
                    } else {
                        throw new IllegalStateException("No available slots for Day 1.");
                    }
                    break;
                case 2:
                    if (availableSlot.getDay2() > 0) {
                        availableSlot.setDay2(availableSlot.getDay2() - 1);
                    } else {
                        throw new IllegalStateException("No available slots for Day 2.");
                    }
                    break;
                case 3:
                    if (availableSlot.getDay3() > 0) {
                        availableSlot.setDay3(availableSlot.getDay3() - 1);
                    } else {
                        throw new IllegalStateException("No available slots for Day 3.");
                    }
                    break;
                case 4:
                    if (availableSlot.getDay4() > 0) {
                        availableSlot.setDay4(availableSlot.getDay4() - 1);
                    } else {
                        throw new IllegalStateException("No available slots for Day 4.");
                    }
                    break;
                case 5:
                    if (availableSlot.getDay5() > 0) {
                        availableSlot.setDay5(availableSlot.getDay5() - 1);
                    } else {
                        throw new IllegalStateException("No available slots for Day 5.");
                    }
                    break;
                case 6:
                    if (availableSlot.getDay6() > 0) {
                        availableSlot.setDay6(availableSlot.getDay6() - 1);
                    } else {
                        throw new IllegalStateException("No available slots for Day 6.");
                    }
                    break;
                case 7:
                    if (availableSlot.getDay7() > 0) {
                        availableSlot.setDay7(availableSlot.getDay7() - 1);
                    } else {
                        throw new IllegalStateException("No available slots for Day 7.");
                    }
                    break;
                case 8:
                    if (availableSlot.getDay8() > 0) {
                        availableSlot.setDay8(availableSlot.getDay8() - 1);
                    } else {
                        throw new IllegalStateException("No available slots for Day 8.");
                    }
                    break;
                case 9:
                    if (availableSlot.getDay9() > 0) {
                        availableSlot.setDay9(availableSlot.getDay9() - 1);
                    } else {
                        throw new IllegalStateException("No available slots for Day 9.");
                    }
                    break;
                case 10:
                    if (availableSlot.getDay10() > 0) {
                        availableSlot.setDay10(availableSlot.getDay10() - 1);
                    } else {
                        throw new IllegalStateException("No available slots for Day 10.");
                    }
                    break;
                default:
                    throw new IllegalArgumentException("Invalid concert ID: " + concertId);
                }
            }
        }
// increment 
    public void incrementSlotAvailability(List<Integer> concertIds) {
        slot availableSlot = slotRepository.findById(1);

        for (Integer concertId : concertIds) {
            switch (concertId) {
                case 1:
                    availableSlot.setDay1(availableSlot.getDay1() + 1);
                    break;
                case 2:
                    availableSlot.setDay2(availableSlot.getDay2() + 1);
                    break;
                case 3:
                    availableSlot.setDay3(availableSlot.getDay3() + 1);
                    break;
                case 4:
                    availableSlot.setDay4(availableSlot.getDay4() + 1);
                    break;
                case 5:
                    availableSlot.setDay5(availableSlot.getDay5() + 1);
                    break;    
                case 6:
                    availableSlot.setDay6(availableSlot.getDay6() + 1);
                    break;
                case 8:
                    availableSlot.setDay8(availableSlot.getDay8() + 1);
                    break;    
                case 9:
                    availableSlot.setDay9(availableSlot.getDay9() + 1);
                    break;
                case 10:
                    availableSlot.setDay10(availableSlot.getDay10() + 1);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid concertId: " + concertId);
            }
        }
        slotRepository.save(availableSlot);
    }
}
