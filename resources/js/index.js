const APIURL = 'https://api.github.com/users/'
const PROFILESDATA = "resources/data/profiles.json"

const cardImg = document.getElementById("user-img");
const cardName = document.getElementById("user-name");
const cardGithubAnchor = document.getElementById("github-anchor")



let getLocalUsers = async () => {
    let usersData = await fetch(PROFILESDATA);
    let usersJson = await usersData.json();
    return usersJson;
}

let getRandomProfile = async () => {
    let profiles = await getLocalUsers();
    let randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
    return randomProfile;
}
let getGithubInfo = async () => {
    let user = await getRandomProfile();
    fetch(APIURL + user.username).then(response => response.json()).then(json => {
        cardImg.src = json["avatar_url"];
        cardName.textContent = user["name"];
        cardGithubAnchor.href = json["html_url"];
    })
}

getGithubInfo()