package com.example.eventservice.controller;

import com.example.eventservice.dto.EventRequest;
import com.example.eventservice.model.EventModel;
import com.example.eventservice.service.EventService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public EventModel createEvent(@Valid @RequestBody EventRequest request) {
        EventModel model = mapRequest(request);
        return service.saveEvent(model);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<EventModel> getAll() {
        return service.getAllEvents();
    }

    @GetMapping("/{rollNo}")
    public List<EventModel> getByRoll(@PathVariable Integer rollNo, Authentication authentication) {
        if (authentication.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return service.getEventsByRoll(rollNo);
        }
        return service.getEventsByRoll(rollNo);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public EventModel updateEvent(@PathVariable String id, @Valid @RequestBody EventRequest request) {
        return service.updateEvent(id, mapRequest(request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
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