package com.dis.recipe.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.*;
import java.io.Serializable;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredient implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    private Ingredient ingredient;

    private double quantity;
}
