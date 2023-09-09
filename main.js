const gold_medal = `<img class="gold-medal" src="assets/img/gold-medal.png" alt=""/>`;
let api_response = [];
let tableHTML = "";

fetch(
  "https://script.google.com/macros/s/AKfycbwNwVhQXjsohc0KyhZuqUapvNAZOupwVS3peWEVLkHyiYj_DpW4qhmKo2KleZzzomqb6Q/exec"
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
  .catch((error) => {
    console.log(error);
    document.getElementById(
      "leaderboard-table"
    ).innerHTML = `<p>Something went wrong. Please try again later.</p>`;
  });

document.addEventListener("DOMContentLoaded", () => {
  const shareButton = document.getElementById("shareButton");

  shareButton.addEventListener("click", () => {
    if (navigator.share) {
      const shareData = {
        title: "Beta-leetcoders Leaderboard",
        text: "Check out the leaderboard for the beta-leetcoders!",
        url: "https://blankspace-community.github.io/leetboard/",
      };

      navigator
        .share(shareData)
        .then(() => {
          console.log("Shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      console.log("Share API not supported in this browser");
    }
  });
});

// remove pageLoadCount
// localStorage.removeItem("pageLoadCount");

let loadDetails = localStorage.getItem("pageLoadCount");

if (loadDetails) {
  let counter = JSON.parse(loadDetails).pageLoadCount + 1;
  localStorage.setItem(
    "pageLoadCount",
    JSON.stringify({ pageLoadCount: counter, date: new Date() })
  );
} else {
  localStorage.setItem(
    "pageLoadCount",
    JSON.stringify({ pageLoadCount: 1, date: new Date() })
  );
}
loadDetails = localStorage.getItem("pageLoadCount");
const savedDetails = JSON.parse(loadDetails);

if (
  savedDetails.pageLoadCount > 4 &&
  new Date(savedDetails.date).toDateString() === new Date().toDateString()
) {
  console.log("Max limit reached");
}
