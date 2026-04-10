package com.example.studentservice.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class LoginResponse {
    private String token;
    private StudentResponse studentDetails;
    private List<Map<String, Object>> events;
}
