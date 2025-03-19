package com.website.demo;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Table;

@Entity 
@Table(name = "getloudtix_db")
public class Message {
    private String name;
    @Id
    private String email;

    @ElementCollection
    private List<String> day;

    public Message() {}

    public Message(String name, String email, List<String> day){
        this.name = name;
        this.email = email;
        this.day = day;
    }
        public String getName() {
            return name;
        }
        public void setName(String name){
            this.name =  name;
        }
        
        public String getEmail(){
            return email;
        }
        public void setEmail(String email){
            this.email =  email;
        }

        public List<String> getDay(){
            return day;
        }
        public void setDay(List<String> day){
            this.day = day;
        }

    @Converter
    public static class StringListConverter implements AttributeConverter<List<String>, String> {
        @Override
        public String convertToDatabaseColumn(List<String> list) {
            return list != null ? String.join(",", list) : "";
        }

        @Override
        public List<String> convertToEntityAttribute(String data) {
            return data != null && !data.isEmpty() ? Arrays.stream(data.split(",")).collect(Collectors.toList()) : null;
        }
    }
}
