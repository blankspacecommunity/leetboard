const gold_medal = `<img class="gold-medal" src="assets/img/gold-medal.png" alt=""/>`;
let api_response = [];
let tableHTML = "";

fetch(
  "https://script.google.com/macros/s/AKfycbyo47vQMpguOGN1y6NuIXsX0Wc-LCwGkQ1-Ay-DgYu2CU7PsLSE2GqjB78OFZXRqHlHGQ/exec"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    api_response = data;
    document.getElementById("leaderboard-table").innerHTML = "";
    for (let i = 0; i < api_response.length; i++) {
      tableHTML += `<tr>
        <td class="number">${api_response[i].NO}</td>
        <td class="name">${api_response[i].NAME}</td>
        <td class="points">${api_response[i].SOLVED} ${
        i === 0 ? gold_medal : ""
      }</td>
        </tr>`;
    }
    document.getElementById("leaderboard-table").innerHTML = tableHTML;
  })
  .catch((error) => console.log(error));
