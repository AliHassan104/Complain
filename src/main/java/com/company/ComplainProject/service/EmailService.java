package com.company.ComplainProject.service;

import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {

    public void sendEmail(String subject,String message,String to){

        String from="fk1271543@gmail.com";
        String host="smtp.gmail.com";

        Properties properties = System.getProperties();

        properties.put("mail.smtp.host",host);
        properties.put("mail.smtp.port","465");
        properties.put("mail.smtp.auth","true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.starttls.required", "true");
        properties.put("mail.smtp.ssl.protocols", "TLSv1.2");
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("fk1271543@gmail.com","snnuwvlnxudwysxr");
            }
        });

        session.setDebug(true);
        MimeMessage message1 = new MimeMessage(session);
        try{
            message1.setFrom(new InternetAddress(from));
            message1.addRecipient(Message.RecipientType.TO,new InternetAddress(to));
            message1.setSubject(subject);
            message1.setText(message);
            Transport.send(message1);

        }catch (Exception e){
            System.out.println(e);
        }

    }
}

