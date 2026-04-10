package com.example.studentservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentResponse {
    private String id;
    private String name;
    private Integer rollNo;
    private String email;
    private String role;
}
