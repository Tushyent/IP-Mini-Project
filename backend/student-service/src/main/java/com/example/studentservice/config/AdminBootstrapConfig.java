package com.example.studentservice.config;

import com.example.studentservice.model.RegisterModel;
import com.example.studentservice.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminBootstrapConfig {
    @Bean
    public CommandLineRunner bootstrapAdmin(StudentRepository repository, PasswordEncoder passwordEncoder, @Value("${app.admin.email}") String adminEmail, @Value("${app.admin.password}") String adminPassword, @Value("${app.admin.name}") String adminName, @Value("${app.admin.roll-no}") Integer adminRollNo) {
        return args -> {
            if (!repository.existsByEmail(adminEmail)) {
                RegisterModel admin = new RegisterModel();
                admin.setName(adminName);
                admin.setRollNo(adminRollNo);
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode(adminPassword));
                admin.setRole("ADMIN");
                repository.save(admin);
            }
        };
    }
}
