package com.dis.recipe.dao;

import com.dis.recipe.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RecipeDao extends JpaRepository<Recipe, String>{
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Recipe (id, cooking_time, instruction, created_by) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insertRecipe(String id, int cookingTime, String instruction, String createdBy);

	@Query("select r from Recipe r")
    List<Recipe> getAllRecipes();
}
