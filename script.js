/* Her er id'et fra youtube traileren */
var trailerVideo = {
    "youtubeId":["z_WZxJpHzEE", "cvCktPUwkW0", "Wmm5SNcjLvo", "SDnYMbYB-nU" , "fnaojlfdUbs", "iVAgTiBrrDA"]
}

/* Her er der udgangspunktet for alle URL'er, med min API nøgle */
let url = "https://www.omdbapi.com/?apikey=7b92adf4&t=";

/* Herunder er der de titler, der skal søges på i OMDB */
let movies = ["Lord of the rings: The fellowship of the ring", "Lord of the rings: The two towers", "Lord of the rings: The return of the king", "The Hobbit: An Unexpected Journey", "The Hobbit: The Desolation of Smaug", "The Hobbit: The Battle of the Five Armies"];

/* Her finder jeg #root fra HTML */
let container = document.getElementById("root");

/* Et loop der kører igennem movies, hvor der er fokus på titlerne i OMDB. Dermed får man dem i den rækkefølge, som der er sat i movies.  */
for (let i = 0; i < movies.length; i++) {
    let fetchUrl = url + movies[i];
    fetch(fetchUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {

            /* En masse const hvor de forskellige HTML elementer bliver kreeret */
            const box = document.createElement("li");
/*            box.setAttribute("style", "background-image: url(" + data.Poster + ");background-repeat: no-repeat;background-size: 100% 100%;");*/

            /* Hertil og ved andre, har jeg tilføjet en attribut på const'en. Dette gør jeg pga. 2 ting. 1: som ved img, hvor jeg skal hente contentet fra OMDB. 2: for at kunne have class på elementerne der skal være i samme tagName, så det kan styles i css. Desuden er det også sat på iframe, da der skal tilføjes en source - der er indholdet i trailervideo arrayet */
            const poster = document.createElement("img");
            poster.setAttribute("src", data.Poster);


            const h2 = document.createElement("h2");
            h2.setAttribute("class", "movieTitle");

            const year = document.createElement("p");
            year.setAttribute("class", "age");

            const description = document.createElement("p");
            description.setAttribute("class", "description");

            const IMDBRating = document.createElement("p");
            IMDBRating.setAttribute("class", "rating");

            const trailer = document.createElement("iframe");
            trailer.setAttribute("src", "https://www.youtube.com/embed/" + trailerVideo.youtubeId[i]);

            /* herunder indsættes der data i HTML, såsom titlen og plottet. */
            h2.innerText = data.Title;
            description.innerText = data.Plot;
            /* Herunder udregnes forskellen på year fra OMDB og dags dato, således at det samlede antal år fra udgivelsen, kan sættes ind i year */
            var d = new Date();
            var age = d.getFullYear();
            year.innerText = "The movie is " +  (age - data.Year) + " years old";
            IMDBRating.innerText = "Imdb Rating: " + data.imdbRating;

            /* Herunder appendes de ovenstående const til box, således at de er childs til box i DOM */
            box.appendChild(poster);
            box.appendChild(h2);
            box.appendChild(year);
            box.appendChild(description);
            box.appendChild(IMDBRating);
            box.appendChild(trailer);

            /* herunder appendes box til container som et child. Det skal altså nestes indeni dette og tilføjes til HMTL */
            container.appendChild(box);
        })
}