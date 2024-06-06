package com.dis.recipe.service.controller;

import com.dis.recipe.service.RecipeService;
import com.dis.recipe.dto.RecipeInfo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.math.BigInteger;

@Slf4j
@RequestMapping("recipe")
@RestController
@AllArgsConstructor
public class RecipeController {
	private final RecipeService recipeService;

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public int create(@RequestBody RecipeInfo source) {
		RecipeInfo test = recipeService.create(source);
		System.out.println(test);
		return 5;
	}
}
