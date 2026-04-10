package com.example.eventservice.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private final Algorithm algorithm;

    public JwtUtil(@Value("${app.jwt.secret}") String secret) {
        this.algorithm = Algorithm.HMAC256(secret);
    }

    public boolean validateToken(String token) {
        try {
            JWT.require(algorithm).build().verify(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public String extractEmail(String token) {
        DecodedJWT jwt = JWT.require(algorithm).build().verify(token);
        return jwt.getSubject();
    }

    public String extractRole(String token) {
        DecodedJWT jwt = JWT.require(algorithm).build().verify(token);
        return jwt.getClaim("role").asString();
    }
}
