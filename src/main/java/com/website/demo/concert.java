package com.website.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class concert {
    @Id
    private int id;
    private String name;
    private String image;
    private String date;
    private String concert;
    private String slotText;
    private String details;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getConcert() {
        return concert;
    }

    public void setConcert(String concert) {
        this.concert = concert;
    }

    public String getSlotText() {
        return slotText;
    }

    public void setSlotText(String slotText) {
        this.slotText = slotText;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}


