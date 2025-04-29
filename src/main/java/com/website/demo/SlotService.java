package com.website.demo;

import org.aspectj.weaver.patterns.ConcreteCflowPointcut.Slot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SlotService {
    private final SlotRepository slotRepository;
    @Autowired
    public SlotService(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    @Transactional
    public void decrementSlot(List<Integer> concert_id) {
        slot slot = slotRepository.findById(1).orElseThrow(() -> new IllegalArgumentException("Slot record not found"));

        for (Integer id : concert_id) {
            switch (id) {
                case 1 -> {
                    if (slot.getDay1() > 0) slot.setDay1(slot.getDay1() - 1);
                }
                case 2 -> {
                    if (slot.getDay2() > 0) slot.setDay2(slot.getDay2() - 1);
                }
                case 3 -> {
                    if (slot.getDay3() > 0) slot.setDay3(slot.getDay3() - 1);
                }
                case 4 -> {
                    if (slot.getDay4() > 0) slot.setDay4(slot.getDay4() - 1);
                }
                case 5 -> {
                    if (slot.getDay5() > 0) slot.setDay5(slot.getDay5() - 1);
                }
                case 6 -> {
                    if (slot.getDay6() > 0) slot.setDay6(slot.getDay6() - 1);
                }
                case 7 -> {
                    if (slot.getDay7() > 0) slot.setDay7(slot.getDay7() - 1);
                }
                case 8 -> {
                    if (slot.getDay8() > 0) slot.setDay8(slot.getDay8() - 1);
                }
                case 9 -> {
                    if (slot.getDay9() > 0) slot.setDay9(slot.getDay9() - 1);
                }
                case 10 -> {
                    if (slot.getDay10() > 0) slot.setDay10(slot.getDay10() - 1);
                }
                default -> throw new IllegalArgumentException("Invalid concert ID: " + id);
            }
        }
    
        slotRepository.save(slot);
    }

    @Transactional
    public void incrementSlot(List<Integer> concert_id) {
        slot slot = slotRepository.findById(concert_id);
        if (slot == null) {
            throw new IllegalArgumentException("Concert not found");
        }

        for (Integer concertId : concert_id) {
            
        }
            slotRepository.save(slot);
    }
}
