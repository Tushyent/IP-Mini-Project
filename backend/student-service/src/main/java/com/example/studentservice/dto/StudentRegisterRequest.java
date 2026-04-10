package com.example.studentservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StudentRegisterRequest {
    @NotBlank
    private String name;
    @NotNull
    private Integer rollNo;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Size(min = 6, max = 64)
    private String password;
}
