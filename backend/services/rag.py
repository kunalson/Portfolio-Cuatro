import os
from dotenv import load_dotenv
from pydantic import SecretStr
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEndpointEmbeddings

# Load .env before anything else
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", ".."))
file_path = os.path.join(PROJECT_ROOT, "data", "portfolio.txt")

def load_vector_db():
    loader = TextLoader(file_path)
    documents = loader.load()

    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = splitter.split_documents(documents)

    hf_key = os.getenv("HF_API_KEY")
    if not hf_key:
        raise ValueError("HF_API_KEY not found in environment")

    embeddings = HuggingFaceEndpointEmbeddings(
        model="sentence-transformers/all-MiniLM-L6-v2",
        huggingfacehub_api_token=hf_key,
    )

    db = FAISS.from_documents(docs, embeddings)
    return db

db = load_vector_db()

def get_context(query: str):
    docs = db.similarity_search(query, k=2)
    return "\n".join([doc.page_content for doc in docs])