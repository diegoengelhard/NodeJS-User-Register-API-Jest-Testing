# API de Registro de Usuarios

## Instalación y Uso

1. Clona el repositorio:
    ```bash
    git clone <repositorio_url>
    ```
2. Navega a la carpeta del proyecto:
    ```bash
    cd my-api
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Configura las variables de entorno:
    Crea un archivo `.env` en la raíz del proyecto y añade:
    ```plaintext
    JWT_SECRET=your_secret_key
    PORT=3000
    ```

## Uso

1. Inicia el servidor:
    ```bash
    npm start
    ```

2. La API estará disponible en `http://localhost:3000/api`.

## Endpoints

### Registro de Usuario

**URL**: `/api/register`

**Método**: `POST`

**Datos de Entrada**:
```json
{
    "name": "Juan Rodriguez",
    "email": "juan@rodriguez.org",
    "password": "hunter2",
    "phones": [
        {
            "number": "1234567",
            "citycode": "1",
            "contrycode": "57"
        }
    ]
}
```

## Pruebas
1. Correr comando:
    ```bash
    npm test
    ```