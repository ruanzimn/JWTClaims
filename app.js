const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const secret = 'claims'

app.get('/jwt/claims', (req, res) => {
    const claims = {
        "iss": "Issuer - Identifica o principal que emitiu o token.",
        "sub": "Subject - Identifica o principal ao qual o token é destinado.",
        "aud": "Audience - Identifica os destinatários pretendidos do token.",
        "exp": "Expiration Time - Define o tempo de expiração do token.",
        "nbf": "Not Before - Define o tempo antes do qual o token não deve ser aceito.",
        "iat": "Issued At - Define o tempo em que o token foi emitido.",
        "jti": "JWT ID - Identifica de forma única o token JWT.",

    };
    res.json(claims);
});

app.get('/jwt/tokenid', (req, res) => {
    const payload = {
        id: '123456', // Identificador do token
        iat: Math.floor(Date.now() / 1000), // Data de geração do token
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expiração do token (1 hora)
    };

    const token = jwt.sign(payload, secret);

    res.json({
        token,
        id: payload.id,
        issuedAt: new Date(payload.iat * 1000).toISOString(),
        expiresAt: new Date(payload.exp * 1000).toISOString()
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
