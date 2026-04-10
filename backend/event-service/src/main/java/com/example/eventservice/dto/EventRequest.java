package com.example.eventservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EventRequest {
    @NotBlank
    private String eventName;
    @NotBlank
    private String studentName;
    @NotNull
    private Integer rollNo;
    @NotBlank
    private String location;
    @NotBlank
    private String date;
    @NotBlank
    private String description;
}
