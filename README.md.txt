# 🤖🎧 Chatbot de Música

Um chatbot desenvolvido em **Node.js** que permite buscar músicas, artistas, álbuns, letras, playlists e clipes utilizando as APIs do **Spotify** e **YouTube** diretamente pelo terminal.

---

## 🚀 Funcionalidades

* 🔍 Buscar músicas (Spotify + YouTube)
* ▶️ Obter link para reprodução de músicas
* 👤 Buscar informações de artistas
* 💿 Buscar álbuns
* 🎬 Buscar clipes musicais
* 📝 Buscar letras (via YouTube)
* 🎶 Buscar playlists no Spotify
* 📜 Histórico de pesquisas com data e hora

---

## 🛠 Tecnologias utilizadas

* Node.js
* JavaScript
* API do Spotify
* API do YouTube
* Axios (requisições HTTP)
* Readline (interface no terminal)

---

## 📂 Estrutura do projeto

```
📁 chatbot-musica
 ├── index.js        # Interface principal e comandos
 ├── spotify.js      # Integração com API do Spotify
 ├── youtube.js      # Integração com API do YouTube
 └── README.md
```

---

## ▶️ Como executar o projeto

### 1. Clone o repositório

```
git clone https://github.com/seu-usuario/chatbot-musica.git
```

### 2. Acesse a pasta

```
cd chatbot-musica
```

### 3. Instale as dependências

```
npm install
```

### 4. Execute o chatbot

```
node index.js
```

---

## 💻 Comandos disponíveis

```
buscar [nome da música]
tocar [nome da música]
artista [nome do artista]
album [nome do álbum]
letra [nome da música]
clipes [nome do artista]
playlist [nome ou tema]
historico
sair
```

---

## 🧠 Como funciona

O chatbot integra duas APIs principais:

### 🟢 Spotify

* Busca músicas, artistas, álbuns e playlists
* Retorna informações como:

  * Nome
  * Artista
  * Álbum
  * Duração
  * Link
  * Preview (quando disponível)

### 🔴 YouTube

* Busca vídeos relacionados
* Retorna:

  * Título
  * Canal
  * Duração
  * Visualizações
  * Link direto

---

## 📜 Histórico

O sistema armazena:

* Tipo da busca
* Termo pesquisado
* Data
* Hora

Tudo exibido diretamente no terminal.

---

## ⚠️ Observações importantes

* É necessário ter conexão com a internet
* As APIs utilizadas podem ter limites de requisição
* As chaves de API estão no código (ideal usar variáveis de ambiente em produção)

---

## 🔐 Melhorias futuras

* Interface gráfica (web ou app)
* Favoritar músicas
* Cache de resultados
* Autenticação de usuário
* Deploy online

---

## 👨‍💻 Autor

**Yuri Alves**

---

## ⭐ Contribuição

Sinta-se à vontade para contribuir com melhorias no projeto!

---

## 📌 Status do projeto

🚧 Em desenvolvimento / Aprendizado
