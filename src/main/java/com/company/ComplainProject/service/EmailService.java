package com.company.ComplainProject.service;

import com.company.ComplainProject.config.exception.ContentNotFoundException;
import com.company.ComplainProject.dto.ForgetPasswordDto;
import com.company.ComplainProject.dto.UserDto;
import com.company.ComplainProject.model.ForgetPassword;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.ForgetPasswordRepo;
import com.company.ComplainProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Properties;

@Service
public class EmailService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ForgetPasswordRepo forgetPasswordRepo;
    @Autowired
    UserService userService;

    public Long getUserIdByEmail(String email) {
//        System.out.println(userRepository.findByEmail(email));
        Long byEmail = userRepository.byEmail(email);
        if(byEmail != null){
            return byEmail;
        }
        throw new ContentNotFoundException("No User present with Email of "+email);


    }

    public ForgetPassword saveOtpInDb(ForgetPassword forgetPasswordDto){
        return forgetPasswordRepo.save(forgetPasswordDto);
    }

//    public ForgotPasswordDto toDto(ForgotPassword forgotPassword){
//        return ForgotPasswordDto.builder().Id(forgotPassword.getId()).otp(forgotPassword.getOtp()).build();
//    }
//    public ForgotPassword dto(int dto){
//        return ForgotPassword.builder().Id(dto.getId()).otp(dto.getOtp()).build();
//    }

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

    public List<ForgetPassword> getAllOtp() {
        List<ForgetPassword> allOtp = forgetPasswordRepo.findAll();


        return allOtp;
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    public UserDto updateUserPassword( ForgetPasswordDto forgetPasswordDto ){
        try {
            Long userId=forgetPasswordDto.getId();
            List<ForgetPassword> f = getAllOtp();
            User updateUser = getAllUsers().stream().filter(el -> el.getId().equals(userId)).findAny().get();

            boolean bol = false;
            for (ForgetPassword el : f) {
                if (el.getOtp().equals(forgetPasswordDto.getOtp())) {
                    if (updateUser != null) {
                        updateUser.setPassword(forgetPasswordDto.getPassword());
                    }
                    bol = true;
                }
            }

            if (bol) {
                UserDto userDto = userService.toDto(userRepository.save(updateUser));

                if (userDto != null) {
                    ForgetPassword otpId = forgetPasswordRepo.getIdByOtp(forgetPasswordDto.getOtp());
                    forgetPasswordRepo.deleteById(otpId.getId());
                }
                return userDto;
            }
            else{
                throw new ContentNotFoundException("No otp found");
            }
        }catch (Exception e){
            throw new ContentNotFoundException("a");
        }
    }


}

