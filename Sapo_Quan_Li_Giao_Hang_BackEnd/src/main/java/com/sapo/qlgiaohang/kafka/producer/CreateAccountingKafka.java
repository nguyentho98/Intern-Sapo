//package com.sapo.qlgiaohang.kafka.producer;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CreateAccountingKafka {
//    private static final String TOPIC = "accounting";
//
//    private KafkaTemplate<String, String> kafkaTemplate;
//
//    @Autowired
//    public CreateAccountingKafka(KafkaTemplate<String, String> kafkaTemplate) {
//        this.kafkaTemplate = kafkaTemplate;
//    }
//
//    public void sendMessage(String message) {
//        this.kafkaTemplate.send(TOPIC,message);
//        System.out.println("//--------SUCCESS---------//");
//    }
//}
