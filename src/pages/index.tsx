import { Checkbox, Input, Radio } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
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
  const [isSalted, setIsSalted] = useState(false);
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

  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSelectedTypeRecipes(
      handleRecipe({
        type: selectedType,
        code: "버터",
        value: INITIAL_BUTTER_VALUE[selectedType],
        isSalted,
      })
    );
  }, [selectedType]);

  useEffect(() => {
    setSelectedTypeRecipes(
      handleRecipe({ type: selectedType, ...lastUserInputCodeValue, isSalted })
    );
  }, [isSalted]);

  useEffect(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => {
      setSelectedTypeRecipes(
        handleRecipe({
          type: selectedType,
          ...lastUserInputCodeValue,
          isSalted,
        })
      );
    }, 1000);
  }, [lastUserInputCodeValue]);

  return (
    <main>
      <form className="bg-white m-auto mt-2 py-4 flex flex-col w-72 ">
        <div className="m-auto max-w-screen-lg sm:w-64 flex px-5 gap-2">
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
        {selectedType === "휘낭시에" ? (
          <div className="m-auto max-w-screen-lg sm:w-64 px-5">
            <Checkbox
              name="isSalted"
              label="가염버터 여부"
              checked={isSalted}
              onChange={() => setIsSalted(!isSalted)}
            />
          </div>
        ) : null}
        <div className="m-auto mt-4 max-w-screen-lg sm:w-64 flex flex-col gap-4 px-5">
          {(Object.keys(selectedTypeRecipes) as Ingredients[]).map((recipe) => (
            <Input
              key={recipe}
              type="number"
              label={recipe}
              value={
                lastUserInputCodeValue.code === recipe
                  ? lastUserInputCodeValue.value
                  : selectedTypeRecipes[recipe]
              }
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
