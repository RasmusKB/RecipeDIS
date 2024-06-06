package com.dis.recipe.service.controller;

import com.dis.recipe.service.RecipeService;
import com.dis.recipe.dto.Recipe;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.math.BigInteger;

@Slf4j
@RequestMapping("recipe")
@Api(value = "/recipe", tags = "Recipe")
@RestController
@AllArgsConstructor
public class RecipeController {
	private final RecipeService recipeService;

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public Recipe create(@RequestBody Recipe source) {
		return recipeService.create(source);
	}
}
