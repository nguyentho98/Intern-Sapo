package com.sapo.qlgiaohang.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CommonException extends ResponseEntityExceptionHandler {

//    @ExceptionHandler(value = Exception.class)
//    public ResponseEntity<ApiError> exception(Exception exception){
//        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR,"Lỗi không xác định","Lỗi");
//        return new ResponseEntity<>(apiError,apiError.getStatus());
//    }

    @ExceptionHandler(value = NotFoundException.class)
    public ResponseEntity<ApiError> exception(NotFoundException exception){
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND,exception.getMessage(),"Lỗi");
        return new ResponseEntity<>(apiError,apiError.getStatus());
    }
}
