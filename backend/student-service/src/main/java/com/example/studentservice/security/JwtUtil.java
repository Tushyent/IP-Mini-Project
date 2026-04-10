package com.example.studentservice.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtUtil {
    private final Algorithm algorithm;
    private final long expirationMinutes;

    public JwtUtil(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.expiration-minutes}") long expirationMinutes) {
        this.algorithm = Algorithm.HMAC256(secret);
        this.expirationMinutes = expirationMinutes;
    }

    public String generateToken(String email, String role) {
        Instant now = Instant.now();
        return JWT.create()
                .withSubject(email)
                .withClaim("role", role)
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(now.plus(expirationMinutes, ChronoUnit.MINUTES)))
                .sign(algorithm);
    }

    public String extractEmail(String token) {
        return parse(token).getSubject();
    }

    public String extractRole(String token) {
        return parse(token).getClaim("role").asString();
    }

    public boolean validateToken(String token) {
        try {
            parse(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    private DecodedJWT parse(String token) {
        return JWT.require(algorithm).build().verify(token);
    }
}
