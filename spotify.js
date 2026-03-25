const axios = require("axios");

async function getSpotifyToken() {
  const CLIENT_ID = "a0fafe02adbe449fa6a1b70767f4d028";
  const CLIENT_SECRET = "787d947810184b118e659671ca5e4de9";

  const resp = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization:
          "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return resp.data.access_token;
}

async function buscarMusicaSpotify(nome) {
  const token = await getSpotifyToken();
  const search = await axios.get("https://api.spotify.com/v1/search", {
    params: { q: nome, type: "track", limit: 1 },
    headers: { Authorization: `Bearer ${token}` },
  });

  const track = search.data.tracks?.items?.[0];
  if (!track) return null;

  return {
    nome: track.name || "Não disponível",
    artista: track.artists?.[0]?.name || "Não disponível",
    album: track.album?.name || "Não disponível",
    duracao_ms: track.duration_ms || 0,
    spotify_url: track.external_urls?.spotify || "Não disponível",
    preview_url: track.preview_url || null,
  };
}

async function buscarAlbunsSpotify(artistaNome) {
  const token = await getSpotifyToken();
  const search = await axios.get("https://api.spotify.com/v1/search", {
    params: { q: artistaNome, type: "artist", limit: 1 },
    headers: { Authorization: `Bearer ${token}` },
  });

  const artist = search.data.artists?.items?.[0];
  if (!artist) return [];

  const albunsResp = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/albums`, {
    params: { limit: 5 },
    headers: { Authorization: `Bearer ${token}` },
  });

  const albums = albunsResp.data.items || [];
  return albums.filter(a => a != null).map(a => ({
    nome: a.name || "Não disponível",
    tipo: a.album_type || "Não disponível",
    releaseDate: a.release_date || "Não disponível",
    link: a.external_urls?.spotify || "Não disponível",
  }));
}

async function buscarPlaylistsSpotify(nome) {
  const token = await getSpotifyToken();
  const resp = await axios.get("https://api.spotify.com/v1/search", {
    params: { q: nome, type: "playlist", limit: 5 },
    headers: { Authorization: `Bearer ${token}` },
  });

  const playlists = resp.data.playlists?.items || [];
  return playlists
    .filter(p => p != null)
    .map(p => ({
      nome: p.name || "Não disponível",
      totalTracks: p.tracks?.total || 0,
      dono: p.owner?.display_name || "Não disponível",
      link: p.external_urls?.spotify || "Não disponível",
    }));
}

async function buscarArtistaSpotify(nome) {
  const token = await getSpotifyToken();
  const resp = await axios.get("https://api.spotify.com/v1/search", {
    params: { q: nome, type: "artist", limit: 1 },
    headers: { Authorization: `Bearer ${token}` },
  });

  const artist = resp.data.artists?.items?.[0];
  if (!artist) return null;

  return {
    nome: artist.name || "Não disponível",
    link: artist.external_urls?.spotify || "Não disponível",
    imagem: artist.images?.[0]?.url || null,
  };
}

module.exports = {buscarMusicaSpotify, buscarAlbunsSpotify, buscarPlaylistsSpotify,buscarArtistaSpotify};