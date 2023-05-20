export type RecipeType = "휘낭시에" | "마들렌";

// TODO: 코코아파우더
export type Ingredients =
  | "버터"
  | "달걀"
  | "흰자"
  | "설탕"
  | "꿀"
  | "아몬드파우더"
  | "강력분"
  | "박력분"
  | "소금"
  | "우유"
  | "베이킹파우더";

export type IngredientRecord = Partial<Record<Ingredients, number>>;

export type CodeValue = {
  code: Ingredients;
  value: number;
};
