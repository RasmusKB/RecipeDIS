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

    @Query("select u from User u where u.username = ?1 and u.password = ?2")
    List<User> findUserByUsernameAndEmail(String username, String password);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO User (id, username, password, email) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insert(String id, String username, String password, String email);

    @Query("select u from User u where u.id = ?1 and u.username = ?2 and u.password = ?3")
    List<User> findUserByIdAndUsernameAndPassword(String id, String username, String password);

    @Modifying
    @Query("delete from User u where u.id = ?1")
    void deleteById(String id);
}
