package com.dis.recipe.service.controller;

import com.dis.recipe.service.RecipeService;
import com.dis.recipe.dto.RecipeInfo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("recipe")
@RestController
@AllArgsConstructor
public class RecipeController {
	private final RecipeService recipeService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<RecipeInfo> getAll() {
        return recipeService.getAllRecipes();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public RecipeInfo getRecipeById(@PathVariable String id) {
        RecipeInfo recipeInfo = recipeService.getRecipeById(id);
        return recipeInfo;
    }

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public RecipeInfo create(@RequestBody RecipeInfo source) {
		return recipeService.create(source);
	}

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable String id) {
        recipeService.deleteRecipe(id);
        return;
    }
    @PutMapping("/name")
    public void updateRecipeName(@RequestBody RecipeInfo recipe) {
        recipeService.updateRecipeName(recipe);
        return;
    }
}
