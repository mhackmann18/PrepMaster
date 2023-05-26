import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import OpenCalculatorButton from "./OpenCalculatorButton";
import RecipeContainer from "../RecipeContainer";
import SubHeading from "./SubHeading";
import IngredientsList from "./IngredientsList";
import NutrientsList from "./NutrientsList";
import Button from "../../common/Button";
import Recipe from "../../../utils/Recipe";
import { updateRecipeById } from "../../../utils/user";

export default function RecipeDisplay({
  startRecipe,
  switchToForm,
  setStartRecipe,
}) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));

  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
    servingSize,
    id,
  } = recipe;
  const navigate = useNavigate();
  const recipeStatus = id ? "saved" : "imported";

  return (
    <div id="recipe">
      <RecipeContainer
        titleComponent={<h2>{title}</h2>}
        subHeadingComponent={
          <SubHeading
            defaultServings={startRecipe.servings}
            servings={servings}
            prepTime={prepTime}
            cookTime={cookTime}
            onSliderChange={(newServings) => {
              setRecipe(
                new Recipe({
                  ...startRecipe.getMultipliedRecipe(
                    newServings / startRecipe.servings
                  ),
                  servings: newServings,
                })
              );
            }}
            onSliderBlur={async (newServings) => {
              if (newServings === startRecipe.servings) {
                return false;
              }
              if (recipeStatus === "imported") {
                setStartRecipe(recipe);
              } else if (recipeStatus === "saved") {
                const res = await updateRecipeById(recipe, id);
                if (!res.success) {
                  // Show error modal here
                  console.log(res.message);
                  setRecipe({ ...startRecipe });
                }
              }
            }}
          />
        }
        buttonsComponent={
          <>
            <Button
              text="Back"
              type="button"
              handleClick={() => navigate(-1)}
            />
            <OpenCalculatorButton
              recipeServingsCount={servings}
              recipeCaloriesCount={nutrients && nutrients.calories.quantity}
              recipeServingSize={servingSize}
              onSubmit={(val) => console.log(`${val}`)}
            />
            <Button text="Edit" type="button" handleClick={switchToForm} />
            {recipeStatus === "imported" && (
              <Button text="Save" type="button" handleClick={() => {}} />
            )}
          </>
        }
        ingredientsComponent={<IngredientsList ingredients={ingredients} />}
        instructionsComponent={
          <ol id="instructions-list">
            {instructions.map((el) => (
              <li key={el.id}>{el.text}</li>
            ))}
          </ol>
        }
        nutrientsComponent={
          nutrients && (
            <NutrientsList
              nutrients={nutrients}
              servingsCount={servings}
              servingSize={servingSize}
            />
          )
        }
      />
    </div>
  );
}

RecipeDisplay.propTypes = {
  startRecipe: PropTypes.instanceOf(Recipe).isRequired,
  switchToForm: PropTypes.func.isRequired,
  setStartRecipe: PropTypes.func.isRequired,
};
