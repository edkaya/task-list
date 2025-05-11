package com.example.server.controller;

import com.example.server.model.Task;
import com.example.server.service.TaskService;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
class TaskController {

    @Autowired
    private TaskService taskService;
    private Logger logger = org.apache.logging.log4j.LogManager.getLogger(TaskController.class);

    // Get method
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        logger.info("Get all tasks from client");
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        logger.info("Get a task from client by id");
        Task task = taskService.getTaskById(id).orElseThrow();
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        logger.info("Post request to create a task");
        Task createdTask = taskService.createTask(task.getName());
        return ResponseEntity.ok(createdTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTaskName(@PathVariable String id, @RequestParam String name) {
        logger.info("Put request to update a task");
        Task updatedTask = taskService.updateTaskName(id, name);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        logger.info("Delete a task");
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }
}
