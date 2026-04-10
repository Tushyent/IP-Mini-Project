package com.example.facultyservice.service;

import com.example.facultyservice.model.FacultyModel;
import com.example.facultyservice.repository.FacultyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    private final FacultyRepository repo;

    public FacultyService(FacultyRepository repo){
        this.repo = repo;
    }

    public FacultyModel register(FacultyModel model){
        return repo.save(model);
    }

    public String login(FacultyModel model){

        FacultyModel faculty = repo.findByEmail(model.getEmail());

        if(faculty == null)
            return "Faculty not found";

        if(faculty.getPassword().equals(model.getPassword()))
            return "Login Successful";

        return "Invalid Password";
    }

    public List<FacultyModel> getAllFaculty(){
        return repo.findAll();
    }
}