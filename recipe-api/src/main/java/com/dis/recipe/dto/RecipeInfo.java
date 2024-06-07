package com.dis.recipe.dto;


import lombok.Builder;
import lombok.Data;

import java.math.BigInteger;
import java.util.List;

@Data
@Builder
public class RecipeInfo {
    private String id;
	private String name;
    private String createdBy;
    private BigInteger cookingTime;
    private String instruction;
}
