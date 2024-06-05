const request = require('supertest');
const app = require('../app');
const sequelize = require('../database');

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.close();
});

describe('User Registration', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/register')
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
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('token');
    });

    // error for missing fields
    it('should return error for missing fields', async () => {
        const response = await request(app)
            .post('/api/register')
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

    // error for invalid email
    it('should return error for invalid email', async () => {
        const response = await request(app)
            .post('/api/register')
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

    // error for duplicate email
    it('should return error for duplicate email', async () => {
        const response = await request(app)
            .post('/api/register')
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
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('mensaje', 'El correo ya registrado');
    });

    // error for invalid password
    it('should return error for invalid password', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                name: 'Juan Rodriguez',
                email: 'juan@rodriguez.org',
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
