from ollama import chat, ChatResponse


def improveEmail(text: str) -> str:

    try: 
        response: ChatResponse = chat(model='gemma:2b', 
                                    messages=[
                                        {
                                            "role": "system",
                                            "content": "Your only focus is to rewrite emails. Do not answer other questions"
                                        },
                                        {'role': 'user', 
                                        'content': f"Make the following text into a professional email that is clear and concise: \n\n{text}"
                                        }])
        print(response.message.content)

        displayResponse = response['message']['content']
        return displayResponse

    except Exception as e:
        print(f"Error calling Ollama: {e}")
        return "Failure to connect to Ollama."