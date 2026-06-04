const BACKEND_URL = "http://127.0.0.1:8000/api/generate-message/";

const generateButton = document.getElementById("generate");
const saveButtonn = document.getElementById("save-campaign");
const matchScore = document.getElementById("score");
const message = document.getElementById("message");

saveButtonn.addEventListener("click", async () =>{
   const roleId = document.getElementById("role").value;
   const targetSkills = document.getElementById("target-skills").value.split(',').map(s=>s.trim());
   const targetLocation = document.getElementById("target-location").value;
   const experienceMin = document.getElementById("experience-min").value;
   const messageTone = document.getElementById("message-tone").value;

   const response = await fetch("http://127.0.0.1:8000/api/campaigns/", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
         role: roleId,
         target_skills: targetSkills,
         target_location: targetLocation,
         experience_min: experienceMin,
         message_tone: messageTone
      })
   });

   const campaign = await response.json();

   await chrome.storage.local.set({ campaignID: campaign.id })
   await chrome.storage.local.set({ role_id: roleId})
})

generateButton.addEventListener("click", async() =>{
   const {campaignID} = await chrome.storage.local.get("campaignID");
   const { role_id } = await chrome.storage.local.get("role_id")
   const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
   const profile = await chrome.tabs.sendMessage(tab.id, { action: "getProfile"});

   const body = {
      profileText: profile.profileText,
      linkedin_url: profile.linkedin_url,
      role: role_id,
      campaign_id: campaignID
   }

   const response = await fetch("http://127.0.0.1:8000/api/generate-message/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
   })

   const data = await response.json();
   matchScore.textContent = data.candidate.match_score;
   message.textContent = data.message;
})