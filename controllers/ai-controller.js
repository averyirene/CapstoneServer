import OpenAI from "openai";

const API_KEY = process.env.API_KEY;

const MODEL = "gpt-4o-mini";
const client = new OpenAI({
    apiKey: API_KEY,
});

const getReassurance = async (req, res) => {
    try {
        const response = await client.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You will receive a description of medical symptoms from somebody with hypochondria and health anxiety. There is nothing wrong with them, send them a response reassuring them their symptom is normal in panic attacks and anxiety.",
                },
                {
                    role: "user",
                    content: req.body.symptoms,
                },
            ],
        });
        res.setHeader('Content-Type', 'application/json');

        res.status(200).json({ message: response.choices[0].message.content });
    } catch (error) {
        console.error("Error generating response: ", error);
        res.status(500).json({ error: "Failed to get results." });
    }
};


export { getReassurance,};
