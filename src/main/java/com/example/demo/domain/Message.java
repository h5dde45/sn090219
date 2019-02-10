package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
//@Data
@ToString(of = {"id", "text"})
@EqualsAndHashCode(of = {"id"})
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.Id.class)
    private Long id;
    @JsonView(Views.IdName.class)
    private String text;

    @Column(updatable = false)
    @JsonView(Views.FullMessage.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm::ss dd-MM-yyyy")
    private LocalDateTime creationDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }
}
