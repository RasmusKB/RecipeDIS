package com.dis.recipe.service.controller;

import com.dis.recipe.service.IngredientService;
import com.dis.recipe.dto.IngredientInfo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.math.BigInteger;

@Slf4j
@RequestMapping("ingredient")
@RestController
@AllArgsConstructor
public class IngredientController {
	private final IngredientService ingredientService;

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public int create(@RequestBody IngredientInfo source) {
		IngredientInfo test = ingredientService.create(source);
		System.out.println(test);
		return 5;
	}
}
