package com.example.facultyservice.repository;

import com.example.facultyservice.model.FacultyModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FacultyRepository extends MongoRepository<FacultyModel,String> {

    FacultyModel findByEmail(String email);

}