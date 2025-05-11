package com.example.server.service;

import com.example.server.model.Task;
import com.example.server.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    public Task createTask(String taskName) {
        Task task = new Task(taskName);
        return taskRepository.save(task);
    }

    public Task findByName(String name) {
        return taskRepository.findByName(name);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    public Task updateTaskName(String id, String name) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setName(name);
        return taskRepository.save(task);
    }
}
