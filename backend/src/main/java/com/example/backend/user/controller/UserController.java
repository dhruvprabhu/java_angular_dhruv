package com.example.backend.user.controller;

import com.example.backend.user.exception.ResourceNotFoundException;
import com.example.backend.user.model.User;
import com.example.backend.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("user-list")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("add-user")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User createdUser = userService.addUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("login")
    public ResponseEntity<User> loginUser(
            @RequestParam String username,
            @RequestParam String password) {
        User user = userService.login(username, password);
        if (user != null) {
            return ResponseEntity.ok(user);
        }else {
            throw new ResourceNotFoundException("Invalid username or password, or user is marked deleted");
        }
    }

    @PutMapping("edit-user/{id}")
    public ResponseEntity<User> editUser(
            @PathVariable("id") Long id,
            @RequestBody User userDetails){
        User user = userService.editUser(id, userDetails);
        if(user != null){
            return ResponseEntity.ok(user);
        }else {
            throw new ResourceNotFoundException("Invalid username or password, or user is marked deleted");
        }
    }


    @PutMapping("delete-user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable long id){
        boolean isDeleted = userService.deleteUser(id);
        if(isDeleted){
            return ResponseEntity.ok("User deleted successfully");
        }else{
            throw new ResourceNotFoundException("User not found");
        }
    }

}
