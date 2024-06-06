package com.dis.recipe.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Ingredient {
    private String id;
    private String name;
}
