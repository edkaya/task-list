package com.example.server.model;

import jakarta.persistence.*;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "task_id", nullable = false)
    private Long id;
    @Column(name = "task_name", nullable = false, unique = true)
    private String name;

    protected Task() {}

    public Task(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
