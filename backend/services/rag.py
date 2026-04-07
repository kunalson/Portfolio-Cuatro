import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

# print("CURRENT FILE:", __file__)
# print("CURRENT DIR:", os.path.dirname(__file__))

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# file_path = os.path.join(BASE_DIR, "../../data/portfolio.txt")

# print("FINAL PATH:", file_path)
# print("EXISTS:", os.path.exists(file_path))

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# go up 2 levels safely
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", ".."))

file_path = os.path.join(PROJECT_ROOT, "data", "portfolio.txt")

print("USING FILE:", file_path)



def load_vector_db():
    loader = TextLoader(file_path)
    documents = loader.load()

    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = splitter.split_documents(documents)

    embeddings = HuggingFaceEmbeddings()

    db = FAISS.from_documents(docs, embeddings)
    return db

db = load_vector_db()

def get_context(query: str):
    docs = db.similarity_search(query, k=2)
    return "\n".join([doc.page_content for doc in docs])