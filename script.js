const display = document.querySelector("ul.display")
const buttonCallAPI = document.querySelector("button.callAPIButton")
let player = ""

function callPlayerBalance(playerName){
    const apiUrl = "https://api.splinterlands.io/players/balances?username="
    const params = { username: playerName}
    const url = new URL(apiUrl);
    url.search = new URLSearchParams(params).toString()

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Traitez les données renvoyées par l'API
        console.log(`Balance des tokens du joueur ${data[0].player}`)
        let colorCounter = 2
        for (let i = 0; i < data.length; i++) {     
            const li = document.createElement("li")
            li.innerHTML = `${data[i].token} : ${data[i].balance}`     
            display.appendChild(li)
            if (colorCounter%2 === 0) {
              li.classList.add("orangeBackground")
            }else{
              li.classList.add("blueBackground")
            }
            colorCounter++
        }
      })
      .catch(error => {
        console.error("Erreur lors de la requête API:", error.message);
      });
}

buttonCallAPI.addEventListener("click", ()=>{
    display.innerHTML = ""
    player = document.querySelector("input[name='username']").value
    callPlayerBalance(player)
})



