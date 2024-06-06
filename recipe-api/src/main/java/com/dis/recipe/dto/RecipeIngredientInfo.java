package com.dis.recipe.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecipeIngredient {
    private String id;
	private String recipeId;
	private String ingredientId;
	private String quantity;
}
