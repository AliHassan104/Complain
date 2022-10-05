package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ForgetPasswordDto;
import com.company.ComplainProject.dto.UserDetailsResponse;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.OTP;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.OTPRepository;
import com.company.ComplainProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Properties;

@Service
public class EmailService {


    @Value("${email.path.url}")
    private String emailPath;





    public boolean sendEmail(String subject , String message , String to){


        boolean f=false;

        String from="javaemailsending2@gmail.com";

        // variable for gmail
        String host="smtp.gmail.com";

        //get the system property
        Properties properties=System.getProperties();
        System.out.println("properties " +properties);

        //setting important information

        //host set
        properties.put("mail.smtp.host",host);
        properties.put("mail.smtp.post","465");
//        properties.put("mail.smtp.ssl.enable",true);
        properties.put("mail.smtp.starttls.required","true");
        properties.put("mail.smtp.starttls.enable","true");
        properties.put("mail.smtp.auth","true");
        properties.put("mail.smtp.ssl.protocols","TLSv1.2");
        properties.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");

        //step:1 to get the session object
        Session session=Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("javaemailsending2@gmail.com","bzvhndmzwgmyanik");
            }
        });
        session.setDebug(true);
        //Step 2 compose the message

        MimeMessage mimeMessage=new MimeMessage(session);
        try{
            //from email
            mimeMessage.setFrom(new InternetAddress(from));
//            mimeMessage.setFrom(from);
            //adding recipitent to message
            mimeMessage.addRecipient(Message.RecipientType.TO,new InternetAddress(to));
            //adding subject to message
            mimeMessage.setSubject(subject);
            //adding text to  message
            mimeMessage.setText(message);

            //send

            //step 3 send the message using transport class
            Transport.send(mimeMessage);

            System.out.println("send success.........");

        }catch (Exception e){
            e.printStackTrace();
        }
        return f;

    }


    public void sendForgetPasswordEmail(UserDetailsResponse user,OTP otp) throws UnsupportedEncodingException, MalformedURLException {
        URL url=new URL(emailPath+"#/new-password?otp="+ URLEncoder.encode(otp.getCode().toString(), String.valueOf(StandardCharsets.UTF_8))+"&userId="
                +URLEncoder.encode(user.getId().toString(),StandardCharsets.UTF_8.toString()));
        String message="hello dear your url " + url;
        String subject="Confirmation code";

        sendEmail(subject,message,user.getEmail());
    }
}

