import models from "../models";

export function createProductQuery(kolonialId) {
  models.Product.create({ kolonialId: kolonialId });
}

export function createUserQuery() {
  models.User.create({ Id: null, kolonialUserId: null });
}

export function createWeekQuery() {
  models.Week.create({ weekId: null });
}

export function createMealQuery(type, portions, dayId) {
  models.Meal.create({ Id: null, type: type, portions: portions, day: dayId });
}

export function createDayQuery() {
  models.Day.create({ Id: null });
}