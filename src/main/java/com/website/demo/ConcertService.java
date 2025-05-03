package com.website.demo;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Collections;

@Service
public class ConcertService {
   private final List<concert> concerts;
   private final ConcertRepository concertRepository;
   private final SlotRepository slotRepository;
   private final MessageService messageService;

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
}
