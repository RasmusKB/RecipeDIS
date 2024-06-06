package dk.acto.commerce.recipe;

import lombok.Builder;
import lombok.Data;

import java.math.Instant;
import java.util.List;

@Data
@Builder
public class OrderInfo {
    private String id;
    private User createdBy;
    private Int cookingTime;
    private String instructions;
    private List<RecipeIngredient> ingredients;
}
