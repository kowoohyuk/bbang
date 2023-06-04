import { ButterType, CodeValue, IngredientRecord, RecipeType } from "../types";

export const handleRecipe = ({
  type,
  code,
  value,
  isSalted,
}: { type: RecipeType } & CodeValue & ButterType) => {
  switch (type) {
    case "휘낭시에":
      return getFinancierRecipe({ code, value, isSalted });
    case "마들렌":
      return getMadeleineRecipe({ code, value });
  }
};

const getFinancierRecipe = ({
  code,
  value,
  isSalted,
}: CodeValue & ButterType) => {
  const baseButterValue = getFinancierBaseButterValue({ code, value });
  return roundToSingleDigit({
    버터: baseButterValue,
    흰자: baseButterValue * 0.7857142857,
    설탕: baseButterValue * 0.7142857143,
    꿀: baseButterValue * 0.08630952381,
    아몬드파우더: baseButterValue * 0.327380952380952,
    강력분: baseButterValue * 0.1547619048,
    박력분: baseButterValue * 0.1547619048,
    소금: isSalted ? 0 : baseButterValue * 0.007142857143,
  });
};

const getMadeleineRecipe = ({ code, value }: CodeValue) => {
  const baseButterValue = getMadeleineBaseButterValue({ code, value });
  return roundToSingleDigit({
    버터: baseButterValue,
    달걀: baseButterValue,
    설탕: baseButterValue,
    박력분: baseButterValue,
    베이킹파우더: baseButterValue * 0.02857142857,
    우유: baseButterValue * 0.2142857143,
  });
};

const getFinancierBaseButterValue = ({ code, value }: CodeValue) => {
  switch (code) {
    case "흰자":
      return value / 0.7857142857;
    case "설탕":
      return value / 0.7142857143;
    case "꿀":
      return value / 0.08630952381;
    case "소금":
      return value / 0.007142857143;
    case "아몬드파우더":
      return value / 0.327380952380952;
    case "강력분":
      return value / 0.1547619048;
    case "박력분":
      return value / 0.1547619048;
    default:
      return value;
  }
};

const getMadeleineBaseButterValue = ({ code, value }: CodeValue) => {
  switch (code) {
    case "달걀":
      return value;
    case "설탕":
      return value;
    case "박력분":
      return value;
    case "베이킹파우더":
      return value / 0.02857142857;
    case "우유":
      return value / 0.2142857143;
    default:
      return value;
  }
};

const roundToSingleDigit = (item: IngredientRecord) => {
  return Object.entries(item).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: Number(value.toFixed(1)),
    };
  }, {} as IngredientRecord);
};
