# Google SERP Example

This repository contains two command-line interface (CLI) programs that demonstrate different approaches to fetching and processing Google search results using the Serper API and OpenAI's language models.

- **Simple Approach**: Fetches Google search results and summarizes them using a language model.
- **Complex Approach**: Fetches Google search results, scrapes each result's webpage content, stores the content in a local vector store (HNSWLib), and provides detailed answers using the language model and the vector store.


## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/lamaranelson/googleserp_example.git
cd googleserp_example
```

## Simple Approach

### Description
The simple approach uses the Serper API to fetch Google search results for a given query. It then summarizes the results using OpenAI's language model to provide a concise, human-readable answer. This approach focuses on the descriptions provided by the Google Serper API

### Setup

Navigate to the `simple` directory and install the dependencies:

```bash
cd simple
npm install
```

Create a `.env` file in the `simple` directory and add your API keys:

```env
OPENAI_API_KEY=your_openai_api_key
SERPAPI_API_KEY=your_serper_api_key
```

### Usage

Run the script with Node.js:

```bash
node serperScript.mjs
```

By default, the script queries:

```javascript
fetchData("what is Flowise?");
```

To modify the query, edit the `fetchData` function call at the bottom of the `serperScript.mjs` file:

```javascript
fetchData("your question here");
```

## Complex Approach

### Description

The complex approach enhances the simple one by scraping the full content of each webpage from the Google search results. It stores the scraped content in a local vector store using HNSWLib. This allows for more detailed and context-rich answers, as the language model has access to the full content of the pages rather than just the Google descriptions.

### Setup

Navigate to the `scrape_save_local` directory and install the dependencies:

```bash
cd scrape_save_local
npm install
```

Create a `.env` file in the `scrape_save_local` directory and add your API keys:

```env
OPENAI_API_KEY=your_openai_api_key
SERPAPI_API_KEY=your_serper_api_key
```

### Usage

Run the script with Node.js:

```bash
node serperScriptComplex.mjs
```

The default query is:

```javascript
fetchData("what is flowise?");
```

To change the query, edit the `fetchData` function call at the bottom of the `serperScriptComplex.mjs` file.
