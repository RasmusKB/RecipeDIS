package com.dis.recipe.util;

import com.dis.recipe.dto.*;
import com.dis.recipe.entity.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Component
@AllArgsConstructor
public class DtoFactory {
	public RecipeInfo toInfo(final Recipe source) {
		return RecipeInfo.builder()
			.id(source.getId())
			.name(source.getName())
			.createdBy(source.getCreatedBy())
			.cookingTime(BigInteger.valueOf(source.getCookingTime()))
			.instruction(source.getInstruction())
			.build();
	}

	public RecipeIngredientInfo toInfo (final RecipeIngredient source) {
		return RecipeIngredientInfo.builder()
			.id(source.getId())
			.recipeId(source.getRecipeId())
			.ingredientId(source.getIngredientId())
			.quantity(source.getQuantity())
			.build();
	}

	public IngredientInfo toInfo (final Ingredient source) {
		return IngredientInfo.builder()
			.id(source.getId())
			.name(source.getName())
			.build();
	}

	public UserInfo toInfo (final User source) {
		return UserInfo.builder()
			.id(source.getId())
			.username(source.getUsername())
			.password(source.getPassword())
			.email(source.getEmail())
			.build();
	}

}
