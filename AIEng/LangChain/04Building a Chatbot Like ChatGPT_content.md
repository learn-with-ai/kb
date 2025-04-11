---
sidebar_position: 1
tags: ["Retrieval-Augmented Generation (RAG)", "Vector Embeddings", "LangChain", "Chatbot Implementation", "Semantic Search", "Vector Indexing", "Vector Libraries", "Vector Databases", "Document Loaders", "Retrievers", "Vector Storage", "ConversationBufferMemory", "ConversationKGMemory", "CombinedMemory", "Moderation", "Guardrails"]
title: "04Building a Chatbot Like ChatGPT"
---

## summary

- LLM-powered chatbots excel in conversational tasks but face limitations in domain-specific question answering due to lack of world knowledge and occasional errors.
- Retrieval-Augmented Generation (RAG) enhances chatbots by grounding responses in external evidence sources, improving accuracy and informativeness.
- The chapter covers representing documents as vectors, indexing methods for similarity lookups, and using vector databases like Milvus and Pinecone for managing embeddings.
- Memory in LangChain is crucial for managing conversation history, tracking entities, and summarizing conversations, enabling context-aware conversational agents.
- Moderation is discussed from a reputational and legal perspective, with LangChain allowing text to be checked for harmful content.
- Chatbots mimic human conversation, with modern versions leveraging advanced AI like LLMs, though achieving truly human-like interaction remains challenging.
- Use cases for chatbots span customer service, appointment scheduling, information retrieval, virtual assistants, language learning, mental health support, education, HR, entertainment, law, and medicine.
- Proactive chatbots anticipate user needs based on prior interactions, aiming for more natural human-AI interaction, though mastering context and reasoning is still a challenge.
- RAG combines LLMs with external knowledge sources, improving accuracy by grounding responses in real-world data through semantic search and vector embeddings.
- Vector embeddings represent content numerically, enabling machines to process and understand semantic similarities between concepts.
- LangChain provides a standard interface for working with text embedding models, supporting various providers like OpenAI, Cohere, and Hugging Face.
- Vector storage and indexing are essential for efficient similarity searches, with vector databases like Milvus and Pinecone offering advantages over standalone solutions.
- The chapter includes practical examples of obtaining embeddings and performing semantic search, highlighting the importance of vector arithmetic and distance metrics.
- Interesting insights include the ability of embeddings to perform tasks like sentiment classification and the dynamic nature of RAG in improving LLM responses.
- Practical steps involve setting up embeddings with different models and providers, and understanding the fundamentals of vector indexing and storage for RAG applications.
- Real-world applications of RAG and vector embeddings include improving chatbot responses in healthcare by retrieving relevant medical information.
- Additional key insights cover the evolution of chatbot technology and the balance between proactive dialog and responsiveness to user intent.
- The final takeaway emphasizes the importance of grounding LLMs with external data through RAG for more accurate and contextually relevant responses.
- Important images include a 3D scatter plot visualizing word embeddings and a confusion matrix for different categories, illustrating semantic relationships and classification performance.
- Vector indexing organizes vectors to optimize retrieval, with algorithms like k-d trees, Annoy, and Faiss for efficient similarity searches.
- Product quantization (PQ) and Locality Sensitive Hashing (LSH) are techniques for reducing dimensionality and enabling fast search, with trade-offs in accuracy.
- Hierarchical Navigable Small World (HNSW) is a graph-based indexing algorithm known for high search accuracy and scalability.
- Vector libraries like Faiss and Annoy provide functionality for working with vector data, offering efficient similarity search capabilities.
- Vector databases are designed for handling vector embeddings, offering features like data management, metadata storage, and scalability.
- Applications of vector databases include anomaly detection, personalization, and NLP tasks, leveraging their efficiency in high-dimensional spaces.
- Popular vector databases include Chroma, Qdrant, Milvus, Weaviate, Pinecone, Vespa, and Marqo, each with unique features and business models.
- LangChain's vectorstores module facilitates the implementation of vector storage, with examples using Chroma for storing and querying vectors.
- The process of building a chatbot with RAG involves loading documents, transforming them, embedding into vector stores, and querying for similar vectors.
- LangChain simplifies document loading from various sources and formats, integrating with vector stores and retrievers for efficient RAG systems.
- Important images include a star history graph for open-source vector libraries and databases, and a diagram illustrating the data connection process for chatbots.
- Document loaders in LangChain are used to load data from various sources as Document objects, which include text and associated metadata, supporting formats like .txt files, web pages, arXiv articles, and YouTube transcripts.
- LangChain's TextLoader simplifies loading text data from files, while other loaders like WikipediaLoader and ArxivLoader provide specialized functionalities for loading documents from Wikipedia and arXiv, respectively.
- Retrievers in LangChain fetch documents based on user queries, supporting various search methods including web indexes, databases, and specialized knowledge graphs, with examples like the kNN retriever and PubMed retriever.
- Custom retrievers can be implemented in LangChain by inheriting from the BaseRetriever abstract class and implementing the get_relevant_documents method to perform custom retrieval operations.
- Implementing a chatbot with a retriever involves setting up a document loader, storing documents in a vector store, and configuring a chatbot with retrieval capabilities, with Streamlit providing a web interface for interaction.
- Vector storage in LangChain involves document loading, splitting, embedding, and storing embeddings in a vector database for efficient search, with techniques like similarity search and maximal marginal relevance (MMR) for retrieving relevant documents.
- Contextual Compression enhances retrieval by extracting only relevant information from retrieved documents, using methods like LLMChainExtractor, LLMChainFilter, and EmbeddingsFilter to refine results and improve response quality.
- The configure_chain function in LangChain sets up a conversational retrieval chain with memory for tracking conversation history, using a language model like ChatOpenAI for generating responses.
- Streamlit is used to create a visual interface for the chatbot, allowing users to upload documents and ask questions, with the full implementation available on GitHub for further exploration.
- Memory in LangChain is crucial for maintaining context and continuity in conversations, with various memory mechanisms like ConversationBufferMemory and ConversationSummaryMemory serving different use cases.
- Important images include a screenshot of the chatbot interface for uploading documents and a diagram illustrating the process of building a chatbot with retrieval capabilities.
- LangChain provides various memory mechanisms like ConversationBufferMemory, ConversationKGMemory, and CombinedMemory to manage conversation history, track entities, and summarize conversations, enabling the development of context-aware conversational agents.
- ConversationBufferMemory stores messages in a buffer, allowing for a simple record of past interactions, while ConversationBufferWindowMemory maintains a fixed-sized window of recent interactions for efficiency.
- ConversationSummaryMemory is designed for longer conversations, summarizing the conversation over time to maintain token efficiency and context.
- ConversationKGMemory utilizes a knowledge graph to structure memory, representing entities as nodes and relationships as edges, enabling semantic reasoning and context-aware responses.
- CombinedMemory allows for the integration of different memory types, leveraging their strengths for optimal performance in managing conversation history and context.
- Long-term persistence in chatbots can be achieved through dedicated backends like Zep, which stores, summarizes, and searches chat histories using vector embeddings for enhanced context awareness.
- Moderation is crucial in chatbot development for filtering inappropriate content, maintaining brand reputation, preventing abuse, and ensuring legal compliance, with tools like OpenAIModerationChain facilitating this process.
- Guardrails in LLMs provide programmable constraints to control topics, define dialogue paths, specify language style, and extract structured data, ensuring outputs align with desired criteria for safety and trustworthiness.
- The chapter concludes with a summary of retrieval mechanisms, memory options, and moderation practices, emphasizing their importance in developing accurate, context-aware, and respectful chatbots.
- Important questions for review include understanding different chatbots, aspects of chatbot development, RAG, embeddings, vector search, vector databases, retrievers in LangChain, memory options, and moderation practices.

## code snippets
```
from langchain_openai import OpenAIEmbeddings
embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
text = "This is a sample query."
query_result = embeddings.embed_query(text)
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
model_name = "BAAI/bge-small-en"
model_kwargs = {"device": "cpu"}
encode_kwargs = {"normalize_embeddings": True}
hf = HuggingFaceBgeEmbeddings(
    model_name=model_name, model_kwargs=model_kwargs, encode_kwargs=encode_kwargs
)
words = ["cat", "dog", "computer", "animal"]
doc_vectors = hf.embed_documents(words)
from scipy.spatial.distance import pdist, squareform
import numpy as np
import pandas as pd
X = np.array(doc_vectors)
dists = squareform(pdist(X))
import pandas as pd
df = pd.DataFrame(
    data=dists,
    index=words,
    columns=words
)
df.style.background_gradient(cmap='coolwarm')
from langchain_community.document_loaders import WebBaseLoader
loader = WebBaseLoader("https://www.amazon.com/Generative-AI-LangChain-language-
docs = loader.load()
from langchain_text_splitters import CharacterTextSplitter
splitter = CharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=0,
    separator="\nReport"
)
split_docs = splitter.split_documents(docs)
from langchain_community.vectorstores.chroma import Chroma
from langchain_cohere import CohereEmbeddings
vectorstore = Chroma.from_documents(documents=split_docs, embedding=CohereEmbedd
similar_vectors = vectorstore.similarity_search(query="This is a fantastic book!", 
Showing 0 comments
There was a problem loading comments right now. Please try again later.MZ5.0 out of
Great Book!
Reviewed in the United States on January 1, 2024Verified Purchase
This book has substance and interesting material, best book so far in the market co
2 people found this helpful
              Helpful
from langchain_community.document_loaders.text import TextLoader
loader = TextLoader(file_path="path/to/file.txt")
documents = loader.load()
from langchain_community.document_loaders.wikipedia import WikipediaLoader
loader = WikipediaLoader("LangChain")
documents = loader.load()
print(documents[0].page_content[:102])
from langchain_core.output_parsers import StrOutputParser
from langchain_anthropic import ChatAnthropic
from langchain import hub
from langchain_community.document_loaders import ArxivLoader
docs = ArxivLoader(query="2201.11903", load_max_docs=2).load()
from langchain_community.retrievers import KNNRetriever
from langchain_openai import OpenAIEmbeddings
words = ["cat", "dog", "computer", "animal"]
retriever = KNNRetriever.from_texts(words, OpenAIEmbeddings())
result = retriever.get_relevant_documents("dog")
print(result)
from langchain_community.retrievers.pubmed import PubMedRetriever
retriever = PubMedRetriever() 
documents = retriever.get_relevant_documents("COVID")
for document in documents:
    print(document.metadata["Title"])
from langchain_core.documents import Document
from langchain_core.retrievers import BaseRetriever
class MyRetriever(BaseRetriever):
    def get_relevant_documents(self, query: str, **kwargs) -> list[Document]:
        relevant_documents = []
        return relevant_documents
from langchain_community.vectorstores.docarray import DocArrayInMemorySearch
from langchain_community.embeddings.huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.retrievers import BaseRetriever
def configure_retriever(docs: list[Document]) -> BaseRetriever:
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vectordb = DocArrayInMemorySearch.from_documents(splits, embeddings)
    retriever = vectordb.as_retriever(search_type="mmr", search_kwargs={"k": 2, "fetch_k": 4})
    return retriever
from langchain.retrievers.document_compressors import EmbeddingsFilter
from langchain.retrievers import ContextualCompressionRetriever
def configure_retriever(docs: list[Document], use_compression: bool = True) -> BaseRetriever:
    if not use_compression:
        return retriever
    embeddings_filter = EmbeddingsFilter(
        embeddings=embeddings, similarity_threshold=0.76
    )
    return ContextualCompressionRetriever(
        base_compressor=embeddings_filter,
        base_retriever=retriever
    )
from langchain.chains.conversational_retrieval.base import ConversationalRetrievalChain
from langchain_openai import ChatOpenAI
from langchain.chains.base import Chain
from langchain.memory import ConversationBufferMemory
def configure_chain(retriever: BaseRetriever) -> Chain:
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    llm = ChatOpenAI(
        model_name="gpt-3.5-turbo", temperature=0, streaming=True
    )
    return ConversationalRetrievalChain.from_llm(
        llm, retriever=retriever, memory=memory, verbose=True, max_tokens_limit=4000
    )
import os
import tempfile
def configure_qa_chain(uploaded_files):
    docs = []
    temp_dir = tempfile.TemporaryDirectory()
    for file in uploaded_files:
        temp_filepath = os.path.join(temp_dir.name, file.name)
        with open(temp_filepath, "wb") as f:
            f.write(file.getvalue())
        docs.extend(load_document(temp_filepath))
    retriever = configure_retriever(docs=docs)
    return configure_chain(retriever=retriever)
import streamlit as st
from streamlit.external.langchain import StreamlitCallbackHandler
st.set_page_config(page_title="LangChain: Chat with Documents", page_icon="")
st.title(" LangChain: Chat with Documents")
uploaded_files = st.sidebar.file_uploader(
    label="Upload files",
    type=list(DocumentLoader.supported_extentions.keys()),
    accept_multiple_files=True
)
if not uploaded_files:
    st.info("Please upload documents to continue.")
    st.stop()
qa_chain = configure_qa_chain(uploaded_files)
assistant = st.chat_message("assistant")
user_query = st.chat_input(placeholder="Ask me anything!")
if user_query:
    stream_handler = StreamlitCallbackHandler(assistant)
    response = qa_chain.run(user_query, callbacks=[stream_handler])
    st.markdown(response)
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain_openai import ChatOpenAI
llm = ChatOpenAI()
memory = ConversationBufferMemory()
chain = ConversationChain(llm=llm, memory=memory)
from langchain.memory import ConversationBufferWindowMemory
memory = ConversationBufferWindowMemory(k=1)
memory.save_context({"input": "hi"}, {"output": "whats up"})
from langchain.memory import ConversationSummaryMemory
from langchain_openai import OpenAI
llm = OpenAI(temperature=0)
memory = ConversationSummaryMemory(llm=llm)
memory.save_context({"input": "hi"}, {"output": "whats up"})
from langchain.memory import ConversationKGMemory
from langchain_openai import OpenAI
llm = OpenAI(temperature=0)
memory = ConversationKGMemory(llm=llm)
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationChain
from langchain.memory import (ConversationBufferMemory, CombinedMemory, ConversationSummaryMemory)
llm = OpenAI(temperature=0)
conv_memory = ConversationBufferMemory(memory_key="chat_history_lines", input_key="input")
summary_memory = ConversationSummaryMemory(llm=llm, input_key="input")
memory = CombinedMemory(memories=[conv_memory, summary_memory])
```
