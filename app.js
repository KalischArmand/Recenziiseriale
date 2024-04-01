const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path'); // Import the 'path' module to resolve file paths

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

let users = [];

const loadUsers = async () => {
    try {
        const data = await fs.readFile('./users.json');
        users = JSON.parse(data).users;
    } catch (error) {
        console.error('Error loading users:', error);
    }
};

const saveUsers = async () => {
    try {
        await fs.writeFile('./users.json', JSON.stringify({ users }));
    } catch (error) {
        console.error('Error saving users:', error);
    }
};

loadUsers();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html')); // Use path.join to construct the file path
});

app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    if (users.some(user => user.username === username)) {
        return res.status(400).send('Username already exists.');
    }
    users.push({ username, password, email });
    try {
        await saveUsers();
        res.send('User created successfully! Please <a href="/login">login</a>.');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user.');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html')); // Use path.join to construct the file path
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('Login successful! Welcome, ' + username + '.');
    } else {
        res.status(401).send('Invalid username or password.');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
