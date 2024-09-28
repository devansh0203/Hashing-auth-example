const express = require('express')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(express.json())

const users = [
	{
		username:"Deepak",
		password:"pass123"
	}
]

app.post('/register', async (req, res) => {
	const { username, password } = req.body
	const existingUser = users.find(user => user.username === username)
	if (existingUser) {
		return res.status(400).send({ message: 'Username already exists' })
	}
	const hashedPassword = await bcrypt.hash(password, 12);
	users.push({
		username,
		password: hashedPassword
	})
	res.send({ message: 'User created successfully' })
})

app.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = users.find(user => user.username === username)
	if (!user) {
		return res.status(400).send({ message: 'Invalid username or password' })
	}
	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		return res.status(400).send({ message: 'Invalid username or password' })
	}
	res.send({ message: 'Logged in successfully' })
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
})
