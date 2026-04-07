# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# def home():
#   return{"message":"Background Running"}

import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
from fastapi.middleware.cors import CORSMiddleware
from services.rag import get_context


# Load env
load_dotenv(dotenv_path=".env")

# Init Groq
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-portfolio.vercel.app",
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Backend running 🚀"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        context = get_context(req.message)

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": f"""
                    You are Kunal's AI portfolio assistant.

                    You have access to this knowledge:
                    {context}

                    Rules:
                    - Answer like you are representing Kunal
                    - Be confident and concise
                    - Highlight real projects and impact
                    - If unsure, say "Based on available information..."

                    Speak professionally but naturally.
                    """
                },
                {
                    "role": "user",
                    "content": req.message
                }
            ]
        )

        return {
            "response": completion.choices[0].message.content
        }

    except Exception as e:
        return {"error": str(e)}