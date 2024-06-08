package com.dis.recipe.dao;

import com.dis.recipe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserDao extends JpaRepository<User, String>{

    @Query(value = "SELECT * FROM User where username = ?1 or email = ?2", nativeQuery = true)
    List<User> findUserByUsernameOrEmail(String username, String email);

    //@Query(value = "select u from User u where u.username = ?1 and u.password = ?2", nativeQuery = true)
    @Query(value = "SELECT * FROM User where username = ?1 AND password = ?2", nativeQuery = true)
    List<User> findUserByUsernameAndPassword(String username, String password);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO User (id, username, password, email) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insert(String id, String username, String password, String email);

    @Query(value = "SELECT * FROM User WHERE id = ?1 AND username = ?2 AND password = ?3", nativeQuery = true)
    List<User> findUserByIdAndUsernameAndPassword(String id, String username, String password);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM User WHERE id = ?1", nativeQuery = true)
    void deleteById(String id);
}
