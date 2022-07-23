const url = 'https://ajax.test-danit.com/api/swapi/films';
const container = document.querySelector(".container");
const xhr = new XMLHttpRequest();

fetch(url).then(response => response.json())
  .then(data => {
    data.forEach(({ episodeId, name, openingCrawl, characters }) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.insertAdjacentHTML("beforeend", 
                `<p><b>Episode:</b> ${episodeId} </p>
                <p><b>Movie title:</b> ${name} </p>
                <p><b>Short description:</b> ${openingCrawl} </p>
                <p class="p__title"><b>Movie characters</b></p>`);
      const list = document.createElement("ul");
      const listFirst = document.createElement("li");
      list.append(listFirst);
      const preloader = document.createElement("div");
      const preloaderPart1 = document.createElement("div");
      const preloaderPart2 = document.createElement("div");
      const preloaderPart3 = document.createElement("div");
      preloader.className = "lds-facebook";
      preloader.append(preloaderPart1);
      preloader.append(preloaderPart2);
      preloader.append(preloaderPart3);
      listFirst.append(preloader);
      div.append(list);
      container.append(div);
      Promise.allSettled(characters).then(urlArr => {
        urlArr.forEach(({ value }) => {
          fetch(value).then(res => res.json())
            .then(({ name }) => {
              const li = document.createElement("li");
              li.innerHTML = `${name}`;
              list.append(li);
              listFirst.remove();
            })
        })
      });
    });
  });




