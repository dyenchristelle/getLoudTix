package com.website.demo;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Arrays;

import jakarta.persistence.*;

@Entity 
@Table(name = "glt_user")
public class Message {
    @Id
    private String email;

    private String name;

    @Convert(converter = StringListConverter.class)
    private List<String> concerts;

    public Message() {}

    public Message(String name, String email, List<String> concerts){
        this.name = name;
        this.email = email;
        this.concerts = concerts;
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

        public List<String> getConcerts(){
            return concerts;
        }
        public void setConcerts(List<String> concerts){
            this.concerts = concerts;
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
