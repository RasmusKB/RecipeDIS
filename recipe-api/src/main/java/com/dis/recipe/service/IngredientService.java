package com.dis.recipe.service;

import com.dis.recipe.dto.IngredientInfo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class IngredientService {
	public IngredientInfo create(IngredientInfo recipe) {
		System.out.println("TEST");
		return recipe;
	}
}
