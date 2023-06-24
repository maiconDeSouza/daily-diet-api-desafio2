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
) {
  const meal = await prismaClient.meals.findFirst({
    where: {
      id: mealId,
    },
  })
  const responseDB = await prismaClient.meals.update({
    where: {
      id: mealId,
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
  console.log(responseDB)
  return responseDB
}

export { prismaCreateMeals, prismaUpdateMeals, prismaGetAllMeals }
