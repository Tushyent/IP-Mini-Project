package com.example.eventservice.repository;

import com.example.eventservice.model.EventModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventRepository extends MongoRepository<EventModel,String> {
    List<EventModel> findAllByRollNo(Integer rollNo);
}