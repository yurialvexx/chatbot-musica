const readline = require("readline");
const {buscarMusica, tocarMusica, buscarArtista, buscarAlbum, buscarLetra, clipesArtista} = require("./youtube");

const {buscarMusicaSpotify, buscarPlaylistsSpotify, buscarAlbunsSpotify, buscarArtistaSpotify} = require("./spotify");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let historico = [];

function salvarHistorico(tipo, termo) {
  const data = new Date();

  historico.push({
    tipo,
    termo,
    data: data.toLocaleDateString(),
    hora: data.toLocaleTimeString()
  });
}

console.log("🤖🎧 Chatbot de Música iniciado!");
console.log("Digite 'ajuda' para ver os comandos.\n");

async function mostrarSpotifyEYoutube(tipo, argumento) {
  switch (tipo) {

    case "musica":
      const spotifyMusica = await buscarMusicaSpotify(argumento);
      const ytMusica = await buscarMusica(argumento);

      if (spotifyMusica) {
        console.log("\n🟢 SPOTIFY:");
        console.log(`🎶 Nome: ${spotifyMusica.nome}`);
        console.log(`🎨 Artista: ${spotifyMusica.artista}`);
        console.log(`💿 Álbum: ${spotifyMusica.album}`);
        console.log( `⏳ Duração: ${Math.floor(spotifyMusica.duracao_ms / 60000)}:${ ((spotifyMusica.duracao_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}`
        );
        console.log(`Spotify: ${spotifyMusica.spotify_url}`);
        if (spotifyMusica.preview_url) console.log(`Preview: ${spotifyMusica.preview_url}`);
      } 
      else console.log("❌ Música não encontrada no Spotify.");

      if (ytMusica.length > 0) {
        console.log("\n🔗 YOUTUBE:");
        ytMusica.forEach((m, i) => console.log(`${i + 1}. ${m.titulo} — ${m.link}`));
      } 
      else console.log("❌ Nenhum vídeo encontrado no YouTube.");
      break;

    case "album":
      const spotifyAlbuns = await buscarAlbunsSpotify(argumento);
      const ytAlbuns = await buscarAlbum(argumento);

      if(spotifyAlbuns.length > 0){
        console.log(`\n💿 Álbuns Spotify de '${argumento}':`);
        spotifyAlbuns.forEach((a,i)=>{
          console.log(`${i + 1}. ${a.nome} (${a.tipo}) — ${a.releaseDate} — ${a.link}`);
        });
      }

      if(ytAlbuns.length > 0){
        console.log(`\n💿 Álbuns YouTube de '${argumento}':`);
        ytAlbuns.forEach((a,i)=> console.log(`${i + 1}. ${a.titulo} — ${a.link}`));
      }
      break;

      case "artista":
        const spotifyArtista = await buscarArtistaSpotify(argumento);
        const ytArtista = await buscarArtista(argumento);
  
        if(spotifyArtista){
          console.log(`\n👤 SPOTIFY: ${spotifyArtista.nome}`);
          console.log(`🔗 Link: ${spotifyArtista.link}`);
          if(spotifyArtista.imagem) console.log(`📸 Imagem: ${spotifyArtista.imagem}`);
        }
  
        if(ytArtista.length > 0){
          console.log(`\n👤 YOUTUBE:`);
          ytArtista.forEach((v,i)=> console.log(`${i+1}. ${v.titulo} — ${v.link}`));
        }
        break;

    case "clipes":
      const spotifyClipes = await buscarMusicaSpotify(argumento);
      const ytClipes = await clipesArtista(argumento);

      if(spotifyClipes?.preview_url){
        console.log(`\n🎵 Preview Spotify: ${spotifyClipes.preview_url}`);
      }

      if(ytClipes.length > 0){
        console.log(`\n🎬 Clipes YouTube de '${argumento}':`);
        ytClipes.forEach((c,i)=> console.log(`${i + 1}. ${c.titulo} — ${c.link}`));
      } 
      else console.log("❌ Nenhum clipe encontrado no YouTube.");
      break;

    case "letra":
      const ytLetras = await buscarLetra(argumento);
      if(ytLetras.length > 0){
        console.log(`\n📝 Letras YouTube de '${argumento}':`);
        ytLetras.forEach((l,i)=> console.log(`${i + 1}. ${l.titulo} — ${l.link}`));
      } 
      else console.log("❌ Nenhuma letra encontrada no YouTube.");
      break;

    case "playlist":
      const playlists = await buscarPlaylistsSpotify(argumento);
      if(playlists.length === 0) return console.log("❌ Nenhuma playlist encontrada no Spotify.");
      console.log(`\n🎶 Playlists Spotify de '${argumento}':`);
      playlists.forEach((p, i) => {
        console.log(`${i + 1}. ${p.nome} — Dono: ${p.dono} — Link: ${p.link}`);
      });
      break;
  }
}

// Interface de comandos
rl.on("line", async (input) => {
  let partes = input.split(" ");
  let comando = partes[0];
  let argumento = partes.slice(1).join(" ");

  switch (comando) {
    case "buscar":
  await mostrarSpotifyEYoutube("musica", argumento);
  salvarHistorico("música", argumento);
  console.log("\n====================================================")
  break;

case "tocar":
  const link = await tocarMusica(argumento);
  if(!link) return console.log("❌ Música não encontrada no YouTube.");
  console.log("\n🔗 Link da música:");
  console.log(link);
  salvarHistorico("tocar", argumento);
  console.log("\n====================================================")
  break;

case "album":
  await mostrarSpotifyEYoutube("album", argumento);
  salvarHistorico("álbum", argumento);
  console.log("\n====================================================")
  break;

case "artista":
  await mostrarSpotifyEYoutube("artista", argumento);
  salvarHistorico("artista", argumento);
  console.log("\n====================================================")
  break;

case "clipes":
  await mostrarSpotifyEYoutube("clipes", argumento);
  salvarHistorico("clipes", argumento);
  console.log("\n====================================================")
  break;

case "letra":
  await mostrarSpotifyEYoutube("letra", argumento);
  salvarHistorico("letra", argumento);
  console.log("\n====================================================")
  break;

case "playlist":
  await mostrarSpotifyEYoutube("playlist", argumento);
  salvarHistorico("playlist", argumento);
  console.log("\n====================================================")
  break;

case "historico":
  if (historico.length === 0) {console.log("📭 Nenhuma pesquisa ainda.");
  console.log("\n====================================================")
  break;
}

  console.log("\n📜 Histórico de pesquisas:\n");

  historico.forEach((h, i) => {
    console.log(
      `${i + 1}. [${h.tipo.toUpperCase()}] ${h.termo} | 📅 ${h.data} ⏰ ${h.hora}`
    );
    console.log("\n====================================================")
  });

  break;  

    case "ajuda":
      console.log("\n")
      console.log(`🔧 Comandos disponíveis:
buscar [nome da música]
tocar [nome da música]
artista [nome do artista]
album [nome do álbum]
letra [nome da música]
clipes [nome do artista]
playlist [nome ou tema]
histórico
sair`);
console.log("\n====================================================")
        break;

    case "sair":
      console.log("👋 Encerrando chatbot...");
      rl.close();
      break;

    default:
      console.log("❌ Comando não reconhecido. Digite 'ajuda'.");
  }
});