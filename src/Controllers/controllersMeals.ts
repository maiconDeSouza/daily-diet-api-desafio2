import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import {
  prismaCreateMeals,
  prismaDeleteMeal,
  prismaGetAllMeals,
  prismaGetUniqueMeals,
  prismaUpdateMeals,
} from '../Model/modelMeals'
import { metricsMeals } from '../utils/metricsMeals'

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

  const schemaID = z.object({
    sub: z.string(),
  })
  await request.jwtVerify()

  const { sub } = schemaID.parse(request.user)

  const { mealId } = schemaParams.parse(request.params)
  const { name, description, isDietMeal } = schemaCreateMeals.parse(
    request.body,
  )

  const responseUpdateMeals = await prismaUpdateMeals(
    mealId,
    name,
    description,
    isDietMeal,
    sub,
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

async function getAllMeals(request: FastifyRequest, reply: FastifyReply) {
  const schemaID = z.object({
    sub: z.string(),
  })
  await request.jwtVerify()

  const { sub } = schemaID.parse(request.user)

  const responseGetAllMeals = await prismaGetAllMeals(sub)

  if (responseGetAllMeals) {
    reply.status(200).send({
      message: `Lista da lista das últimas refeições!`,
      meals: responseGetAllMeals,
    })
  } else {
    reply.status(500).send({
      message: `Ocorreu um erro inesperado!`,
    })
  }
}

async function getUniqueMeals(request: FastifyRequest, reply: FastifyReply) {
  const schemaID = z.object({
    sub: z.string(),
  })
  const schemaParams = z.object({
    mealId: z.string(),
  })

  await request.jwtVerify()
  const { mealId } = schemaParams.parse(request.params)
  const { sub } = schemaID.parse(request.user)

  const responseGetUniqueMeals = await prismaGetUniqueMeals(sub, mealId)

  if (responseGetUniqueMeals) {
    reply.status(200).send({
      message: `Refeição selecionada!`,
      meal: responseGetUniqueMeals,
    })
  } else {
    reply.status(500).send({
      message: `Ocorreu um erro inesperado!`,
    })
  }
}

async function deletarMeals(request: FastifyRequest, reply: FastifyReply) {
  const schemaID = z.object({
    sub: z.string(),
  })
  const schemaParams = z.object({
    mealId: z.string(),
  })

  await request.jwtVerify()
  const { mealId } = schemaParams.parse(request.params)
  const { sub } = schemaID.parse(request.user)

  const responseGetUniqueMeals = await prismaDeleteMeal(sub, mealId)

  if (responseGetUniqueMeals.count !== 0) {
    reply.status(200).send({
      message: `Refeição deletada`,
      meal: responseGetUniqueMeals,
    })
  } else {
    reply.status(400).send({
      message: `Refeição não encontrada`,
    })
  }
}

async function getMetrics(request: FastifyRequest, reply: FastifyReply) {
  const schemaID = z.object({
    sub: z.string(),
  })
  await request.jwtVerify()

  const { sub } = schemaID.parse(request.user)

  const responseGetAllMeals = await prismaGetAllMeals(sub)
  const responseMetrics = metricsMeals(responseGetAllMeals)

  reply.status(200).send({
    metricas: responseMetrics,
  })
}

export {
  createMeals,
  updateMeals,
  getAllMeals,
  getUniqueMeals,
  deletarMeals,
  getMetrics,
}
