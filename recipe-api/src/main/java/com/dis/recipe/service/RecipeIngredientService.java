package com.dis.recipe.service;

import com.dis.recipe.dto.RecipeIngredientInfo;
import com.dis.recipe.dao.*;
import com.dis.recipe.entity.*;
import com.dis.recipe.util.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.math.BigInteger;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class RecipeIngredientService {
	private final RecipeIngredientDao recipeIngredientDao;
	private final DtoFactory dtoFactory;

	public List<RecipeIngredientInfo> getById(String id) {
        return (Optional.ofNullable(recipeIngredientDao.findByRecipeId(id))
					.stream()
					.flatMap(Collection::stream)
					.map(dtoFactory::toInfo)
					.collect(Collectors.toList()));
	}

	public List<RecipeIngredientInfo> create(List<RecipeIngredientInfo> ingredients) {
        List<RecipeIngredient> entities =
			ingredients.stream().map(recipeIngredient ->
				RecipeIngredient.builder()
	                .id(UUID.randomUUID().toString())
					.recipeId(recipeIngredient.getRecipeId())
					.ingredientId(recipeIngredient.getIngredientId())
					.quantity(recipeIngredient.getQuantity())
					.build()
			).collect(Collectors.toList());

        entities.forEach(entity -> {
            recipeIngredientDao.insertRecipeIngredient(
                entity.getId(),
                entity.getRecipeId(),
                entity.getIngredientId(),
                entity.getQuantity()
            );
        });

        return entities.stream().map(dtoFactory::toInfo).collect(Collectors.toList());
	}

	public void deleteRecipeIngredientById(String id) {
		recipeIngredientDao.deleteRecipeIngredintsById(id);
	}
}
