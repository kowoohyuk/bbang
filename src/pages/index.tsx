import { Input, Radio } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CodeValue, IngredientRecord, Ingredients, RecipeType } from "../types";
import { handleRecipe } from "../utils/recipe";

const TYPES: RecipeType[] = ["휘낭시에", "마들렌"];

const INITIAL_BUTTER_VALUE: {
  [key in RecipeType]: number;
} = {
  휘낭시에: 336,
  마들렌: 140,
};

const INITIAL_RECIPE = {
  type: TYPES[0],
  code: "버터",
  value: INITIAL_BUTTER_VALUE[TYPES[0]],
} as const;

export default function RecipeContainer() {
  const [selectedType, setSelectedType] = useState<RecipeType>(
    INITIAL_RECIPE.type
  );
  const [selectedTypeRecipes, setSelectedTypeRecipes] =
    useState<IngredientRecord>(handleRecipe(INITIAL_RECIPE));
  const [lastUserInputCodeValue, setLastUserInputCodeValue] =
    useState<CodeValue>({
      code: INITIAL_RECIPE.code,
      value: INITIAL_RECIPE.value,
    });

  useEffect(() => {
    setSelectedTypeRecipes(
      handleRecipe({
        type: selectedType,
        code: "버터",
        value: INITIAL_BUTTER_VALUE[selectedType],
      })
    );
  }, [selectedType]);

  useEffect(() => {
    setSelectedTypeRecipes(
      handleRecipe({ type: selectedType, ...lastUserInputCodeValue })
    );
  }, [lastUserInputCodeValue]);

  return (
    <main>
      <form className="bg-white m-auto mt-2 py-4 flex flex-col w-72 ">
        <div className="m-auto max-w-screen-lg sm:w-64 flex justify-center gap-2">
          {TYPES.map((type) => (
            <Radio
              key={type}
              id={type}
              name="type"
              label={type}
              checked={type === selectedType}
              onChange={() => setSelectedType(type)}
            />
          ))}
        </div>
        <div className="m-auto mt-4 max-w-screen-lg sm:w-48 flex flex-col gap-4">
          {(Object.keys(selectedTypeRecipes) as Ingredients[]).map((recipe) => (
            <Input
              key={recipe}
              type="number"
              label={recipe}
              value={selectedTypeRecipes[recipe]}
              onChange={(e) => {
                const { value } = e.target;
                setLastUserInputCodeValue({
                  code: recipe,
                  value: Number(value),
                });
              }}
            />
          ))}
        </div>
      </form>
    </main>
  );
}
