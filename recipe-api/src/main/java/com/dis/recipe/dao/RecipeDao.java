package com.dis.recipe.dao;

import com.dis.recipe.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RecipeDao extends JpaRepository<Recipe, String>{
	@Query("select r from Recipe r")
    List<Recipe> getAllRecipes();

    @Query("select r from Recipe r where r.id = ?1")
    Recipe getRecipeById(String id);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Recipe (id, name, cooking_time, instruction, created_by) VALUES (?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
    void insertRecipe(String id, String name, int cookingTime, String instruction, String createdBy);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Recipe WHERE id = ?1", nativeQuery = true)
    void deleteRecipeById(String id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Recipe SET name = ?2 WHERE id = ?1", nativeQuery = true)
    void updateRecipeNameById(String id, String name);
}
