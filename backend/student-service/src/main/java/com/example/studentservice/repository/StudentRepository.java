package com.example.studentservice.repository;

import com.example.studentservice.model.RegisterModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<RegisterModel,String> {
    RegisterModel findByEmail(String email);
    RegisterModel findByRollNo(Integer rollNo);
    boolean existsByEmail(String email);
    boolean existsByRollNo(Integer rollNo);
}