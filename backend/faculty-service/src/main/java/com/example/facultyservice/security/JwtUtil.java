package com.example.facultyservice.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${app.jwt.secret:FacultyServiceSecretKey_SuperSecure_2025}")
    private String secret;

    @Value("${app.jwt.expiry-ms:36000000}")
    private long expiryMs;

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(secret);
    }

    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expiryMs))
                .sign(getAlgorithm());
    }

    public String extractEmail(String token) {
        DecodedJWT decoded = JWT.require(getAlgorithm()).build().verify(token);
        return decoded.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            JWT.require(getAlgorithm()).build().verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}