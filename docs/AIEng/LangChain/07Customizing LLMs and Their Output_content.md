---
sidebar_position: 1
tags: ["Conditioning", "Fine-tuning", "Prompt Engineering", "Reinforcement Learning with Human Feedback (RLHF)", "Low-Rank Adaptation (LoRA)", "Hugging Face", "Weights and Biases", "LoRA", "Fine-Tuning", "Chain-of-Thought (CoT)", "Self-Consistency", "Tree-of-Thought (ToT)"]
title: "07Customizing LLMs and Their Output"
---

## summary

- This chapter explores techniques to enhance the reliability and performance of Large Language Models (LLMs) for specific tasks through conditioning, which includes fine-tuning and prompting.
- Fine-tuning adapts pre-trained models to specific tasks or datasets, improving accuracy and relevance, while prompting tailors outputs dynamically at inference time without retraining.
- Advanced prompt engineering strategies like few-shot learning, Tree-of-Thought (ToT), and self-consistency are discussed as methods to unlock LLM reasoning capabilities.
- The chapter highlights the importance of conditioning for task relevance, specificity, coherence, and aligning model outputs with ethical standards.
- Reinforcement Learning with Human Feedback (RLHF) is introduced as a transformative method for aligning LLMs with human preferences, enhancing accuracy and relevance.
- Low-Rank Adaptation (LoRA) and Quantization are presented as efficient methods for fine-tuning large models with reduced computational resources.
- Inference-time conditioning techniques, such as prompt tuning and prefix tuning, are discussed for scenarios where fine-tuning is not feasible.
- The chapter concludes with practical steps for fine-tuning a model for question answering, including setup instructions and required libraries.
- Important images include a screenshot illustrating the creation of access tokens for LangChain, emphasizing the customization of AI-generated models for specific tasks.
- The chapter details the process of fine-tuning LLMs for specific tasks, emphasizing the use of Hugging Face for model authentication and dataset selection.
- Weights and Biases (W&B) is introduced as a platform for monitoring and documenting ML training workflows, requiring API key authentication for use.
- The Squad V2 dataset is highlighted for fine-tuning LLMs for question-answering performance, with early stopping to optimize validation error.
- Open-source models like OpenLLaMa are recommended for local use, with instructions provided for loading and quantizing models to reduce computational resources.
- Training configurations for LoRA and other parameters are discussed, including the importance of setting up a tokenizer and defining training arguments for optimal performance.
- The chapter includes a practical guide on saving model checkpoints and sharing models on Hugging Face, with a note on the differences in loading PEFT models.
- Commercial models like OpenAI’s GPT-3.5 and Google’s PaLM are mentioned as options for fine-tuning, with examples provided for text classification tasks.
- Prompt engineering is explored as a method to steer LLM behavior without changing model weights, with emphasis on the components of effective prompts.
- Advanced prompting techniques such as Chain-of-Thought (CoT) and Self-Consistency are introduced for complex reasoning tasks, alongside best practices for prompt design.
- The chapter concludes with a comparison of prompting techniques versus fine-tuning, highlighting the performance considerations for each method.
- Important images include a graph showing training loss over time and illustrations of prompt examples for different LLM applications.
- The chapter explores advanced techniques for customizing LLMs, focusing on fine-tuning and prompt engineering to enhance model performance and reliability.
- Zero-shot prompting is introduced as a method to test LLMs' capabilities without examples, demonstrating its application in sentiment classification.
- Few-shot learning is discussed as a way to improve model inference with minimal examples, highlighting the use of SemanticSimilarityExampleSelector for dynamic example selection.
- Chain-of-Thought (CoT) prompting is detailed as a technique to encourage step-by-step reasoning in LLMs, with variants including zero-shot and few-shot CoT prompting.
- Self-consistency prompting is presented as a method to enhance answer reliability by generating multiple candidate answers and selecting the most frequent one.
- Tree-of-Thought (ToT) prompting is explained as a strategy for generating and critiquing multiple problem-solving approaches, with a practical implementation guide using LangChain.
- The chapter concludes with a summary of conditioning techniques, emphasizing the importance of fine-tuning and advanced prompting strategies for complex reasoning tasks.
- Practical implementation opportunities include fine-tuning a small open-source model for question answering and applying advanced prompting techniques like CoT and ToT.
- Code examples and repositories are referenced, including LangChain tools for implementing these techniques and a GitHub repository for the book's examples.
- The chapter also previews the next topic on the productionization of generative AI, including evaluation, deployment, and monitoring of LLM applications.
- Important images and diagrams include visualizations of training loss over time and illustrations of prompt examples for different LLM applications.

## code snippets
```
Code for this chapter can be found in the chapter8 directory of the book’s GitHub repository: https://github.com/benman1/generative_ai_with_langchain
Setup instructions refer to Chapter 3, with additional support available through GitHub issues or Discord discussions.
from huggingface_hub import notebook_login
notebook_login()
import os
os.environ["WANDB_PROJECT"] = "finetuning"
import wandb
if wandb.run is not None:
    wandb.finish()
from datasets import load_dataset
dataset_name = "squad_v2"
dataset = load_dataset(dataset_name, split="train")
eval_dataset = load_dataset(dataset_name, split="validation")
model_id = "openlm-research/open_llama_3b_v2"
new_model_name = f"openllama-3b-peft-{dataset_name}"
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
)
device_map="auto"
base_model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
)
base_model.config.use_cache = False
from google.colab import drive
drive.mount('/content/gdrive')
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token
tokenizer.padding_side = "right"
from transformers import TrainingArguments, EarlyStoppingCallback
from peft import LoraConfig
peft_config = LoraConfig(
    lora_alpha=16,
    lora_dropout=0.1,
    r=64,
    bias="none",
    task_type="CAUSAL_LM",
)
training_args = TrainingArguments(
    output_dir=output_dir, 
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    logging_steps=10,
    max_steps=2000,
    num_train_epochs=100,
    evaluation_strategy="steps",
    eval_steps=5,
    save_total_limit=5,
    push_to_hub=False,
    load_best_model_at_end=True,
    report_to="wandb"
)
from trl import SFTTrainer
trainer = SFTTrainer(
    model=base_model,
    train_dataset=dataset,
    eval_dataset=eval_dataset,
    peft_config=peft_config,
    dataset_text_field="question",
    max_seq_length=512,
    tokenizer=tokenizer,
    args=training_args,
    callbacks=[EarlyStoppingCallback(early_stopping_patience=200)]
)
trainer.train()
from peft import PeftModel, PeftConfig
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from langchain_huggingface import HuggingFacePipeline
model_id = 'openlm-research/open_llama_3b_v2'
config = PeftConfig.from_pretrained("benji1a/openllama-3b-peft-squad_v2")
model = AutoModelForCausalLM.from_pretrained(model_id)
model = PeftModel.from_pretrained(model, "benji1a/openllama-3b-peft-squad_v2")
tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token
pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_length=256
)
llm = HuggingFacePipeline(pipeline=pipe)
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
model = ChatOpenAI()
prompt = PromptTemplate(input_variables=["text"], template="Classify the sentiment 
chain = prompt | model
print(chain.invoke({"text": "I hated that movie, it was terrible!"}))
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_openai import ChatOpenAI
example_prompt = PromptTemplate(
    template="{input} -> {output}",
    input_variables=["input", "output"],
)
prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    suffix="Question: {input}",
    input_variables=["input"]
)
print((prompt | ChatOpenAI()).invoke({"input": " This is an excellent book with hig
content='Positive' additional_kwargs={} example=False
from langchain_core.prompts import PromptTemplate from langchain_openai import Chat
reasoning_prompt = "{question}\nLet's think step by step!"
prompt = PromptTemplate(
  template=reasoning_prompt,
  input_variables=["question"]
)
model = ChatOpenAI()
chain = prompt | model
print(chain.invoke({
   "question": "There were 5 apples originally. I ate 2 apples. My friend gave me 3
}))
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate from langchain_openai import Chat
solutions_template = """
Generate {num_solutions} distinct answers to this question:
{question}
Solutions:
"""
solutions_prompt = PromptTemplate(
   template=solutions_template,
   input_variables=["question", "num_solutions"]
)
solutions_chain = LLMChain(
   llm=ChatOpenAI(),
   prompt=solutions_prompt,
   output_key="solutions"
)
from langchain.chains import SequentialChain
answer_chain = SequentialChain(
   chains=[solutions_chain, consistency_chain],
   input_variables=["question", "num_solutions"],
   output_variables=["best_solution"]
)
```
