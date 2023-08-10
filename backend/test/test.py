import os
import openai

openai.api_key = "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"
messages = [{
          "role": "system",
          "content": "you are korean\nyou are a kind friend\nDo not use honorifics and do not use profanity.\nTalk about things the other person likes."
        }]
while True:
    content = input("User: ")
    messages.append({"role":"user", "content":content})

    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=messages,
      temperature=1,
      max_tokens=256,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0
    )

    chat_response = response.choices[0].message.content
    print(f"chatGPT: {chat_response}")
    messages.append({"role":"assistant", "content": chat_response})
