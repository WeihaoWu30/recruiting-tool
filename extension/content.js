// Runs automatically on every LinkedIn profile page.
// Grabs the rendered profile text and the URL, then hands them off
// to the backend (where Gemini extracts structured fields + scores the match).

function extractProfileData() {
   const section = document.querySelector('section[aria-label="Primary content"]');
   const profileText = section?.innerText?.trim() || '';
   const linkedin_url = window.location.href.split('?')[0];

   return { linkedin_url, profileText };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if (request.action === "getProfile") {
     sendResponse(extractProfileData());
   }
 });