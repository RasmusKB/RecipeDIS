package com.dis.recipe.service.controller;

import com.dis.recipe.service.RecipeIngredientService;
import com.dis.recipe.dto.RecipeIngredientInfo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("recipeingredient")
@RestController
@AllArgsConstructor
public class RecipeIngredientController {
	private final RecipeIngredientService recipeIngredientService;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<RecipeIngredientInfo> getRecipeIngredientsByRecipeId(@PathVariable String id) {
        return recipeIngredientService.getById(id);
    }

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<RecipeIngredientInfo> create(@RequestBody List<RecipeIngredientInfo> source) {
		return recipeIngredientService.create(source);
	}

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteRecipeIngredientsByRecipeId(@PathVariable String id) {
        recipeIngredientService.deleteById(id);
		return;
    }
}
