import requests
import json

def main():
    
    url = "https://api.openai.com/v1/chat/completions"
    api_key = "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"
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

                {
                    "items": [
                        {
                            "name": "stone",
                            "quantity": 21,
                            "location": 3
                        },
                        {
                            "name": "stick",
                            "quantity": 37,
                            "location": 2
                        },
                        {
                            "name": "azalea",
                            "quantity": 37,
                            "location": 2
                        },
                        {
                            "name": "bamboo_block",
                            "quantity": 37,
                            "location": 2
                        },
                        {
                            "name": "melon",
                            "quantity": 37,
                            "location": 2
                        },
                        {
                            "name": "composter",
                            "quantity": 37,
                            "location": 2
                        },
                        {
                            "name": "oak_planks",
                            "quantity": 37,
                            "location": 2
                        }
                    ]
                }

                
                generate the things it can create, or say it has no way of doing anything:

                Return the answer ONLY in JSON form according to the GeneratorTraining type written in typescript as:

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
                    quantity: number
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
        print("Odpowiedź modelu:")
        print(result["choices"][0]["message"]["content"])
    else:
        print("Wystąpił błąd podczas zapytania:")
        print(response.text)

if __name__ == "__main__":
    main()