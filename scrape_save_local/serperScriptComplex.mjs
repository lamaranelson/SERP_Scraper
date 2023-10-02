import { config } from 'dotenv';
import axios from 'axios';
import { prepareAndGetOrganicData } from "./scrapeWebsites.mjs";

config();

const baseUrl = "https://serpapi.com/search";

async function fetchData(question) {
    try {

        const params = {
            api_key: process.env.SERPAPI_API_KEY,
            engine: "google",
            q: question,
            google_domain: "google.com",
            tbs: "cdr:1,cd_min:1/1/2022",
            hl: "en",
            num: "10"
        };

        const response = await axios.get(baseUrl, { params });
        const data = response.data;
        const organicResults = data.organic_results;

        organicResults.forEach((result, index) => {
            console.log(`Result ${index + 1}:`);
            console.log(`Title: ${result.title}`);
            console.log(`Link: ${result.link}`);
            console.log(`Snippet: ${result.snippet}`);
            console.log("--------------------------------------------------");
        });


        const vectorStore = await prepareAndGetOrganicData(
            question,
            organicResults,
            false,
        );
        
        const results = await vectorStore.similaritySearch(question, 6);

        // Combine the snippets into a single string
        const snippets = results.map(result => result.pageContent).join("\n--------------------------------------------------\n");
        
        // console.log(snippets);
        
        const prompt = `The user's questions is:\nQuestion:${question}\n\nThese are the first 10 websites scraped results from Google search results:\n${snippets}\nPlease answer the user's question given the provided context only. Answer the user's question directly without referring to the snippets.`

        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 1,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` 
                }
            }
        );

        console.log("OpenAI Response:", openaiResponse.data.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchData("what is flowise?");
