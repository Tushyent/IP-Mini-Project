package com.example.eventservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="events")
public class EventModel {
    @Id
    private String id;
    private String studentName;
    private Integer rollNo;
    private String eventName;
    private String location;
    private String date;
    private String description;
}