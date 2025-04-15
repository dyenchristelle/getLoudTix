package com.website.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendConfirmationEmail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("🎟️ Ticket Reservation Confirmation");
        message.setText("Hello,\n\n"
                + "Thank you for reserving your tickets!\n"
                + "Your reservation has been confirmed. 🎶\n\n"
                + "Event Details:\n"
                + "🎤 Concert Name: GET LOUD TIX\n"
                + "📅 Date: March 30, 2025\n"
                + "📍 Venue: Loud Arena, New York\n\n"
                + "See you at the event!\n\n"
                + "Best regards,\n"
                + "GET LOUD TIX Team");

        mailSender.send(message);
    }
}
