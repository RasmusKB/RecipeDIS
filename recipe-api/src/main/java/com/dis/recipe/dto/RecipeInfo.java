package com.dis.recipe.dto;


import lombok.Builder;
import lombok.Data;

import java.math.BigInteger;
import java.util.List;

@Data
@Builder
public class Recipe {
    private String id;
    private UserInfo createdBy;
    private BigInteger cookingTime;
    private String instructions;
    private List<RecipeIngredient> ingredients;
}
