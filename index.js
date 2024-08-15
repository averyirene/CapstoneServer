import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import 'dotenv/config';
import journalRoutes from './routes/journal-routes.js';
import { authenticateToken } from './middleware/authenticateToken.js'; 
import aiRoutes from './routes/ai-routes.js';
import symptomRoutes from './routes/symtoms.js';

const app = express();
const port = process.env.PORT ?? 2222;
const usersFilePath = "./data/users.json";

app.use(cors());
app.use(express.json());

const loadUsers = () => {
    try {
        return JSON.parse(fs.readFileSync(usersFilePath));
    } catch (err) {
        console.error("Error loading users file:", err);
        return [];
    }
};

const saveUsers = (users) => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users));
    } catch (err) {
        console.error("Error saving users file:", err);
    }
};

const getUser = (username) => {
    const users = loadUsers();
    return users.find((user) => user.username === username);
};


app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }

    const users = loadUsers(); 

    if (getUser(username)) {
        return res.status(400).json({ error: "User already exists" });
    }

    users.push({ username, password });
    saveUsers(users);

    res.json({ success: true });
});


app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }

    const user = getUser(username);

    if (user && user.password === password) {
        const token = jwt.sign(
            { username: user.username },
            process.env.SECRET_KEY,
            { expiresIn: '1h' } 
        );
        res.json({ token });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

app.get("/profile", authenticateToken, (req, res) => {
    res.json(req.payload);
});

app.use("/journal", authenticateToken, journalRoutes);
app.use('/api', aiRoutes);
app.use ('/symptoms', authenticateToken, symptomRoutes);

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});
