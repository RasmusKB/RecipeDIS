package com.dis.recipe.dao;

import com.dis.recipe.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IngredientDao extends JpaRepository<Ingredient, String>{
}
