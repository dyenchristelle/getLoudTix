package com.website.demo;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

@Service
public class ConcertService {
   private Map<Integer, concert> concertMap = new HashMap<>();
   private final List<concert> concerts;
   private ConcertRepository concertRepository;

   @Autowired
    public ConcertService(ConcertRepository concertRepository) throws IOException {
        this.concerts = loadConcertsFromJson();
        this.concertRepository = concertRepository;

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
        return concertRepository.findAll();
    }

    public concert getConcertById(int concertId) {
        return  concertRepository.findById(concertId);
    }
}
