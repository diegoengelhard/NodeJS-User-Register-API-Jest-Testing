const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const bodyParser = require('body-parser');

const swaggerDocument = YAML.load('./api/swagger.yaml');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint to register a new user
app.post('/api/user/register', (req, res) => {
    const { name, email, password, phones } = req.body;

    if (!name || !email || !password || !phones) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    // simulate user creation
    const user = {
        id: 'some-uuid',
        name,
        email,
        password,
        phones,
        token: 'some-jwt-token',
        isactive: true,
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        last_login: new Date().toISOString()
    };

    res.status(201).json({
        message: 'User created successfully!',
        user
    });
});

// Endpoint to get all users
app.get('/api/user/all', (req, res) => {
    // Simulación de usuarios
    const users = [
        {
            id: 'some-uuid',
            name: 'Juan Rodriguez',
            email: 'juan@rodriguez.org',
            password: '@Diego123',
            phones: [
                { number: '1234567', citycode: '1', contrycode: '57' }
            ],
            token: 'some-jwt-token',
            isactive: true,
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
            last_login: new Date().toISOString()
        }
    ];

    res.status(200).json(users);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api-docs`);
});
