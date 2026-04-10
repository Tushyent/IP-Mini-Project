package com.example.eventservice.service;

import com.example.eventservice.model.EventModel;
import com.example.eventservice.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventRepository repo;

    public EventService(EventRepository repo) {
        this.repo = repo;
    }

    public EventModel saveEvent(EventModel model) {
        return repo.save(model);
    }

    public List<EventModel> getAllEvents() {
        return repo.findAll();
    }

    public List<EventModel> getEventsByRoll(Integer rollNo) {
        return repo.findAllByRollNo(rollNo);
    }

    public EventModel updateEvent(String id, EventModel payload) {
        EventModel event = repo.findById(id).orElseThrow();
        event.setEventName(payload.getEventName());
        event.setStudentName(payload.getStudentName());
        event.setRollNo(payload.getRollNo());
        event.setLocation(payload.getLocation());
        event.setDate(payload.getDate());
        event.setDescription(payload.getDescription());
        return repo.save(event);
    }

    public void deleteEvent(String id) {
        repo.deleteById(id);
    }
}