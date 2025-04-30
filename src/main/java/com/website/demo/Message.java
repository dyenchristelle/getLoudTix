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

    @Convert(converter = IntegerListConverter.class)
    private List<Integer> concert_id;

    public Message() {}

    public Message(String name, String email, List<Integer> concert_id){
        this.name = name;
        this.email = email;
        this.concert_id = concert_id;
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

        public List<Integer> getConcert_id() {
            return concert_id;
        }
        public void setConcert_id(List<Integer> concert_id){
            this.concert_id = concert_id;
        }

    // @Converter
    // public static class StringListConverter implements AttributeConverter<List<String>, String> {
    //     @Override
    //     public String convertToDatabaseColumn(List<String> list) {
    //         return list != null ? String.join(", \n\n", list) : "";
    //     }

    //     @Override
    //     public List<String> convertToEntityAttribute(String data) {
    //         return data != null && !data.isEmpty() ? Arrays.stream(data.split(", \n\n")).collect(Collectors.toList()) : null;
    //     }
    // }

    @Converter
    public static class IntegerListConverter implements AttributeConverter<List<Integer>, String> {
        @Override
        public String convertToDatabaseColumn(List<Integer> list) {
            return (list != null && !list.isEmpty()) ? list.stream().map(String::valueOf).collect(Collectors.joining(", ")): "";
        }

        @Override
        public List<Integer> convertToEntityAttribute(String data) {
            return (data != null && !data.isEmpty())
                ? Arrays.stream(data.split(", ")).map(Integer::parseInt).collect(Collectors.toList()): null;
        }
    }
}
