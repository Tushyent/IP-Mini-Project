package com.example.eventservice.controller;

import com.example.eventservice.dto.EventRequest;
import com.example.eventservice.model.EventModel;
import com.example.eventservice.service.EventService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(
    origins = "https://ip-mini-project-tushyent.vercel.app",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
               RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowedHeaders = "*",
    allowCredentials = "true"
)
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping
    public List<EventModel> getAll() {
        return service.getAllEvents();
    }

    @PostMapping("/add")
    public EventModel createEvent(@Valid @RequestBody EventRequest request) {
        EventModel model = mapRequest(request);
        return service.saveEvent(model);
    }

    @GetMapping("/{rollNo}")
    public List<EventModel> getByRoll(@PathVariable Integer rollNo, Authentication authentication) {
        return service.getEventsByRoll(rollNo);
    }

    @PutMapping("/{id}")
    public EventModel updateEvent(@PathVariable String id, @Valid @RequestBody EventRequest request) {
        return service.updateEvent(id, mapRequest(request));
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        service.deleteEvent(id);
    }

    private EventModel mapRequest(EventRequest request) {
        EventModel model = new EventModel();
        model.setEventName(request.getEventName());
        model.setStudentName(request.getStudentName());
        model.setRollNo(request.getRollNo());
        model.setLocation(request.getLocation());
        model.setDate(request.getDate());
        model.setDescription(request.getDescription());
        return model;
    }
}