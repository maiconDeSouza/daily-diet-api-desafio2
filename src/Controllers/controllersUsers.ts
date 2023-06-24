import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { cryptoPass } from '../utils/cryptoPass'
import {
  prismCheckNickname,
  prismaCheckEmail,
  prismaCreateUsers,
} from '../Model/modelUsers'

async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserSchema = z.object({
    name: z.string(),
    nickname: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
    rPassword: z.string().min(5),
  })

  const result = createUserSchema.safeParse(request.body)

  if (!result.success) {
    return reply.status(409).send(result.error)
  }

  const { name, nickname, email, password, rPassword } = createUserSchema.parse(
    request.body,
  )

  if (password !== rPassword) {
    return reply.status(400).send({
      message: `As senhas não coincidem`,
    })
  }
  const cryptoPassword = await cryptoPass(password)
  const responseNickname = await prismCheckNickname(nickname)
  const responseEmail = await prismaCheckEmail(email)

  if (responseNickname || responseEmail) {
    return reply.status(409).send({
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
    return reply.status(201).send({
      message: `Usuário Criado com sucess!`,
    })
  } else {
    reply.status(500).send({
      message: `Ocorreu um erro inesperado!`,
    })
  }
}

async function loginUser(request: FastifyRequest, reply: FastifyReply) {
  const schemaLogin = z.object({
    nickname: z.string(),
    password: z.string(),
  })

  const { nickname, password } = schemaLogin.parse(request.body)

  const responseNickname = await prismCheckNickname(nickname)

  if (!responseNickname) {
    return reply.status(400).send({
      message: `Nickname ou Senha errados!`,
    })
  }

  if (responseNickname.password !== (await cryptoPass(password))) {
    return reply.status(400).send({
      message: `Nickname ou Senha errados!`,
    })
  }

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: responseNickname.id,
      },
    },
  )

  reply.status(200).send({
    message: `Login feito com sucesso!`,
    token,
  })
}

export { createUser, loginUser }
