---
sidebar_position: 1
tags: ["LangChain", "Docker", "Conda", "pip", "Poetry", "LLMs", "Chat Models", "Prompt Templates", "Chains", "Local Models", "Customer Service", "Sentiment Analysis", "Map-Reduce", "Token Usage", "Summarization"]
title: "03Getting Started with LangChain"
---

## summary

- The chapter introduces the setup process for libraries needed to run practical examples in the book, covering dependency management tools like Docker, Conda, pip, and Poetry.
- It discusses cloud provider integrations for models such as Hugging Face, OpenAI, Google, and Anthropic, including initializing LLM and chat models, prompting them, and chaining them using LangChain Expression Language.
- A practical example of an LLM app for customer service agents is presented to illustrate real-world applications of LangChain.
- The chapter also covers map-reduce pipelines for document processing and the importance of monitoring token usage to manage costs.
- Instructions for setting up the environment using various tools are provided, including steps for pip, Poetry, Conda, and Docker.
- The chapter highlights the importance of API keys for accessing cloud model providers and suggests methods for securely managing these keys.
- OpenAI's API key setup process is detailed, including steps to create and manage API keys for accessing their models.
- Hugging Face's role in the NLP space and its integration with LangChain for both cloud and local model usage is discussed.
- The chapter concludes with a note on the dynamic nature of the field and the importance of keeping the GitHub repository up to date for the latest code and examples.
- Important images or descriptions mentioned in the book include a screenshot of the OpenAI API platform for creating a new secret key, emphasizing the importance of secure API key management.
- The chapter delves into advanced interactions with LangChain, covering the setup and use of various models including Hugging Face, Google's Gemini, and OpenAI's GPT-4.
- It introduces the concept of fake LLMs for testing purposes, allowing simulation of LLM responses without actual API calls.
- Chat models in LangChain are explored, highlighting their structured schema for managing dialogues and distinguishing between different types of interactions.
- Prompt templates are discussed as a way to define prompts with placeholders for user-defined information, enhancing the utility of LLMs.
- The chapter explains the concept of chains in LangChain, which orchestrate a sequence of operations such as input prompts, LLM invocations, and output transformations.
- LangChain Expression Language (LCEL) is introduced as a declarative way to compose chains, offering benefits like asynchronous processing and seamless integration with LangSmith tracing.
- Text-to-image generation capabilities are showcased, with examples using OpenAI’s Dall-E model and Replicate for creating images from textual descriptions.
- Practical applications of these technologies are highlighted, including generating art, aiding designers, and creating realistic scenarios for training AI systems.
- The chapter concludes with examples of image generation and understanding, illustrating the versatility and power of LangChain in handling various model use cases.
- Important images or descriptions mentioned in the book include a detailed illustration of a dark room setting, symbolizing the exploration and learning of Generative AI through LangChain.
- The chapter explores the use of local models with LangChain, highlighting the advantages of complete control and data privacy.
- It introduces GPT-4's capabilities in image understanding, including classifying images and generating descriptive text based on visual input.
- A detailed guide on running models locally using Hugging Face Transformers, llama.cpp, and GPT4All is provided, emphasizing the importance of hardware requirements.
- The chapter presents a prototype application for customer service, leveraging generative AI for sentiment classification, summarization, intent classification, and answer suggestions.
- Sentiment analysis using LLMs is discussed, with examples demonstrating how to classify customer emails based on their emotional tone.
- Text classification with Google Generative AI is showcased, illustrating how to categorize customer concerns efficiently.
- Document summarization techniques are explored, comparing traditional models with LLMs for generating concise summaries of lengthy texts.
- The map-reduce approach in LangChain is introduced for processing documents in stages, enabling efficient summarization of long documents like research papers.
- Practical examples and code snippets are provided throughout the chapter to facilitate hands-on learning and implementation.
- The chapter concludes with insights into the future of generative AI in customer service and document processing, suggesting further exploration and customization.
- Important images or diagrams mentioned include a workflow illustration for processing multiple documents using summarization techniques and a map-reduce chain in LangChain.
- The chapter discusses the importance of monitoring token usage when using commercial LLMs like GPT-3.5 and GPT-4 via APIs, highlighting strategies to reduce costs while maintaining productivity.
- It introduces methods to track token usage in OpenAI models, including using callbacks to get detailed information on token consumption and associated costs.
- The chapter revisits the setup and usage of LangChain, emphasizing the adaptability of its API for seamless transitions between different LLM providers.
- A prototype application for customer service is showcased, demonstrating the integration of multiple models for text categorization and sentiment analysis.
- The map-reduce approach in LangChain is detailed, illustrating its application in summarizing scientific articles and processing long documents efficiently.
- Practical tips for prompt engineering with LangChain are provided, focusing on optimizing summarization capabilities and managing document processing.
- The chapter concludes with a summary of key concepts and questions to reinforce learning, encouraging readers to explore further applications of LangChain in upcoming chapters.
- An invitation to join the community on Discord for discussions with the authors and other readers is extended, fostering a collaborative learning environment.
- Important insights include the balance between context limits and parallelism in document summarization and the significance of token awareness in cost-effective LLM usage.

## code snippets
```
pip install -r requirements.txt
conda env create --file langchain_ai.yaml
conda activate langchain_ai
docker build -t langchain_ai .
docker run -d -p 8888:8888 langchain_ai
import os
os.environ["OPENAI_API_KEY"] = "<your token>"
export OPENAI_API_KEY=<your token>
set OPENAI_API_KEY=<your token>
from config import set_environment
set_environment()
from langchain_openai import OpenAI
llm = OpenAI()
from langchain_anthropic import AnthropicLLM
llm = AnthropicLLM(model='claude-2.1')
from langchain.llms.fake import FakeListLLM
fake_llm = FakeListLLM(responses=["Hello"])
from langchain_openai.chat_models import ChatOpenAI
llm = ChatOpenAI(model_name='gpt-4-0613')
from langchain_core.prompts import PromptTemplate
prompt_template = PromptTemplate.from_template("Tell me a {adjective} joke about {content}")
from langchain import LLMChain
llm_chain = LLMChain(prompt=prompt, llm=llm, verbose=True)
from langchain_community.llms import HuggingFaceEndpoint
llm = HuggingFaceEndpoint(repo_id=repo_id, max_length=128, temperature=0.5)
from langchain.chains import LLMChain
chain = LLMChain(llm=llm, prompt=prompt)
from langchain_community.utilities.dalle_image_generator import DallEAPIWrapper
image_url = DallEAPIWrapper().run(chain.run("halloween night at a haunted museum"))
from langchain_community.llms import Replicate
text2image = Replicate(model="stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478", model_kwargs={"image_dimensions": "512x512"})
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
chat = ChatOpenAI(model="gpt-4-turbo", max_tokens=256)
from transformers import pipeline
generate_text = pipeline(task="text-generation", model="liminerity/Phigments12", trust_remote_code=True, torch_dtype="auto", device_map="auto", max_new_tokens=100)
from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline
hf = HuggingFacePipeline(pipeline=generate_text)
from langchain_community.llms import LlamaCpp
llm = LlamaCpp(model_path=os.path.expanduser("~/Downloads/Hermes-2-Pro-Mistral-7B.Q5_0.gguf"), verbose=True)
from langchain_community.llms import GPT4All
model = GPT4All(model="mistral-7b-openorca.Q4_0.gguf", n_ctx=512, n_threads=8)
from langchain_google_genai import GoogleGenerativeAI
llm = GoogleGenerativeAI(model="gemini-pro")
from langchain.chains.summarize import load_summarize_chain
from langchain_openai import OpenAI
from langchain_community.document_loaders import PyPDFLoader
pdf_loader = PyPDFLoader(pdf_file_path)
docs = pdf_loader.load_and_split()
llm = OpenAI()
chain = load_summarize_chain(llm, chain_type="map_reduce")
from langchain import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain_community.callbacks import get_openai_callback
llm_chain = PromptTemplate.from_template("Tell me a joke about {topic}!") | OpenAI()
with get_openai_callback() as cb:
    response = llm_chain.invoke(dict(topic="light bulbs"))
    print(response)
    print(f"Total Tokens: {cb.total_tokens}")
    print(f"Prompt Tokens: {cb.prompt_tokens}")
    print(f"Completion Tokens: {cb.completion_tokens}")
    print(f"Total Cost (USD): ${cb.total_cost}")
```
