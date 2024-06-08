package com.dis.recipe.service;

import com.dis.recipe.dto.IngredientInfo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.dis.recipe.dao.*;
import com.dis.recipe.entity.*;
import com.dis.recipe.util.*;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class IngredientService {
	private final IngredientDao ingredientDao;
	private final DtoFactory dtoFactory;

	public IngredientInfo getIngredientById(String id) {
		return dtoFactory.toInfo(ingredientDao.getIngredientById(id));
	}

	public IngredientInfo create(IngredientInfo recipe) {
		Ingredient entity = Ingredient.builder()
				.id(UUID.randomUUID().toString())
				.name(recipe.getName())
				.build();
		
		ingredientDao.insertIngredient(entity.getId(), entity.getName());
		return dtoFactory.toInfo(entity);
	}

	public List<IngredientInfo> getAllIngredients() {
		return Optional.ofNullable(ingredientDao.getAllIngredients())
				.stream() 
				.flatMap(Collection::stream)
				.map(dtoFactory::toInfo)
				.collect(Collectors.toList());
	}

	public void deleteIngredient(String id) {
		ingredientDao.deleteIngredientById(id);
	}

	public void updateIngredientName(String id, String name) {
		ingredientDao.updateIngredientNameById(id, name);
	}
}
