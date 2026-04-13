package com.example.facultyservice.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final Algorithm algorithm;
    private final long expiryMs;

    public JwtUtil(@Value("${app.jwt.secret:mysecretkey123}") String secret, @Value("${app.jwt.expiry-ms:36000000}") long expiryMs) {
        this.algorithm = Algorithm.HMAC256(secret);
        this.expiryMs = expiryMs;
    }

    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expiryMs))
                .sign(algorithm);
    }

    public String extractEmail(String token) {
        return parse(token).getSubject();
    }

    public boolean validateToken(String token) {
        try {
            parse(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private DecodedJWT parse(String token) {
        return JWT.require(algorithm).build().verify(token);
    }
}