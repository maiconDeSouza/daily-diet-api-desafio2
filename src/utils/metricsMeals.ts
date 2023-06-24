interface IMeal {
  id: string
  name: string
  description: string
  datetime: Date
  isDietMeal: boolean
  usersId: string | null
}

export function metricsMeals(meals: IMeal[]) {
  const totalDeRefeicoes = meals.length

  const totalDeRefeicoesSaudaveis: number = meals.reduce(
    (acc: number, item: IMeal) => {
      if (item.isDietMeal) {
        acc++
      }
      return acc
    },
    0,
  )

  const totalDeRefeicoesNaoSaudaveis = meals.reduce((acc, item) => {
    if (!item.isDietMeal) {
      acc++
    }
    return acc
  }, 0)

  let total = 0
  meals.reduce((acc, item) => {
    if (item.isDietMeal) {
      acc++
      if (acc > total) {
        total = acc
      }
    } else {
      acc = 0
    }
    return acc
  }, 0)

  return {
    totalDeRefeicoes,
    totalDeRefeicoesSaudaveis,
    totalDeRefeicoesNaoSaudaveis,
    total,
  }
}
