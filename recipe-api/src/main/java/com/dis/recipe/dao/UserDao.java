package com.dis.recipe.dao;

import com.dis.recipe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserDao extends JpaRepository<User, String>{

    @Query("select r from User r where r.username = ?1")
    List<User> findRecipesByUsername(String username);

    @Query("select u from User u where u.email = ?1 or u.username = ?2")
    List<User> findUserByUsernameOrEmail(String username, String email);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO User (id, username, password, email) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insert(String id, String username, String password, String email);
}
