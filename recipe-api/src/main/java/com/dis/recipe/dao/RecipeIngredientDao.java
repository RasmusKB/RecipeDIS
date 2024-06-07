package com.dis.recipe.dao;

import com.dis.recipe.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface RecipeIngredientDao extends JpaRepository<RecipeIngredient, String> {

    @Query(value = "SELECT * FROM recipe_ingredient WHERE recipe_id = ?1", nativeQuery = true)
    List<RecipeIngredient> findByRecipeId(String recipeId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO recipe_ingredient (id, recipe_id, ingredient_id, quantity) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insertRecipeIngredient(String id, String recipeId, String ingredientId, String quantity);
}
