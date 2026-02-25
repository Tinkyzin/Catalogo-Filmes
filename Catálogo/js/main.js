const API_KEY = "9ed4d53db23dc98cfda64348b807b218";
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
            filmesGrid.innerHTML = "<p>Ocorreu um erro ao buscar os filmes. Por favor, tente novamente mais tarde.</p>";
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

            const imagem = filme.poster_path 
                ? $IMAGE_URL + filme.poster_path
                : "";
            if(filme.title){
                card.innerHTML = `
                <img src="${image}" alt="${filme.title}">
                <h3>${filme.title}</h3>
                <p>${filme.overview}</p>
                `;
            }else{
                card.innerHTML= `
                <img src="${imagem}" alt="${filme.name}">
                <h3>${filme.name}</h3>
                <p>${filme.overview}</p>
                `;
            }
            card.addEventListener("click", () => {
                window.location.href = `pages/detalhe.html?id=${filme.id}&type=${filme.media_type}`
            });
            filmesGrid.appendChild(card);
        });
    }
     function buscarFilme() {
        const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;
        requisicao(url);
    }
    function buscarSerie(){
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
        filmes.addEventListener("click", buscarFilme);
        series.addEventListener("click", buscarSerie);
    
