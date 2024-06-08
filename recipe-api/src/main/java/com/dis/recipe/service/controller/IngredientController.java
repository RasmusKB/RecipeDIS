package com.dis.recipe.service.controller;

import com.dis.recipe.service.IngredientService;
import com.dis.recipe.dto.IngredientInfo;
import com.dis.recipe.dto.RecipeInfo;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.math.BigInteger;
import java.util.List;

@Slf4j
@RequestMapping("ingredient")
@RestController
@AllArgsConstructor
public class IngredientController {
	private final IngredientService ingredientService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<IngredientInfo> getAll() {
        return ingredientService.getAllIngredients();
    }

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public IngredientInfo getIngredientById(@PathVariable String id) {
		IngredientInfo ingredientInfo = ingredientService.getIngredientById(id);
		return ingredientInfo;
	}

	@DeleteMapping("/{id}")
	public void deleteIngredient(@PathVariable String id) {
		ingredientService.deleteIngredient(id);
		return;
	}

	@PutMapping("/{id}/name")
	public void updateIngredientName(@PathVariable String id, @RequestParam String name) {
		ingredientService.updateIngredientName(id, name);
		return;
	}

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public IngredientInfo create(@RequestBody IngredientInfo source) {
		return ingredientService.create(source);
	}
}
