package com.example.studentservice.controller;

import com.example.studentservice.dto.LoginResponse;
import com.example.studentservice.dto.StudentLoginRequest;
import com.example.studentservice.dto.StudentRegisterRequest;
import com.example.studentservice.dto.StudentResponse;
import com.example.studentservice.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public StudentResponse register(@Valid @RequestBody StudentRegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/faculty/register")
    public StudentResponse registerFaculty(@Valid @RequestBody StudentRegisterRequest request) {
        return service.registerFaculty(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody StudentLoginRequest request) {
        return service.login(request);
    }

    @GetMapping("/all")
    public List<StudentResponse> getAllStudents() {
        return service.getAllStudents();
    }
}