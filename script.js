var btn = document.querySelector(".search")
var userinpt = document.querySelector(".userinpt")
var card = document.querySelector(".card");

function getProfileData(username){
  return fetch(`https://api.github.com/users/${username}`)
   .then((raw) => {
      if (!raw.ok) throw new Error("User not found");
      return raw.json();
   });
}
function getRepos(username){
   return fetch(`https://api.github.com/users/${username}/repos`)
  .then((raw) => {
      if (!raw.ok) throw new Error("No repositories found");
      return raw.json();
   })
}
function getDetails(data){
   
   var udata = ` <div class="bg-gray-700 rounded-xl p-5 flex flex-col items-center space-y-4">
            <img src=${data.avatar_url} alt="GitHub Avatar"
                class="w-24 h-24 rounded-full shadow-lg">

            <h2 class="text-xl font-semibold text-white">${data.name}</h2>
            <p class="text-gray-300">@${data.login}</p>

            <p class="text-center text-gray-400 text-sm">${data.bio ? data.bio:""}</p>

            <!-- Stats -->
            <div class="flex justify-between gap-7 w-full mt-4 ">
                <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-white">${data.public_repos}</span>
                    <span class="text-sm text-gray-300">Repos</span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-white">${data.followers}</span>
                    <span class="text-sm text-gray-300">Followers</span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-lg font-bold text-white">${data.following}</span>
                    <span class="text-sm text-gray-300">Following</span>
                </div>
            </div>

            <!-- Additional Info -->
            <div class="mt-4 text-gray-300 text-sm flex flex-col items-center space-y-1">
                <p><strong>Location:</strong> ${data.location ? data.location : ""}</p>
            </div>
        </div>`;

           card.innerHTML = udata;
}

btn.addEventListener("click", function(){
   let username = userinpt.value.trim();
   if (username.length > 0){
      getProfileData(username)
      .then((data) => getDetails(data));
   }
});
