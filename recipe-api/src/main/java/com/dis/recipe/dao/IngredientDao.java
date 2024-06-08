package com.dis.recipe.dao;

import com.dis.recipe.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

public interface IngredientDao extends JpaRepository<Ingredient, String>{
    @Query(value = "SELECT * FROM Ingredient", nativeQuery = true)
    List<Ingredient> getAllIngredients();

    @Query(value = "SELECT * FROM Ingredient WHERE id = ?1", nativeQuery = true)
    Ingredient getIngredientById(String Id);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Ingredient (id, name) VALUES (?1, ?2)", nativeQuery = true)
    void insertIngredient(String id, String name);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Ingredient WHERE id = ?1", nativeQuery = true)
    void deleteIngredientById(String id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Ingredient SET name = ?2 WHERE id = ?1", nativeQuery = true)
    void updateIngredientNameById(String id, String name);
}
