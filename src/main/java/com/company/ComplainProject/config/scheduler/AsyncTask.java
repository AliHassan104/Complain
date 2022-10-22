package com.company.ComplainProject.config.scheduler;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AsyncTask {
    @Async
    void testAsync(List<String> emailList){
        emailList.forEach(email ->{
            try {
                Thread.sleep(1000);
                System.out.println("Sending "+email+"By thread - "+Thread.currentThread());
            }catch (InterruptedException e){

            }
        });
        System.out.println("Async Method");
    }

}
