package com.dis.recipe.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecipeIngredientInfo {
    private String id;
	private RecipeInfo recipe;
	private IngredientInfo ingredientId;
	private String quantity;
}
