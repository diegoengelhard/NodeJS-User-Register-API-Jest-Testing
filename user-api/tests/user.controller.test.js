const request = require('supertest');
const app = require('../app');
const sequelize = require('../database');
const User = require('../models/user.model');

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.close();
});

afterEach(async () => {
    // Limpiar los datos creados durante las pruebas
    await User.destroy({ where: {} });
});

describe('User Registration', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({
                name: 'Juan Rodriguez',
                email: 'juan@rodriguez1.org',
                password: '@Diego123',
                phones: [
                    {
                        number: '1234567',
                        citycode: '1',
                        contrycode: '57'
                    }
                ]
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user).toHaveProperty('token');
    });

    it('should return error for missing fields', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({
                name: 'Juan Rodriguez',
                email: '',
                password: '@Diego123',
                phones: [
                    {
                        number: '1234567',
                        citycode: '1',
                        contrycode: '57'
                    }
                ]
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Missing required fields');
    });

    it('should return error for invalid email', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({
                name: 'Juan Rodriguez',
                email: 'juanrodriguez.org',
                password: '@Diego123',
                phones: [
                    {
                        number: '1234567',
                        citycode: '1',
                        contrycode: '57'
                    }
                ]
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid email');
    });

    it('should return error for duplicate email', async () => {
        // Register user first
        await request(app)
            .post('/api/user/register')
            .send({
                name: 'Juan Rodriguez',
                email: 'juan@rodriguez.org',
                password: '@Diego123',
                phones: [
                    {
                        number: '1234567',
                        citycode: '1',
                        contrycode: '57'
                    }
                ]
            });

        // Attempt to register again with the same email
        const response = await request(app)
            .post('/api/user/register')
            .send({
                name: 'Juan Rodriguez',
                email: 'juan@rodriguez.org',
                password: '@Diego123',
                phones: [
                    {
                        number: '1234567',
                        citycode: '1',
                        contrycode: '57'
                    }
                ]
            });
        expect(response.status).toBe(409); // Ajustar a 409 que es el código correcto para conflicto (correo duplicado)
        expect(response.body).toHaveProperty('message', 'E-mail already exists');
    });

    it('should return error for invalid password', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({
                name: 'Juan Rodriguez',
                email: 'juan@rodriguez2.org',
                password: '123456',
                phones: [
                    {
                        number: '1234567',
                        citycode: '1',
                        contrycode: '57'
                    }
                ]
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid password: must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and one special character');
    });
});
