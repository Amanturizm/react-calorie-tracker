interface IMealInfo {
  id?: string;
  mealtime: string;
  meal: string;
  kcal: number | string;
}

interface IApiMealInfo {
  [id: string]: IMealInfo;
}