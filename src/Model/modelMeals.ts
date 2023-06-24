import { prismaClient } from '../../prisma/prismaClient'

async function prismaCreateMeals(
  name: string,
  description: string,
  isDietMeal: boolean,
  usersId: string,
) {
  const responseDB = await prismaClient.meals.create({
    data: {
      name,
      description,
      isDietMeal,
      usersId,
    },
  })
  return responseDB
}

async function prismaUpdateMeals(
  mealId: string,
  name: string,
  description: string,
  isDietMeal: boolean,
  usersId: string,
) {
  const meal = await prismaClient.meals.findFirst({
    where: {
      AND: [{ id: mealId }, { usersId }],
    },
  })
  const responseDB = await prismaClient.meals.updateMany({
    where: {
      AND: [{ id: mealId }, { usersId }],
    },
    data: {
      name: name || meal?.name,
      description: description || meal?.description,
      isDietMeal: isDietMeal || meal?.isDietMeal,
    },
  })

  return responseDB
}

async function prismaGetAllMeals(usersId: string) {
  const responseDB = await prismaClient.meals.findMany({
    where: {
      usersId,
    },
  })

  return responseDB
}

async function prismaGetUniqueMeals(usersId: string, mealsID: string) {
  const responseDB = await prismaClient.meals.findMany({
    where: {
      AND: [{ usersId }, { id: mealsID }],
    },
  })

  return responseDB
}

async function prismaDeleteMeal(usersId: string, mealsID: string) {
  const responseDB = await prismaClient.meals.deleteMany({
    where: {
      AND: [{ usersId }, { id: mealsID }],
    },
  })

  return responseDB
}

export {
  prismaCreateMeals,
  prismaUpdateMeals,
  prismaGetAllMeals,
  prismaGetUniqueMeals,
  prismaDeleteMeal,
}
