import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prismaCreateMeals, prismaUpdateMeals } from '../Model/modelMeals'

async function createMeals(request: FastifyRequest, reply: FastifyReply) {
  const schemaCreateMeals = z.object({
    name: z.string(),
    description: z.string(),
    isDietMeal: z.boolean(),
  })

  const schemaID = z.object({
    sub: z.string(),
  })
  await request.jwtVerify()

  const { sub } = schemaID.parse(request.user)
  const { name, description, isDietMeal } = schemaCreateMeals.parse(
    request.body,
  )

  const responseCreateMeals = await prismaCreateMeals(
    name,
    description,
    isDietMeal,
    sub,
  )

  if (responseCreateMeals) {
    return reply.status(201).send({
      message: `Refeição criada com sucesso!`,
    })
  } else {
    reply.status(500).send({
      message: `Ocorreu um erro inesperado!`,
    })
  }
}

async function updateMeals(request: FastifyRequest, reply: FastifyReply) {
  const schemaCreateMeals = z.object({
    name: z.string(),
    description: z.string(),
    isDietMeal: z.boolean(),
  })

  const schemaParams = z.object({
    mealId: z.string(),
  })
  await request.jwtVerify()

  const { mealId } = schemaParams.parse(request.params)
  const { name, description, isDietMeal } = schemaCreateMeals.parse(
    request.body,
  )

  const responseUpdateMeals = await prismaUpdateMeals(
    mealId,
    name,
    description,
    isDietMeal,
  )

  if (responseUpdateMeals) {
    return reply.status(200).send({
      message: `Refeição atualizada!`,
    })
  } else {
    reply.status(500).send({
      message: `Ocorreu um erro inesperado!`,
    })
  }
}

export { createMeals, updateMeals }
