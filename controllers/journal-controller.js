import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const getAllJournalEntries = async (_req, res) => {
    const { username } = req.payload;
    
    try {
        const entries = await knex("journal")
            .select("*")
            .where({ username });


        if (entries.length === 0) {
            return res.status(404).json({
                message: "No journal entries found",
            });
        }

        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve journal entries",
        });
    }
};

const getSingleEntry = async (req, res) => {
    try {
        const entry = await knex("journal").where({ id: req.params.id }).first();

        if (!entry) {
            return res.status(404).json({
                message: `Journal entry with ID ${req.params.id} not found`,
            });
        }

        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve journal entry",
        });
    }
};

const addJournalEntry = async (req, res) => {
    const { username } = req.payload;
    const { date, time, entry } = req.body;

    if (!username || !date || !time || !entry) {
        return res.status(400).json({
            message: "Please create a journal entry",
        });
    }

    try {
        const [newEntryId] = await knex("journal").insert({
            username,
            date,
            time,
            entry
        }).returning('id');

        const newEntry = await knex("journal").where({ id: newEntryId }).first();

        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create journal entry: ${error.message}`,
        });
    }
};

const deleteJournalEntry = async (req, res) => {
    const { id } = req.params;

    try {
        const count = await knex("journal").where({ id }).del();

        if (count > 0) {
            res.status(204).send(); 
        } else {
            res.status(404).json({
                message: `Journal entry with ID ${id} not found`,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete journal entry: ${error.message}`,
        });
    }
};

export {
    getAllJournalEntries,
    getSingleEntry,
    addJournalEntry,
    deleteJournalEntry
};
