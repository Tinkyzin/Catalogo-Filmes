const API_KEY = "a3fda9b9d1d0aaee95df37313c16684e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

    const campoPesquisa = document.getElementById("campoPesquisa");
    const botaoPesquisa = document.getElementById("botaoPesquisa");
    const filmesGrid = document.getElementById("filmesGrid");
    const inicio = document.getElementById("inicio");
    const filmes = document.getElementById("filmes");
    const series = document.getElementById("series");
    async function requisicao(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro na requisição");
            }
            const data = await response.json();
            renderizarMidia(data.results);
        } catch (error) {
            console.error("Error:", error);
            filmesGrid.innerHTML = "<p>Ocorreu um erro ao buscar os filmes.</p>";
        }
    }
    function renderizarMidia(filmes) {
        filmesGrid.innerHTML = "";
        if (!filmes || filmes.length === 0) {
            filmesGrid.innerHTML = "<p>Nenhum filme encontrado.</p>";
            return;
        }
        filmes.forEach(filme => {
            const card = document.createElement("div");
            card.classList.add("card");
            const imageURL = filme.poster_path
                ? IMAGE_URL + filme.poster_path
                : "";
            if (filme.title) {
                card.innerHTML = `
                <img src="${imageURL}" alt="${filme.title}">
                <h3>${filme.title}</h3>
                <p>${filme.overview}</p>
            `;
            } else {
                card.innerHTML = `
                <img src="${imageURL}" alt="${filme.title}">
                <h3>${filme.name}</h3>
                <p>${filme.overview}</p>
            `;
            }
            filmesGrid.appendChild(card);
        });
    }
     function buscaFilme() {
        const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;
        requisicao(url);
    }
    function buscaSerie(){
        const url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=pt-BR`;
        requisicao (url);
    }
    function carregarTendenciasGeral() {
        const url = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=pt-BR`;
        requisicao(url);
    }

    function pesquisaGeral() {
        const informacao = campoPesquisa.ariaValueMax.trim();
        if (informacao === "") {
            carregarTendenciasGeral();
            return;
        }
    }
        botaoPesquisa.addEventListener("click",pesquisaGeral);
        campoPesquisa.addEventListener("keydown",function(event) {
            if (event.key === "Enter") {
                pesquisaGeral();
            }
        });
        document.addEventListener("DOMContentLoaded", carregarTendenciasGeral);
        inicio.addEventListener("click", carregarTendenciasGeral);
        filmes.addEventListener("click", buscaFilme);
        series.addEventListener("click", buscaSerie);
    
