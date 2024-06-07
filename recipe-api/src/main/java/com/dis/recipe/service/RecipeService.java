package com.dis.recipe.service;

import com.dis.recipe.dto.RecipeInfo;
import com.dis.recipe.dao.*;
import com.dis.recipe.entity.*;
import com.dis.recipe.util.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class RecipeService {
	private final RecipeDao recipeDao;
	private final DtoFactory dtoFactory;

	public List<RecipeInfo> getAllRecipes() {
        return Optional.ofNullable(recipeDao.getAllRecipes())
					.stream()
					.flatMap(Collection::stream)
					.map(dtoFactory::toInfo)
					.collect(Collectors.toList());
	}

	public RecipeInfo create(RecipeInfo recipe) {
        Recipe entity = Recipe.builder()
                .id(UUID.randomUUID().toString())
                .cookingTime(recipe.getCookingTime().intValue())
                .instruction(recipe.getInstruction())
                .createdBy(recipe.getCreatedBy())
                .build();

        recipeDao.insertRecipe(entity.getId(), entity.getCookingTime(), entity.getInstruction(), entity.getCreatedBy());
		return dtoFactory.toInfo(entity);
	}

    public void deleteRecipe(String id) {
        recipeDao.deleteRecipeById(id);
    }
}
