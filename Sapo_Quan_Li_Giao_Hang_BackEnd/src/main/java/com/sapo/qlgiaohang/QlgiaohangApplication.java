package com.sapo.qlgiaohang;

import org.quartz.SchedulerException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication()
@EnableScheduling
public class QlgiaohangApplication {
    public static void main(String[] args) {
        SpringApplication.run(QlgiaohangApplication.class, args);
    }

}
