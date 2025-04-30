package com.website.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendConfirmationEmail(String to, String name, List<concert> concerts) {
        SimpleMailMessage message = new SimpleMailMessage();
        StringBuilder concertDetails = new StringBuilder();

        for (concert concert : concerts) {
            concertDetails.append("Name: ").append(concert.getName()).append("\n")
                          .append("Title: ").append(concert.getConcert()).append("\n")
                          .append("Date: ").append(concert.getDate()).append("\n\n");
        }
        message.setTo(to);
        message.setSubject("🎟️ Ticket Reservation Confirmation");
        message.setText("Hello " + name + ",\n\n"
                + "Thank you for reserving your tickets with GetLoudTix!\n"
                + "Your reservation has been confirmed. ✅\n\n"
                + "Reservation Details:\n"
                + concertDetails + "\n"
                + "📍 Venue: Loud Arena, New York\n\n"
                + "See you at the event! 💖\n\n"
                + "Best regards,\n"
                + "Dyen & Tin 💕");

        mailSender.send(message);
    }

    public void sendDeletionConfirmation(String to, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Reservation Cancelled - GetLoudTix");
        message.setText("Hello " + name + ",\n\n"
                + "Your reservation has been successfully deleted from GetLoudTix.\n"
                + "We're sorry to see you go, but we hope to see you again soon! 🎟️\n\n"
                + "If you wish to change your reservation, just login and reserve again.\n\n"
                + "Best wishes,\n"
                + "Dyen & Tin 💕");

        mailSender.send(message);
    }
}
