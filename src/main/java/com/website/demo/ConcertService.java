package com.website.demo;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.aspectj.weaver.patterns.ConcreteCflowPointcut.Slot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ConcertService {
   private final List<concert> concerts;
   private ConcertRepository concertRepository;
   private SlotRepository slotRepository;
   private MessageService messageService;

   @Autowired
    public ConcertService(ConcertRepository concertRepository, SlotRepository slotRepository, MessageService messageService) throws IOException {
        this.concerts = loadConcertsFromJson();
        this.concertRepository = concertRepository;
        this.slotRepository = slotRepository;
        this.messageService = messageService;

        concertRepository.saveAll(concerts);
    }

    private List<concert> loadConcertsFromJson() throws IOException {
        ObjectMapper mapper = new ObjectMapper();

         InputStream inputStream = getClass().getClassLoader().getResourceAsStream("static/tickets.json");

        if (inputStream == null) {
            throw new FileNotFoundException("tickets.json not found in classpath under static/");
        }
        return mapper.readValue(inputStream, new TypeReference<List<concert>>() {});
    }
    public List<concert> getAllConcerts() {
        List<concert> concerts = new ArrayList<>();
    concertRepository.findAll().forEach(concerts::add);
    return concerts;
    }

    public concert getConcertById(int concertId) {
        return  concertRepository.findById(concertId);
    }

    // public List<concert> getAllConcertsWithSlots() {
    //     List<concert> concerts = concertRepository.findAll();
    //     Slot slot = slotRepository.findById(1).orElse(new Slot());

    //     List<concert> dtoList = new ArrayList<>();
    //     for (concert c : concerts) {
    //         concert dto = new concert();
    //         dto.setId(c.getId());
    //         dto.setName(c.getName());
    //         dto.setImage(c.getImage());
    //         dto.setDate(c.getDate());
    //         dto.setConcert(c.getConcert());
    //         dto.setDetails(c.getDetails());

    //         slot slots = slotRepository.findById(c.getConcert())

    //         dto.setSlotText("Available Slot: " + availableSlots);
    //         dtoList.add(dto);
    //     }

    //     return dtoList;
    // }




    // public void displaySlot(int concert_id) {
    //     slot slots = slotRepository.findById(concert_id);
        
    //     for (avail_slot : concert_id) {
    //         concert
    //     }
    // }

    // public Map<Integer, concert> getAvailableSlotById(List<concert> concertId) {
    //     slot availableSlot = slotRepository.findById(1); // fetch the slot row
    //     switch (concertId) {
    //         case 1: return availableSlot.getDay1();
    //         case 2: return availableSlot.getDay2();
    //         case 3: return availableSlot.getDay3();
    //         case 4: return availableSlot.getDay4();
    //         case 5: return availableSlot.getDay5();
    //         case 6: return availableSlot.getDay6();
    //         case 7: return availableSlot.getDay7();
    //         case 8: return availableSlot.getDay8();
    //         case 9: return availableSlot.getDay9();
    //         case 10: return availableSlot.getDay10();
    //         default: throw new IllegalArgumentException("Invalid concert ID: " + concertId);
    //     }
    // }

    // public List<concert> updateAvailableSlotsAndGetConcerts(List<Integer> concertIds) {
    //     List<concert> concerts = new ArrayList<>();
    //     slot availableSlot = slotRepository.findById(1); // Assuming you have one slot record
    
    //     for (Integer concertId : concertIds) {
    //         concert concert = concertRepository.getConcertById(concertId); // Retrieve concert details by ID
    //         if (concert != null) {
    //             // Decrement slot for the selected concert
    //             messageService.decrementSlotAvailability(concertId, availableSlot);
    //             concerts.add(concert); // Add the concert to the list
    //         }
    //     }
    
    //     return concerts;
    // }
}
