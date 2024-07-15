const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do multer para armazenar arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'Upload bem-sucedido!', file: req.file });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
