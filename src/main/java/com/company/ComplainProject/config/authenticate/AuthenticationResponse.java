package com.company.ComplainProject.config.authenticate;

import lombok.Getter;

@Getter

public class AuthenticationResponse {
    private final String jwt;

    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }
}
