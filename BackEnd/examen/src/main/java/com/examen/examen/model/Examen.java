package com.examen.examen.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Document
public class Examen {
    @org.springframework.data.annotation.Id
    private String Id;
    private String email;
    private String mailPass;
    private String phone;
    private String countryPhone;
    private String tag;
    private LocalDateTime createdAt;
    private boolean active;
}
