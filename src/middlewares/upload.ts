// ============================================================
// TODO 1: Configurar o Multer para upload de imagens
// ============================================================
// Importar multer e path
//
// Criar diskStorage:
//   destination: "uploads/"
//   filename: Date.now() + random + extensao (path.extname)
//
// Criar fileFilter:
//   aceitar: image/jpeg, image/png, image/gif, image/webp
//   rejeitar: cb(new Error("Tipo nao permitido"), false)
//
// Exportar:
//   export const upload = multer({ storage, fileFilter, limits: { fileSize: 5*1024*1024 } });
// ============================================================

import multer from 'multer';
import path from 'path';

// Configuração do armazenamento (diskStorage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define a pasta de destino dos uploads
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Gera um sufixo aleatório para evitar colisão de nomes
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Extrai a extensão original do arquivo (ex: .png, .jpg)
    const extension = path.extname(file.originalname);
    
    // Define o nome final do arquivo
    cb(null, uniqueSuffix + extension);
  }
});

// Filtro de tipos de arquivos (fileFilter)
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    // Aceita o arquivo
    cb(null, true);
  } else {
    // Rejeita o arquivo com um erro
    cb(new Error('Tipo nao permitido'), false);
  }
};

// Configuração final e exportação do middleware (limite de 5MB)
export const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 5 * 1024 * 1024 } 
});