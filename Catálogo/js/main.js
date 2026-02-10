const API_KEY ="9ed4d53db23dc98cfda64348b807b218";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisa = document.getElementById("botaoPesquisa");
const filmesGrid =document.getElementById("filmesGrid");

async function requisicao(url) {
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
        const data = await response.json()
        renderizarFilmes(data.results);
    } catch (error) {
        console.error("Erro:", error);
    }
}
function buscaFilme() {
    const informacao =  campoPesquisa.value.trim();
    if (informacao === "") {
        window.location.reload();
        return;
    }
    console.log("pesquisando por:", informacao);
    campoPesquisa.value ="";
}
botaoPesquisa.addEventListener("click", buscaFilme);
campoPesquisa.addEventListener("keydown",function (event) {
    if (event.key === "Enter") {
        buscaFilme();
    }
});
