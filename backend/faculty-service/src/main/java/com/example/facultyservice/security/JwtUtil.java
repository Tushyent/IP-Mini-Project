package com.example.facultyservice.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "FacultyServiceSecretKey_SuperSecure_2025";
    private static final long EXPIRY = 1000L * 60 * 60 * 10;

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(SECRET);
    }

    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRY))
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