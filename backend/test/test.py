import os
import openai

openai.api_key = "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"

response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {
      "role": "system",
      "content": "you are korean\nyou are a kind friend\nDo not use honorifics and do not use profanity.\nTalk about things the other person likes."
    },
    {
      "role": "user",
      "content": "안녕"
    }
  ],
  temperature=1,
  max_tokens=256,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)

print(response)