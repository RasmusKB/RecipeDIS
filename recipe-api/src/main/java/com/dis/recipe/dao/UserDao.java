package com.dis.recipe.dao;

import com.dis.recipe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserDao extends JpaRepository<User, String>{

    @Query("select r from User r where r.username = ?1")
    List<User> findRecipesByUsername(String username);
}
