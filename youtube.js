const axios = require("axios");
const API_KEY = "SUA CHAVE AQUI";

async function searchYoutube(query, max = 5) {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
            part: "snippet",
            q: query,
            type: "video",
            key: API_KEY,
            maxResults: max
        }
    });
    return response.data.items.map(v => ({
        titulo: v.snippet.title,
        canal: v.snippet.channelTitle,
        link: "https://youtube.com/watch?v=" + v.id.videoId,
        videoId: v.id.videoId
    }));
}

function formatDuration(isoDuration) {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? parseInt(match[1].replace("H","")) : 0;
    const minutes = match[2] ? parseInt(match[2].replace("M","")) : 0;
    const seconds = match[3] ? parseInt(match[3].replace("S","")) : 0;
    const totalMinutes = hours * 60 + minutes;
    return `${totalMinutes}:${seconds.toString().padStart(2,"0")}`;
}

async function getVideoDetails(videoIds) {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
            part: "snippet,contentDetails,statistics",
            id: videoIds.join(","),
            key: API_KEY
        }
    });

    return response.data.items.map(v => ({
        titulo: v.snippet.title,
        artista: v.snippet.channelTitle,
        duracao: formatDuration(v.contentDetails.duration),
        views: v.statistics.viewCount,
        link: "https://youtube.com/watch?v=" + v.id
    }));
}

async function buscarMusica(nome) {
    const searchResults = await searchYoutube(nome + " official music", 1);
    const videoIds = searchResults.map(v => v.videoId);
    return await getVideoDetails(videoIds);
}

async function tocarMusica(nome) {
    const results = await buscarMusica(nome);
    return results[0] ? results[0].link : null;
}

async function buscarArtista(nome) {
    const searchResults = await searchYoutube(nome + " artist", 1);
    const videoIds = searchResults.map(v => v.videoId);
    return await getVideoDetails(videoIds);
}

async function buscarAlbum(nome) {
    const searchResults = await searchYoutube(nome + " album", 1);
    const videoIds = searchResults.map(v => v.videoId);
    return await getVideoDetails(videoIds);
}

async function buscarLetra(nome) {
    const searchResults = await searchYoutube(nome + " lyrics", 1);
    const videoIds = searchResults.map(v => v.videoId);
    return await getVideoDetails(videoIds);
}

async function clipesArtista(artista) {
    const searchResults = await searchYoutube(artista + " official music video", 5);
    const videoIds = searchResults.map(v => v.videoId);
    return await getVideoDetails(videoIds);
}

module.exports = {buscarMusica, tocarMusica, buscarArtista, buscarAlbum, buscarLetra, clipesArtista};
