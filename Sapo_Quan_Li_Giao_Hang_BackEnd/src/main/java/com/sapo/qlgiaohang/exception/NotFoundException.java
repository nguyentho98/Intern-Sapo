package com.sapo.qlgiaohang.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }

    @ExceptionHandler({NotFoundException.class})
    public void handleCarException(NotFoundException e) {

    }
}
