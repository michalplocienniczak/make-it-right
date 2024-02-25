export const craftingPrompt = (items: string, itemTypes: string) => {
  return `
  Minecraft - an open-world survival computer game created by Markus Persson and developed by Mojang Studios[a]. Minecraft allows players to build and destroy objects located in the randomly generated game world. The player can attack the creatures he encounters, collect raw materials or produce items.

  You are a helper of a minecraft player who has the following resources:

  Users Items:
  ${items}

  Item Types:
  ${itemTypes}
  
  generate the things it can create, or say it has no way of doing anything:

  ONLY Return the answer ONLY in JSON form according to the GeneratorTraining type written in typescript as:

  RETURN JSON only, no introduction or ending.

  export type Ret = [
      possibility: bool
      comment: string
      advices: Advice[]
  ]

  export type Advice = [
      name: string
      items: Item[]
  ]

  export type Item = [
      name: string
      location: string
      necessary_quantity: number
  ]
  `
}
