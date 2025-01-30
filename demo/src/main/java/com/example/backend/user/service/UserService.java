package com.example.backend.user.service;

import com.example.backend.user.model.User;
import com.example.backend.user.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UsersRepo usersRepo;

    @Autowired
    public UserService(UsersRepo usersRepo){
        this.usersRepo=usersRepo;
    }

    public User login(String username, String password){
        return usersRepo.findByUsernameAndPasswordAndDelflag(username, password, false)
                .orElse(null);
    }


    public List<User> getAllUsers(){
        return usersRepo.findByDelflagFalse();
    }

    public User addUser(User user){
        return usersRepo.save(user);
    }

    public User editUser(Long id, User userDetails){
        User user  = usersRepo.findById(id).orElse(null);
        if(user != null){
            user.setUsername(userDetails.getUsername());
            user.setPassword(userDetails.getPassword());
            user.setRole(userDetails.getRole());
            user.setEmail(userDetails.getEmail());
            user.setGender(userDetails.getGender());
            user.setAge(userDetails.getAge());
            user.setDelflag(userDetails.isDelflag());

            return usersRepo.save(user);

        }
        return null;
    }


    public boolean deleteUser(long id) {
        User user = usersRepo.findById(id).orElse(null);

        if (user != null) {
            user.setDelflag(true);
            usersRepo.save(user);
            return true;
        }
        return false;
    }
}
