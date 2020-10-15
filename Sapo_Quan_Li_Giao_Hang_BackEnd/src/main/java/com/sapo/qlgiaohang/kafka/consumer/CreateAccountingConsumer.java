//package com.sapo.qlgiaohang.kafka.consumer;
//
//import com.sapo.qlgiaohang.services.AccountingService;
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Component;
//
//@Component
//public class CreateAccountingConsumer {
//    private AccountingService accountingService;
//
//    @Autowired
//    public CreateAccountingConsumer(AccountingService accountingService) {
//        this.accountingService = accountingService;
//    }
//
//    @KafkaListener(topics = "accounting", groupId = "Group_id", containerFactory = "cfg")
//    public void consumer(String message){
//        accountingService.kafkaCreate(message);
//    }
//}
