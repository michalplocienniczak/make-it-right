import requests
import json

def main():
    
    url = "https://api.openai.com/v1/chat/completions"
    api_key = ""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "gpt-4",
        "messages": [
            {
                "role": "user",
                "content": """

                Minecraft - an open-world survival computer game created by Markus Persson and developed by Mojang Studios[a]. Minecraft allows players to build and destroy objects located in the randomly generated game world. The player can attack the creatures he encounters, collect raw materials or produce items.

                You are a helper of a minecraft player who has the following resources:

                Users Items:
                [
                    {
                        "id": "65da9645b9104d15d4532d5c",
                        "locationId": "65da87d6117a3589e78cde6b",
                        "typeId": "65da70021529778b2da493cb",
                        "quantity": 15
                    },
                    {
                        "id": "65da9693b9104d15d4532d5d",
                        "locationId": "65da87d6117a3589e78cde6b",
                        "typeId": "65da73e687045bf9067087be",
                        "quantity": 136
                    },
                    {
                        "id": "65da98031789bc1a849d76c5",
                        "locationId": "65da87d6117a3589e78cde6b",
                        "typeId": "65da730e1529778b2da493d6",
                        "quantity": 5
                    }
                ]

                Item Types:
                [
                    {
                        "id": "65da6fec1529778b2da493ca",
                        "key": "acacia_log"
                    },
                    {
                        "id": "65da70021529778b2da493cb",
                        "key": "acacia_planks"
                    },
                    {
                        "id": "65da702a87045bf9067087b1",
                        "key": "apple"
                    },
                    {
                        "id": "65da70411529778b2da493cc",
                        "key": "azalea_leaves"
                    },
                    {
                        "id": "65da705287045bf9067087b2",
                        "key": "azalea"
                    },
                    {
                        "id": "65da706a1529778b2da493cd",
                        "key": "baked_potato"
                    },
                    {
                        "id": "65da707f87045bf9067087b3",
                        "key": "bamboo_block"
                    },
                    {
                        "id": "65da70911529778b2da493ce",
                        "key": "bamboo_chest_raft"
                    },
                    {
                        "id": "65da70b087045bf9067087b4",
                        "key": "bamboo_door"
                    },
                    {
                        "id": "65da70c687045bf9067087b5",
                        "key": "bamboo_fence_gate"
                    },
                    {
                        "id": "65da70db87045bf9067087b6",
                        "key": "bamboo_fence"
                    },
                    {
                        "id": "65da71f71529778b2da493cf",
                        "key": "bamboo_hanging_sign"
                    },
                    {
                        "id": "65da72071529778b2da493d0",
                        "key": "bamboo_mosaic_slab"
                    },
                    {
                        "id": "65da72371529778b2da493d1",
                        "key": "bamboo_mosaic_stairs"
                    },
                    {
                        "id": "65da724c1529778b2da493d2",
                        "key": "bamboo_mosaic"
                    },
                    {
                        "id": "65da72711529778b2da493d3",
                        "key": "bamboo_planks"
                    },
                    {
                        "id": "65da728e87045bf9067087b8",
                        "key": "bamboo_pressure_plate"
                    },
                    {
                        "id": "65da72ab87045bf9067087b9",
                        "key": "bamboo_raft"
                    },
                    {
                        "id": "65da72bd87045bf9067087ba",
                        "key": "bamboo_sign"
                    },
                    {
                        "id": "65da72d41529778b2da493d4",
                        "key": "bamboo_slab"
                    },
                    {
                        "id": "65da72e687045bf9067087bb",
                        "key": "bamboo_stairs"
                    },
                    {
                        "id": "65da72f71529778b2da493d5",
                        "key": "bamboo_trapdoor"
                    },
                    {
                        "id": "65da730e1529778b2da493d6",
                        "key": "bamboo"
                    },
                    {
                        "id": "65da73531529778b2da493d7",
                        "key": "beetroot_seeds"
                    },
                    {
                        "id": "65da736387045bf9067087bc",
                        "key": "beetroot_soup"
                    },
                    {
                        "id": "65da73701529778b2da493d8",
                        "key": "beetroot"
                    },
                    {
                        "id": "65da73851529778b2da493d9",
                        "key": "birch_log"
                    },
                    {
                        "id": "65da739787045bf9067087bd",
                        "key": "birch_planks"
                    },
                    {
                        "id": "65da73aa1529778b2da493da",
                        "key": "bread"
                    },
                    {
                        "id": "65da73b31529778b2da493db",
                        "key": "cake"
                    },
                    {
                        "id": "65da73e687045bf9067087be",
                        "key": "carrot"
                    },
                    {
                        "id": "65da73f81529778b2da493dc",
                        "key": "cobblestone"
                    },
                    {
                        "id": "65da741287045bf9067087bf",
                        "key": "cocoa_beans"
                    },
                    {
                        "id": "65da742387045bf9067087c0",
                        "key": "composter"
                    },
                    {
                        "id": "65da743e87045bf9067087c1",
                        "key": "cookie"
                    },
                    {
                        "id": "65da746087045bf9067087c2",
                        "key": "crimson_planks"
                    },
                    {
                        "id": "65da74711529778b2da493dd",
                        "key": "crimson_stem"
                    },
                    {
                        "id": "65da748487045bf9067087c3",
                        "key": "dark_oak_log"
                    },
                    {
                        "id": "65da74d287045bf9067087c4",
                        "key": "dark_oak_planks"
                    },
                    {
                        "id": "65da74e587045bf9067087c5",
                        "key": "diamond_hoe"
                    },
                    {
                        "id": "65da750987045bf9067087c6",
                        "key": "diamond"
                    },
                    {
                        "id": "65da75161529778b2da493de",
                        "key": "farmland"
                    },
                    {
                        "id": "65da752c87045bf9067087c7",
                        "key": "fishing_rod"
                    },
                    {
                        "id": "65da753f1529778b2da493df",
                        "key": "glistering_melon_slice"
                    },
                    {
                        "id": "65da754f1529778b2da493e0",
                        "key": "gold_ingot"
                    },
                    {
                        "id": "65da75601529778b2da493e1",
                        "key": "golden_hoe"
                    },
                    {
                        "id": "65da75711529778b2da493e2",
                        "key": "hay_block"
                    },
                    {
                        "id": "65da75851529778b2da493e3",
                        "key": "honey_bottle"
                    },
                    {
                        "id": "65da759a1529778b2da493e4",
                        "key": "iron_hoe"
                    },
                    {
                        "id": "65da75ad1529778b2da493e5",
                        "key": "iron_ingot"
                    },
                    {
                        "id": "65da75bf87045bf9067087c8",
                        "key": "jungle_log"
                    },
                    {
                        "id": "65da75d287045bf9067087c9",
                        "key": "jungle_planks"
                    },
                    {
                        "id": "65da75e587045bf9067087ca",
                        "key": "melon_seeds"
                    },
                    {
                        "id": "65da75f687045bf9067087cb",
                        "key": "melon_slice"
                    },
                    {
                        "id": "65da760b1529778b2da493e6",
                        "key": "melon"
                    },
                    {
                        "id": "65da761f87045bf9067087cc",
                        "key": "mushroom_stew"
                    },
                    {
                        "id": "65da76321529778b2da493e7",
                        "key": "netherite_hoe"
                    },
                    {
                        "id": "65da76421529778b2da493e8",
                        "key": "netherite_ingot"
                    },
                    {
                        "id": "65da765587045bf9067087cd",
                        "key": "oak_log"
                    },
                    {
                        "id": "65da766d1529778b2da493e9",
                        "key": "oak_planks"
                    },
                    {
                        "id": "65da767e1529778b2da493ea",
                        "key": "potato"
                    },
                    {
                        "id": "65da768d1529778b2da493eb",
                        "key": "pumpkin_pie"
                    },
                    {
                        "id": "65da769d87045bf9067087ce",
                        "key": "pumpkin_seeds"
                    },
                    {
                        "id": "65da76b587045bf9067087cf",
                        "key": "pumpkin"
                    },
                    {
                        "id": "65da76c687045bf9067087d0",
                        "key": "rabbit_stew"
                    },
                    {
                        "id": "65da76da1529778b2da493ec",
                        "key": "shears"
                    },
                    {
                        "id": "65da76e71529778b2da493ed",
                        "key": "spruce_log"
                    },
                    {
                        "id": "65da76f887045bf9067087d1",
                        "key": "spruce_planks"
                    },
                    {
                        "id": "65da770487045bf9067087d2",
                        "key": "stick"
                    },
                    {
                        "id": "65da771487045bf9067087d3",
                        "key": "stone_hoe"
                    },
                    {
                        "id": "65da77311529778b2da493ee",
                        "key": "stone"
                    },
                    {
                        "id": "65da773c1529778b2da493ef",
                        "key": "sugar"
                    },
                    {
                        "id": "65da774b1529778b2da493f0",
                        "key": "suspicious_stew"
                    },
                    {
                        "id": "65da77621529778b2da493f1",
                        "key": "sweet_berries"
                    },
                    {
                        "id": "65da77711529778b2da493f2",
                        "key": "warped_planks"
                    },
                    {
                        "id": "65da777f87045bf9067087d4",
                        "key": "warped_stem"
                    },
                    {
                        "id": "65da778e87045bf9067087d5",
                        "key": "wheat_seeds"
                    },
                    {
                        "id": "65da779b87045bf9067087d6",
                        "key": "wheat"
                    },
                    {
                        "id": "65da77ad1529778b2da493f3",
                        "key": "wooden_hoe"
                    }
                ]
                
                generate the things it can create, or say it has no way of doing anything:

                ONLY Return the answer ONLY in JSON form according to the GeneratorTraining type written in typescript as:

                RETURN JSON only, no introduction or ending.

                export type Ret = [
                    possibility: bool
                    advices: Advice[]
                ]

                export type Advice = [
                    name: string
                    items: Item[]
                ]

                export type Item = [
                    name: string
                    location: number
                    necessary_quantity: number
                ]
                """
            }
        ],
        "temperature": 0.7,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        result = response.json()
        print(result["choices"][0]["message"]["content"])
    else:
        print("Wystąpił błąd podczas zapytania:")
        print(response.text)

if __name__ == "__main__":
    main()