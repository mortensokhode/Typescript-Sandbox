'use strict';
import fetchGithubData from "./readGithubdata.js";
import { douglasAdams } from "./textConstants.js";
const outerframeElm = document.getElementById('outerframe-elm');
const oppgavesection4Elm = document.getElementById('oppgavesection4-elm');
const topAndroidElm = document.getElementById('topframe-elm');
const oppgavesection2Elm = document.getElementById('oppgavesection2-elm');
const oppgavesection3Elm = document.getElementById('oppgavesection3-elm');
const detailsArray = [];
const bHeader = true;
const myUrl = 'https://api.github.com/users/mortensokhode';
const myHeader = await fetchGithubData(myUrl);
let detailWrkObj = {};
const gitRepos = myHeader['repos_url'];
const myDetails = await fetchGithubData(gitRepos);
const avatarElm = document.getElementById('avatar-elm');
let detailsObject;
renderRepositoryData(myHeader, myDetails);
// DOM elements are for a great part done here, some elements are generated
// further down, closer to it's actual use.
//  --------------------------------------------------------------
const toggle01Btn = document.getElementById('toggle01-btn');
const toggle02Btn = document.getElementById('toggle02-btn');
const errorMsg = document.getElementById('error-msg');
const audioMsgElm = document.getElementById('audiomsg-elm');
const referenceElm = document.getElementById('reference-elm');
const seasonInput = document.getElementById('season-inp');
const seasontextElm = document.getElementById('seasontext-elm');
const audioSourceElm = document.getElementById('audiosource-elm');
const pageHeadingElm = document.getElementById('pageheading-elm');
const videoSourceElm = document.getElementById('videosource-elm');
const audiovisualElm = document.getElementById('audiovisual-div');
const textbasedElm = document.getElementById('textbased-div');
const invbuttonElm = document.getElementById('invbutton-elm');
const botframesectElm = document.getElementById('botframesect-elm');
// Global vars 
let currentWindow = location.pathname.slice(1);
//  --------------------------------------------------------------
// Program Main:
//  --------------------------------------------------------------
pageHeadingElm.textContent = `Current page:  ${currentWindow}`;
// Toggle buttons initial textContent
toggle01Btn.textContent = 'Audiovisual page';
toggle02Btn.textContent = 'Toggle error msg';
// Used prior to this exercise, and still used  for the audio visual part
seasontextElm.innerHTML = `The text will reflect the chosen season.<br><br> ...and btw, chosen season will provide a matching piece of music to be played.`;
referenceElm.innerHTML = `Performed by: <a href='https://freemusicarchive.org/music/John_Harrison_with_the_Wichita_State_University_Chamber_Players/' target='_blank'>John Harrison with the Wichita State University Chamber Players</a><br>
  Provided by: <a href='https://freemusicarchive.org/home' target='_blank'>Free Music Archive</a><br>
  Licensed: <a href='https://creativecommons.org/licenses/by-sa/3.0/' target='_blank'>CC BY-SA</a>`;
// this one is just an old friend still joining our company
errorMsg.innerHTML = `ERROR for Christ's sake!!!!  <span class='subText'>
  pretty stupid reference for an atheist, but nevertheless..</span><br><br> Not if (but when) shit happens, the error message will display itself here. This line is extended to see what happens when line breaks have to be used. This dodgy text is found in the bible of the Nonsensical, a guide to the outer space of mental activities.`;
//  --------------------------------------------------------------
// Event listeners 
//  --------------------------------------------------------------
// toggle between the display of text based page and audio visual page
toggle01Btn.addEventListener('click', function () {
    let buttonText = '';
    buttonText = (toggleVisibility(textbasedElm, 'flex') == 'none') ? 'Text page' : 'Audiovisual page';
    toggleVisibility(audiovisualElm, 'flex');
    toggleVisibility(outerframeElm, 'block');
    toggle01Btn.textContent = buttonText;
});
// toggle an error message example - visual message on/off
toggle02Btn.addEventListener('click', function () {
    toggleVisibility(errorMsg, 'block');
});
// ----------------------------------------------
// Event listeners for audiovisual part
// ----------------------------------------------
// clean up element value when it gets focus
seasonInput.addEventListener('focus', () => {
    seasonInput.nodeValue = '';
});
// do some magic to text, audio & visuals when season is changed. Also loose focus (blur). Function process_Season is responsible for the actual processing
seasonInput.addEventListener('change', function () {
    const colorVar = process_Season(seasonInput.nodeValue);
    seasontextElm.style.color = colorVar;
    audioMsgElm.style.color = colorVar;
    seasonInput.blur();
    seasontextElm.innerHTML = ` Color fit for ${seasonInput.nodeValue} is reflected in this text.<br><br> ...and btw, click on play below to play matching music.`;
});
invbuttonElm.addEventListener('mouseover', () => {
    botframesectElm.textContent = douglasAdams;
    toggleVisibility(botframesectElm, 'block');
});
invbuttonElm.addEventListener('mouseleave', () => {
    botframesectElm.textContent = '';
    toggleVisibility(botframesectElm, 'block');
});
//  --------------------------------------------------------------
// Functions defined below
//  --------------------------------------------------------------
// Write stuff to a HTML section identified by sectionElm. textContent is self-explanatory and elementType represents HTML tag
function addOppgaveContent(sectionElm, textContent, elementType) {
    elementType = (elementType === '') ? 'p' : elementType;
    const sectionContentElm = document.createElement(elementType);
    sectionContentElm.innerHTML = textContent;
    sectionElm.appendChild(sectionContentElm);
}
// do some stuff to audio & visual parts through use of a switch construction. Multiple case elements are used to handle norwegian, english (uk) and english (am)
// default values at 'failure to match' cleans up some element content
function process_Season(season) {
    audioMsgElm.innerHTML = `<br><strong>Note:</strong> `; //Initial value
    referenceElm.style.display = 'block';
    switch (season.toLowerCase()) {
        case 'vinter':
        case 'winter':
            audioSourceElm.setAttribute('src', 'audio/Winter Mvt 2 Largo.mp3');
            audioMsgElm.innerHTML += `Le quattro stagioni: Winter (Concerto No. 4 in F Minor) Largo`;
            videoSourceElm.setAttribute('src', 'https://www.youtube.com/embed/YN8VpT4rJuY');
            return 'var(--crispyWhite)';
        // the ubiquitous break will never be reached hence it i dropped
        case 'spring':
        case 'vår':
            audioSourceElm.setAttribute('src', 'audio/Spring Mvt 1 Allegro.mp3');
            audioMsgElm.innerHTML += `Le quattro stagioni: Spring (Concerto No. 1 in E Major) Allegro`;
            videoSourceElm.setAttribute('src', 'https://www.youtube.com/embed/e3nSvIiBNFo');
            return 'var(--springGreen)';
        case 'sommer':
        case 'summer':
            audioSourceElm.setAttribute('src', 'audio/Summer Mvt 3 Presto.mp3');
            audioMsgElm.innerHTML += `Le quattro stagioni: Summer (Concerto No. 2 in G Minor) Adagio`;
            videoSourceElm.setAttribute('src', 'https://www.youtube.com/embed/I9yU8tDTGk8');
            return 'var(--goldenSummer)';
        case 'høst':
        case 'autumn':
        case 'fall':
            audioSourceElm.setAttribute('src', 'audio/Autumn Mvt 1 Allegro.mp3');
            audioMsgElm.innerHTML += `Le quattro stagioni: Autumn (Concerto No. 3 in F Major)  Allegro`;
            videoSourceElm.setAttribute('src', 'https://www.youtube.com/embed/QUPo5OBnZk0');
            return 'var(--brownish)';
        default:
            audioSourceElm.setAttribute('src', '');
            videoSourceElm.setAttribute('src', '');
            toggleVisibility(referenceElm, 'none');
            return 'var(--theDarkside)';
    }
}
// This function uses the ternary operator
function toggleVisibility(sDOMelement, attributeValue) {
    // Ternaries
    let displayOff = (sDOMelement.style.display == 'none') ? true : false;
    let displaySetting = (displayOff) ? attributeValue : 'none';
    sDOMelement.style.display = displaySetting;
    return displaySetting;
}
function cleanupGithubObjectData(object2clean, bHeaderdata) {
    if (bHeaderdata) {
        let returnObject = { name: object2clean['name'],
            public_repos: object2clean['public_repos'],
            avatar_url: object2clean['avatar_url'],
            html_url: object2clean['html_url'],
            created_at: object2clean['created_at'],
            updated_at: object2clean['updated_at'],
            repos_url: object2clean['repos_url'],
            email: object2clean['email'] };
        return returnObject;
    }
    if (!bHeaderdata) {
        for (let i = 0; i < Object.getOwnPropertyNames(object2clean).length - 1; i++) {
            detailWrkObj = object2clean[i];
            detailsObject = { name: detailWrkObj['name'],
                full_name: detailWrkObj['full_name'],
                url: detailWrkObj['url'],
                visibility: detailWrkObj['visibility'],
                created_at: detailWrkObj['created_at'],
                updated_at: detailWrkObj['updated_at'],
                default_branch: detailWrkObj['default_branch'],
                size: detailWrkObj['size'],
                language: detailWrkObj['language'],
                languages_url: detailWrkObj['languages_url']
            };
            detailsArray.push(detailsObject);
        }
        return detailsArray;
    }
}
function renderRepositoryData(reposHeader, reposDetails) {
    let oGithubHeader = {};
    let oGithubDetails = {};
    oGithubHeader = cleanupGithubObjectData(reposHeader, bHeader);
    // show off in the 'Android' window
    avatarElm.setAttribute('src', oGithubHeader.avatar_url);
    // prepare the headerString to be rendered
    let headerString = `
  <section class="githubHeader">
  <img src="${oGithubHeader.avatar_url}" alt="github avatar" class="smallAvatar"> <span class="tightHeading"><h1>${oGithubHeader.name}</h1></span>
      <ul class="githubList">
        <li> <span class="uthevetSkrift">Antall repositories:</span> ${oGithubHeader.public_repos}</li> 
        <li> <span class="uthevetSkrift">Url:</span> ${oGithubHeader.html_url}</li>
        <li> <span class="uthevetSkrift">Opprettet dato:</span> ${oGithubHeader.created_at}</li> 
        <li> <span class="uthevetSkrift">Oppdatert dato:</span> ${oGithubHeader.updated_at}</li> 
        <li> <span class="uthevetSkrift">Repository url:</span> ${oGithubHeader.repos_url}</li>
        <li> <span class="uthevetSkrift">Email:</span> ${oGithubHeader.email}</li>
      </ul>
  </section>`;
    // generate document fragment based on headerString
    let headerFragment = generateElement(headerString);
    // append the header document fragment to 'oppgavesection3Elm'
    oppgavesection3Elm.appendChild(headerFragment);
    // And now we go for the repositories...
    let detailsFragment;
    let detailsString;
    oGithubDetails = cleanupGithubObjectData(reposDetails, !bHeader);
    // loop through the repositories 
    for (let i = 0; i < Object.getOwnPropertyNames(oGithubDetails).length - 1; i++) {
        // establish the details string to render. I'm using var due to the fact that 'var' 
        // accepts redeclaring.
        detailsString = `
      <section class="githubDetails">
      <h1>${oGithubDetails[i].name}</h1>
        <ul class="githubList">
            <li> <span class="uthevetSkrift">Url:</span> <a href="${oGithubDetails[i].url}" target="_blank">${oGithubDetails[i].full_name}</a></li>
            <li> <span class="uthevetSkrift">Created:</span> ${oGithubDetails[i].created_at}</li> 
            <li> <span class="uthevetSkrift">Updated:</span> ${oGithubDetails[i].updated_at}</li> 
            <li> <span class="uthevetSkrift">Visibility:</span> ${oGithubDetails[i].visibility}</li> 
            <li> <span class="uthevetSkrift">Default branch:</span> ${oGithubDetails[i].default_branch}</li>
            <li> <span class="uthevetSkrift">Size:</span> ${oGithubDetails[i].size}</li>
            <li> <span class="uthevetSkrift">Main language:</span> ${oGithubDetails[i].language}</li>
            <li> <span class="uthevetSkrift">Languages:</span>  <a href="${oGithubDetails[i].languages_url}" target="_blank">Just another link</a></li>
        </ul>
      </section>`;
        detailsFragment = generateElement(detailsString);
        oppgavesection4Elm.appendChild(detailsFragment);
    }
}
// Write stuff to a HTML section identified by sectionElm. textContent is self-explanatory and elementType represents HTML tag
function generateElement(contentString) {
    let templateDoc = document.createElement('template');
    if (templateDoc.content) {
        templateDoc.innerHTML = contentString;
    }
    let parser = new DOMParser();
    // let htmlDoc = parser.parseFromString(contentString, "text/html")  // denne gir ie egentlig et fragment, men et fullverdig html-dokument
    let htmlDoc = parser.parseFromString(contentString, "text/xml");
    console.log('htmlDoc: ', htmlDoc);
    let docFragment = document.createDocumentFragment();
    docFragment.appendChild(htmlDoc.documentElement);
    console.log('htmlDoc: ', htmlDoc);
    return docFragment;
}
