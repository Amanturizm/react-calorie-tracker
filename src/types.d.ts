interface IMealInfo {
  id: string;
  mealtime: string;
  meal: string;
  kcal: number;
}

interface IApiMealInfo {
  [id: string]: IMealInfo;
}