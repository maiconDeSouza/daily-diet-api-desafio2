import { prismaClient } from '../../prisma/prismaClient'

async function prismCheckNickname(nickname: string) {
  const responseDB = await prismaClient.users.findFirst({
    where: {
      nickname,
    },
  })

  return responseDB
}

async function prismaCheckEmail(email: string) {
  const responseDB = await prismaClient.users.findFirst({
    where: {
      email,
    },
  })
  return responseDB
}

async function prismaCreateUsers(
  name: string,
  nickname: string,
  email: string,
  password: string,
) {
  const responseDB = await prismaClient.users.create({
    data: {
      name,
      nickname,
      email,
      password,
    },
  })
  return responseDB
}
export { prismCheckNickname, prismaCheckEmail, prismaCreateUsers }
