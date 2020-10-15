//package com.sapo.qlgiaohang.configs.kafka.consumer;
//
//import org.apache.kafka.clients.consumer.ConsumerConfig;
//import org.apache.kafka.common.serialization.StringDeserializer;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
//import org.springframework.kafka.core.ConsumerFactory;
//import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
//import org.springframework.kafka.support.serializer.JsonDeserializer;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class KafkaConsumerConfig {
//    @Bean
//    public ConsumerFactory<String, String> kafkaConsumerFactory() {
//        Map<String, Object> config = new HashMap<>();
//        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "127.0.0.1:9092");
//        config.put(ConsumerConfig.GROUP_ID_CONFIG, "Group_id");
//        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
//        return new DefaultKafkaConsumerFactory<String, String>(config, new StringDeserializer(), new JsonDeserializer<>(String.class));
//    }
//
//    @Bean
//    public ConcurrentKafkaListenerContainerFactory<String, String> cfg() {
//        ConcurrentKafkaListenerContainerFactory concurrentKafkaListenerContainerFactory = new ConcurrentKafkaListenerContainerFactory();
//        concurrentKafkaListenerContainerFactory.setConsumerFactory(kafkaConsumerFactory());
//        return concurrentKafkaListenerContainerFactory;
//    }
//
//
//}
