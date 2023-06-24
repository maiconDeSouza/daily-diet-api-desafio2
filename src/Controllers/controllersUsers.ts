import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { cryptoPass } from '../utils/cryptoPass'
import {
  prismCheckNickname,
  prismaCheckEmail,
  prismaCreateUsers,
} from '../Model/modelUsers'

async function createUser(request: FastifyRequest, replay: FastifyReply) {
  const createUserSchema = z.object({
    name: z.string(),
    nickname: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
    rPassword: z.string().min(5),
  })

  const result = createUserSchema.safeParse(request.body)

  if (!result.success) {
    return replay.status(409).send(result.error)
  }

  const { name, nickname, email, password, rPassword } = createUserSchema.parse(
    request.body,
  )

  if (password !== rPassword) {
    return replay.status(400).send({
      message: `As senhas não coincidem`,
    })
  }
  const cryptoPassword = await cryptoPass(password)
  const responseNickname = await prismCheckNickname(nickname)
  const responseEmail = await prismaCheckEmail(email)

  if (responseNickname || responseEmail) {
    return replay.status(409).send({
      message: `Nickname ou Email já em uso!`,
    })
  }

  const responseCreateUser = await prismaCreateUsers(
    name,
    nickname,
    email,
    cryptoPassword,
  )

  if (responseCreateUser) {
    return replay.status(201).send({
      message: `Usuário Criado com sucess!`,
    })
  } else {
    replay.status(500).send({
      message: `Ocorreu um erro inesperado!`,
    })
  }
}

export { createUser }
