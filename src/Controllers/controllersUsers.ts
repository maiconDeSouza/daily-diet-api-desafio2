import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prismaClient } from '../../prisma/prismaClient'
import { cryptoPass } from '../utils/cryptoPass'

async function createUser(request: FastifyRequest, replay: FastifyReply) {
  const createUserSchema = z.object({
    name: z.string(),
    nickname: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
  })

  try {
    const { name, nickname, email, password } = createUserSchema.parse(
      request.body,
    )
    await prismaClient.users.create({
      data: {
        name,
        nickname,
        email,
        password: await cryptoPass(password),
      },
    })
    replay.status(201).send({
      message: `User Created Successfully`,
    })
  } catch (error: any) {
    replay.status(error.number).send({
      name: error.name,
      message: error.message,
      description: error.description,
    })
  }
}

export { createUser }
