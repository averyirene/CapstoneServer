import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const getSymptomEntries = async (req, res) => {
    const { username } = req.payload;

    try {
        const entries = await knex("symptoms").select("*").where({ username });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve symptoms" });
    }
};

const addSymptomEntry = async (req, res) => {
    const { username } = req.payload;
    const { symptom } = req.body;

    if (!username || !symptom) {
        return res.status(400).json({ message: "No symptoms logged" });
    }

    try {
        const [newEntryId] = await knex("symptoms").insert({ username, symptom }).returning('id');
        const newEntry = await knex("symptoms").where({ id: newEntryId }).first();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ message: `Unable to create symptom entry: ${error.message}` });
    }
};

export { getSymptomEntries, addSymptomEntry };
