TECNOLOGIAS USADAS: {
    Node.js, 
    Express.js, 
    MongoDB,
    Mongoose,
    JWT: tokens de verificacion,
    Bcrypt: encriptacion de contraseñas,
    Nodemailer: framework para enviar mails,
    CORS,
}

INSTALACION: {
    1- Instalar dependencias: npm install
    2- Configurar variables de entorno (.env) {
        MONGO_DB_CONNECTION_STRING=mongodb://localhost:27017/iq-backend
        JWT_SECRET_KEY=
        GMAIL_NAME=
        GMAIL_PASSWORD_KEY= 
    }
    3- Iniciar: pm run dev
}