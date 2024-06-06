package com.dis.recipe.service;

import com.dis.recipe.dto.Recipe;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class RecipeService {
	public Recipe create(Recipe recipe) {
		System.out.println("TEST");
		return recipe;
	}
}
