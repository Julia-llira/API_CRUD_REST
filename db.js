require('dotenv').config();
const express = require('express');
const initOptions = {
    // Configurações adicionais, se necessário
};

const connectionString = process.env.DATABASE_URL;

module.exports = {
    connectionString,
    initOptions, // Certifique-se de exportar initOptions
};
