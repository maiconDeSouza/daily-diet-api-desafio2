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

export { prismaCreateMeals }
