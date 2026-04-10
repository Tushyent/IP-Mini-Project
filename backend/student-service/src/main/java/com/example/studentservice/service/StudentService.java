package com.example.studentservice.service;

import com.example.studentservice.dto.LoginResponse;
import com.example.studentservice.dto.StudentLoginRequest;
import com.example.studentservice.dto.StudentRegisterRequest;
import com.example.studentservice.dto.StudentResponse;
import com.example.studentservice.exception.BadRequestException;
import com.example.studentservice.exception.NotFoundException;
import com.example.studentservice.exception.UnauthorizedException;
import com.example.studentservice.model.RegisterModel;
import com.example.studentservice.repository.StudentRepository;
import com.example.studentservice.security.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class StudentService {
    private final StudentRepository repo;
    private final RestTemplate restTemplate;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final String eventServiceBaseUrl;

    public StudentService(StudentRepository repo, RestTemplate restTemplate, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, @Value("${app.services.event.base-url}") String eventServiceBaseUrl) {
        this.repo = repo;
        this.restTemplate = restTemplate;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.eventServiceBaseUrl = eventServiceBaseUrl;
    }

    public StudentResponse register(StudentRegisterRequest request) {
        return registerByRole(request, "USER");
    }

    public StudentResponse registerFaculty(StudentRegisterRequest request) {
        return registerByRole(request, "ADMIN");
    }

    private StudentResponse registerByRole(StudentRegisterRequest request, String role) {
        if (repo.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }
        if (repo.existsByRollNo(request.getRollNo())) {
            throw new BadRequestException("Roll number already registered");
        }
        RegisterModel student = new RegisterModel();
        student.setName(request.getName().trim());
        student.setRollNo(request.getRollNo());
        student.setEmail(request.getEmail().trim().toLowerCase());
        student.setPassword(passwordEncoder.encode(request.getPassword()));
        student.setRole(role);
        return toStudentResponse(repo.save(student));
    }

    public LoginResponse login(StudentLoginRequest request) {
        RegisterModel student = repo.findByEmail(request.getEmail().trim().toLowerCase());
        if (student == null) {
            throw new NotFoundException("Student not found");
        }
        if (!passwordEncoder.matches(request.getPassword(), student.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }
        String token = jwtUtil.generateToken(student.getEmail(), student.getRole());
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        List<Map<String, Object>> events = restTemplate.exchange(
                eventServiceBaseUrl + "/events/" + student.getRollNo(),
                HttpMethod.GET,
                entity,
                List.class
        ).getBody();
        return LoginResponse.builder()
                .token(token)
                .studentDetails(toStudentResponse(student))
                .events(events == null ? List.of() : events)
                .build();
    }

    public List<StudentResponse> getAllStudents() {
        return repo.findAll().stream().map(this::toStudentResponse).toList();
    }

    private StudentResponse toStudentResponse(RegisterModel student) {
        return StudentResponse.builder()
                .id(student.getId())
                .name(student.getName())
                .rollNo(student.getRollNo())
                .email(student.getEmail())
                .role(student.getRole())
                .build();
    }
}