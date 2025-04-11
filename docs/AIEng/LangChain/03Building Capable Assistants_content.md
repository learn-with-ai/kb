---
sidebar_position: 1
tags: ["LangChain", "LLMs", "Tools", "Agents", "Streamlit", "Agent Architectures", "Structured Data Extraction", "Pydantic", "Fact-Checking", "Output Parsing"]
title: "03Building Capable Assistants"
---

## summary

- The chapter focuses on enhancing LLMs' capabilities to become more intelligent, productive, and trustworthy assistants through the use of tools and agent architectures like plan-and-solve.
- Tools in LangChain allow for the integration of external data sources and services, enabling LLMs to perform tasks beyond their general training data, such as web searches, database queries, and automating email writing.
- The chapter outlines the implementation of applications that demonstrate tool use, information extraction from documents, mitigating hallucinations through fact-checking, and applying reasoning strategies.
- Key components of tools in LangChain include a unique name, the function to execute, a description for the LLM to choose the right tool, an optional args_schema for more information or validation, and a flag for direct result return.
- The chapter provides practical examples of tool usage, including the WikipediaQueryRun tool, and discusses methods for defining custom tools using decorators, subclassing BaseTool, and the StructuredTool dataclass.
- Error handling in LangChain tools is addressed, emphasizing the importance of managing exceptions to allow agent execution to continue.
- A practical implementation of a research assistant using LangChain is demonstrated, combining an LLM with tools like DuckDuckGoSearch, arXiv, and Wikipedia to gather and respond to user queries.
- The chapter also covers building a visual interface for the research assistant using Streamlit, highlighting alternatives like Gradio, Dash, and others for deploying interactive web applications.
- Deployment options for Streamlit applications are discussed, including local or server deployment, Streamlit Community Cloud, and Hugging Face Spaces.
- The image description highlights an interactive interface or chatbot demonstrating LangChain's capability in facilitating question answering, showcasing its utility in natural language understanding and AI-driven responses.
- The chapter explores strategies to enhance LLMs' capabilities through advanced reasoning and structured data extraction, focusing on the integration of tools and agent architectures.
- Streamlit apps are highlighted for their ability to quickly create intuitive graphical interfaces around chatbots, offering seamless integration and easy sharing options.
- The limitations of LLMs in complex, multi-step reasoning are discussed, with solutions proposed through hybrid systems combining neural pattern completion with symbolic manipulation.
- Two key agent architectures are introduced: action agents for iterative reasoning based on observations and plan-and-execute agents for upfront planning before action.
- The implementation of a plan-and-execute agent in a research app is detailed, showcasing structured problem-solving approaches.
- Structured data extraction from documents using LangChain and Pydantic is explained, emphasizing the importance of clear output format definitions for data consistency.
- A practical example of extracting information from a job candidate’s CV using Pydantic classes demonstrates the application of structured data extraction.
- The chapter concludes with insights into the potential of combining LLMs with schema definitions for data-driven applications and decision-making.
- Images in the chapter illustrate concepts like tool-augmented LLM paradigms and reasoning strategies, enhancing understanding of the discussed technologies.
- The chapter delves into enhancing LLMs' capabilities through structured data extraction and fact-checking to mitigate hallucinations, using LangChain for practical implementations.
- Structured data extraction from documents is demonstrated using PyPDFLoader and Pydantic models to parse CVs, showcasing the potential for automated data processing.
- LangChain's output parsers are highlighted for their ability to transform LLM outputs into structured formats like JSON, XML, and Pydantic models, facilitating data consistency.
- Automatic fact-checking is introduced as a method to verify LLM-generated claims against external sources, involving claim detection, evidence retrieval, and verdict prediction stages.
- The LLMCheckerChain is presented as a tool for self-checking assumptions and claims, illustrating a step towards reducing misinformation from LLMs.
- Streamlit is recommended for creating intuitive interfaces for LLM applications, emphasizing its ease of use and integration capabilities with LangChain workflows.
- Two agent paradigms, plan-and-solve and zero-shot, are discussed for their decision-making strategies in processing and responding to queries.
- The chapter concludes with a summary of the discussed topics and previews further exploration in subsequent chapters on reasoning with agents and prompting techniques.
- Images and diagrams throughout the chapter, such as the automatic fact-checking pipeline, enhance understanding of the processes and technologies discussed.

## code snippets
```
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain.tools import tool
from langchain.pydantic_v1 import BaseModel, Field
from langchain.tools import BaseTool
from langchain.callbacks.manager import (AsyncCallbackManagerForToolRun, CallbackManagerForToolRun)
from langchain.tools import StructuredTool
from langchain.agents import (AgentExecutor, load_tools, create_react_agent)
from langchain.chat_models import ChatOpenAI
import streamlit as st
from langchain_community.callbacks.streamlit import (StreamlitCallbackHandler)
from typing import Literal from langchain import hub
from langchain.agents import create_react_agent, AgentExecutor
from langchain.chains.base import Chain
from langchain_openai import ChatOpenAI
from langchain_experimental.plan_and_execute import (load_chat_planner, load_agent_executor, PlanAndExecute)
from chapter4.question_answering.tool_loader import load_tools
from typing import Optional
import pydantic
class Experience(pydantic.BaseModel):
class Study(Experience):
class WorkExperience(Experience):
class Resume(pydantic.BaseModel):
import os
from langchain_community.document_loaders.pdf import PyPDFLoader
from langchain.output_parsers import PydanticOutputParser
from langchain.output_parsers.json import SimpleJsonOutputParser
from langchain.prompts import PromptTemplate
import json
import re
from langchain_core.messages.ai import AIMessage
from langchain.chains import LLMCheckerChain
from langchain_openai import OpenAI
```
