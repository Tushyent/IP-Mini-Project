package com.example.studentservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="students")
public class RegisterModel {
    @Id
    private String id;
    private String name;
    private Integer rollNo;
    private String email;
    private String password;
    private String role;
}