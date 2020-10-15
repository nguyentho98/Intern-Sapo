package com.sapo.qlgiaohang.dto.auth;

import lombok.Data;

@Data
public class authResDTO {
    private long id;
    private String fullName;
    private String token;

    public authResDTO(long id, String fullName, String token) {
        this.fullName = fullName;
        this.token = token;
        this.id = id;
    }
}
