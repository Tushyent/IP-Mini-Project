package com.example.facultyservice.controller;

import com.example.facultyservice.model.FacultyModel;
import com.example.facultyservice.service.FacultyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faculty")
public class FacultyController {

    private final FacultyService service;

    public FacultyController(FacultyService service){
        this.service = service;
    }

    @PostMapping("/register")
    public FacultyModel register(@RequestBody FacultyModel model){
        return service.register(model);
    }

    @PostMapping("/login")
    public String login(@RequestBody FacultyModel model){
        return service.login(model);
    }

    @GetMapping("/")
    public List<FacultyModel> getAllFaculty(){
        return service.getAllFaculty();
    }
}