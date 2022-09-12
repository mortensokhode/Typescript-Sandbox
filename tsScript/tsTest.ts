'use strict'
import fetchGithubData from "./readGithubdata.js"
import { douglasAdams } from "./textConstants.js"

// DOM elements are for a great part done here, some elements are generated
// further down, closer to it's actual use.
//  --------------------------------------------------------------
const toggle01Btn:HTMLElement = document.getElementById('toggle01-btn')
const toggle02Btn:HTMLElement = document.getElementById('toggle02-btn')
const errorMsg:HTMLElement = document.getElementById('error-msg')
const audioMsgElm:HTMLElement = document.getElementById('audiomsg-elm')
const referenceElm:HTMLElement = document.getElementById('reference-elm')
// const seasonInput:HTMLElement = document.getElementById('season-inp')
const seasonInput:HTMLInputElement = document.querySelector('#season-inp')
const seasontextElm:HTMLElement = document.getElementById('seasontext-elm')
const audioSourceElm:HTMLElement = document.getElementById('audiosource-elm')
const pageHeadingElm:HTMLElement = document.getElementById('pageheading-elm')
const videoSourceElm:HTMLElement = document.getElementById('videosource-elm')
const audiovisualElm:HTMLElement = document.getElementById('audiovisual-div')
const textbasedElm:HTMLElement = document.getElementById('textbased-div')
const invbuttonElm:HTMLElement = document.getElementById('invbutton-elm')
const botframesectElm:HTMLElement = document.getElementById('botframesect-elm')
const outerframeElm:HTMLElement = document.getElementById('outerframe-elm')
const oppgavesection4Elm:HTMLElement = document.getElementById('oppgavesection4-elm')
const topAndroidElm:HTMLElement = document.getElementById('topframe-elm')
const avatarElm:HTMLElement = document.getElementById('avatar-elm')
const oppgavesection2Elm:HTMLElement = document.getElementById('oppgavesection2-elm')
const oppgavesection3Elm:HTMLElement = document.getElementById('oppgavesection3-elm')

console.log("seasonInput: ", seasonInput)

type tGithubHeader = {
  name?: string;
  public_repos?: number;
  avatar_url?: string;
  html_url?: string;
  created_at?: Date;
  updated_at?: Date; 
  repos_url?: string;
  email?: string;
 } 
  
type tGithubDetails = {
  name?: string;
  full_name?: string;
  url?: string;
  created_at?: Date; 
  updated_at?: Date; 
  visibility?: string;
  default_branch?: string; 
  size?: number;
  language?: string; 
  languages_url?: string;
} 

const detailsArray:Array<tGithubDetails> = []
const bHeader:boolean = true
const myUrl:string = 'https://api.github.com/users/mortensokhode'
const myHeader = await fetchGithubData(myUrl);
const gitRepos:string = myHeader['repos_url']
const myDetails = await fetchGithubData(gitRepos);

// Global vars 
let currentWindow:string = location.pathname.slice(1) 
let detailWrkObj:Object = {}

//  --------------------------------------------------------------
// Program Main:
//  --------------------------------------------------------------
renderRepositoryData(myHeader, myDetails)
pageHeadingElm.textContent = `Current page:  ${currentWindow}`
// console.log('textbasedElm.children: ', textbasedElm.children)
// Toggle buttons initial textContent
toggle01Btn.textContent  = 'Audiovisual page'
toggle02Btn.textContent  = 'Toggle error msg'

// Used prior to this exercise, and still used  for the audio visual part
seasontextElm.innerHTML = `The text will reflect the chosen season.<br><br> ...and btw, chosen season will provide a matching piece of music to be played.`

referenceElm.innerHTML = `Performed by: <a href='https://freemusicarchive.org/music/John_Harrison_with_the_Wichita_State_University_Chamber_Players/' target='_blank'>John Harrison with the Wichita State University Chamber Players</a><br>
  Provided by: <a href='https://freemusicarchive.org/home' target='_blank'>Free Music Archive</a><br>
  Licensed: <a href='https://creativecommons.org/licenses/by-sa/3.0/' target='_blank'>CC BY-SA</a>`

  // this one is just an old friend still joining our company
errorMsg.innerHTML = `ERROR for Christ's sake!!!!  <span class='subText'>
  pretty stupid reference for an atheist, but nevertheless..</span><br><br> Not if (but when) shit happens, the error message will display itself here. This line is extended to see what happens when line breaks have to be used. This dodgy text is found in the bible of the Nonsensical, a guide to the outer space of mental activities.`

//  --------------------------------------------------------------
// Event listeners 
//  --------------------------------------------------------------
// toggle between the display of text based page and audio visual page
toggle01Btn.addEventListener('click', function() {
  let buttonText:string = ''
  buttonText = (toggleVisibility(textbasedElm, 'flex') == 'none') ? 'Text page' : 'Audiovisual page'
  toggleVisibility(audiovisualElm, 'flex')
  toggleVisibility(outerframeElm, 'block')
  toggle01Btn.textContent = buttonText
})

// toggle an error message example - visual message on/off
toggle02Btn.addEventListener('click', function() {
  toggleVisibility(errorMsg, 'block')
})

// ----------------------------------------------
// Event listeners for audiovisual part
// ----------------------------------------------
// clean up element value when it gets focus
seasonInput.addEventListener('focus', () => {
  seasonInput.value='' 
})

// do some magic to text, audio & visuals when season is changed. Also loose focus (blur). Function process_Season is responsible for the actual processing
seasonInput.addEventListener('change', function() {
  const colorVar:string = process_Season(seasonInput.value)

  seasontextElm.style.color = colorVar
  audioMsgElm.style.color = colorVar
  seasonInput.blur()
  seasontextElm.innerHTML = ` Color fit for ${seasonInput.value} is reflected in this text.<br><br> ...and btw, click on play below to play matching music.`
})

invbuttonElm.addEventListener('mouseover', ()=> {
  botframesectElm.textContent = douglasAdams
  toggleVisibility(botframesectElm, 'block')
})

invbuttonElm.addEventListener('mouseleave', () => {
  botframesectElm.textContent = ''
  toggleVisibility(botframesectElm, 'block')
})

//  --------------------------------------------------------------
// Functions defined below
//  --------------------------------------------------------------

// Write stuff to a HTML section identified by sectionElm. textContent is self-explanatory and elementType represents HTML tag
function addOppgaveContent(sectionElm:HTMLElement, textContent:string, elementType:string):void {
  elementType = (elementType === '') ? 'p' : elementType
  const sectionContentElm:HTMLElement = document.createElement(elementType)
  sectionContentElm.innerHTML = textContent
  sectionElm.appendChild(sectionContentElm)
}

function process_Season(season:string):string {
  audioMsgElm.innerHTML = `<br><strong>Note:</strong> ` //Initial value
  referenceElm.style.display='block'

  switch(season.toLowerCase()){
      case 'vinter':
      case 'winter':
            audioSourceElm.setAttribute('src', 'audio/Winter Mvt 2 Largo.mp3');
            audioMsgElm.innerHTML += `Le quattro stagioni: Winter (Concerto No. 4 in F Minor) Largo`
            videoSourceElm.setAttribute('src', 'https://www.youtube.com/embed/YN8VpT4rJuY')
        
        return 'var(--crispyWhite)'
      // the ubiquitous break will never be reached hence it i dropped
      case 'spring':
      case 'vår':
            audioSourceElm.setAttribute('src', 'audio/Spring Mvt 1 Allegro.mp3')
            audioMsgElm.innerHTML += `Le quattro stagioni: Spring (Concerto No. 1 in E Major) Allegro`
            videoSourceElm.setAttribute('src', 'https://www.youtube.com/embed/e3nSvIiBNFo')
        return 'var(--springGreen)'
      case 'sommer':
      case 'summer':
            audioSourceElm.setAttribute('src', 'audio/Summer Mvt 3 Presto.mp3')
            audioMsgElm.innerHTML += `Le quattro stagioni: Summer (Concerto No. 2 in G Minor) Adagio`
            videoSourceElm.setAttribute('src', 'https://www.youtube.com/embed/I9yU8tDTGk8')
        return 'var(--goldenSummer)'
      case 'høst':
      case 'autumn':
      case 'fall':
            audioSourceElm.setAttribute('src', 'audio/Autumn Mvt 1 Allegro.mp3')
            audioMsgElm.innerHTML += `Le quattro stagioni: Autumn (Concerto No. 3 in F Major)  Allegro`
            videoSourceElm.setAttribute('src', 'https://www.youtube.com/embed/QUPo5OBnZk0')
            return 'var(--brownish)'
      default:
            audioSourceElm.setAttribute('src', '')
            videoSourceElm.setAttribute('src', '')
            toggleVisibility(referenceElm, 'none')

            return 'var(--theDarkside)'
  }
}

// This function uses the ternary operator
function toggleVisibility(sDOMelement:HTMLElement, attributeValue:string):string {
  // Ternaries
    let displayOff:boolean = (sDOMelement.style.display == 'none') ? true : false
    let displaySetting:string = (displayOff) ? attributeValue : 'none'
    
    sDOMelement.style.display = displaySetting
    return displaySetting
}

function cleanupGithubObjectData(object2clean:Object, bHeaderdata:boolean):Object {

  if (bHeaderdata) {
    let returnObject:tGithubHeader = {name: object2clean['name'],
                                      public_repos: object2clean['public_repos'],
                                      avatar_url: object2clean['avatar_url'],
                                      html_url: object2clean['html_url'],
                                      created_at: object2clean['created_at'], 
                                      updated_at: object2clean['updated_at'], 
                                      repos_url: object2clean['repos_url'],
                                      email: object2clean['email'] }
    return returnObject
  }
                                  
  if (!bHeaderdata) {
    for (let i = 0; i < Object.getOwnPropertyNames(object2clean).length-1; i++ ) {
      detailWrkObj = object2clean[i]

      detailsArray.push({name: detailWrkObj['name'],
                      full_name: detailWrkObj['full_name'],
                      url: detailWrkObj['url'],
                      visibility: detailWrkObj['visibility'],
                      created_at: detailWrkObj['created_at'], 
                      updated_at: detailWrkObj['updated_at'], 
                      default_branch: detailWrkObj['default_branch'],
                      size: detailWrkObj['size'], 
                      language: detailWrkObj['language'],
                      languages_url: detailWrkObj['languages_url']
                    })
      }
    return detailsArray
  }
}

function renderRepositoryData(reposHeader:{}, reposDetails:{}):void {
  let oGithubHeader:tGithubHeader  = {}
  let oGithubDetails:tGithubDetails = {}
  let elementSubset:HTMLElement

  oGithubHeader = cleanupGithubObjectData(reposHeader, bHeader)
    
  // show off in the 'Android' window
  avatarElm.setAttribute('src', oGithubHeader.avatar_url)

  // prepare the headerString to be rendered
  var newSectionDoc = document.createElement('section')
  newSectionDoc.setAttribute('class', 'githubHeader')
  topAndroidElm.appendChild(newSectionDoc)

  elementSubset = returnElement('ul', null, null, "githubList",null,null)
  newSectionDoc.append(elementSubset)
  elementSubset = returnElement('li', null, `Antall repositories: ${oGithubHeader.public_repos}`, null, null, null)
  newSectionDoc.append(elementSubset)
  elementSubset = returnElement('li', null, `Url: ${oGithubHeader.html_url}`, null, null, null)
  newSectionDoc.append(elementSubset)
  elementSubset = returnElement('li', null, `Opprettet dato: ${oGithubHeader.created_at}`, null, null, null)
  newSectionDoc.append(elementSubset)
  elementSubset = returnElement('li', null, `Oppdatert dato: ${oGithubHeader.updated_at}`, null, null, null)
  newSectionDoc.append(elementSubset)
  elementSubset = returnElement('li', null, `Repository url: ${oGithubHeader.repos_url}`, null, null, null)
  newSectionDoc.append(elementSubset)
  elementSubset = returnElement('li', null, `Email: ${oGithubHeader.email}`, null, null, null)
  newSectionDoc.append(elementSubset)
  
  topAndroidElm.appendChild(newSectionDoc)

  // And now we go for the repositories...
  oGithubDetails = cleanupGithubObjectData(reposDetails, !bHeader)
  
  // loop through the repositories 
  for (let i = 0; i < Object.getOwnPropertyNames(oGithubDetails).length-1; i++ ) {
    var newSectionDoc = document.createElement('section')
    newSectionDoc.setAttribute('class', 'githubDetails')
    oppgavesection4Elm.appendChild(newSectionDoc)

    elementSubset = returnElement('h1', null, oGithubDetails[i].name)
    newSectionDoc.append(elementSubset)

    elementSubset = returnElement('ul', null, null, 'githubList', 'gitdetailsId')
    newSectionDoc.append(elementSubset)

    elementSubset = returnElement('li', 'Url: ', oGithubDetails[i].url, null, 'generateId', i)
    newSectionDoc.append(elementSubset)
    elementSubset = returnElement('li', 'Created: ', oGithubDetails[i].created_at, null, 'generateId', i)
    newSectionDoc.append(elementSubset)
    elementSubset = returnElement('li', 'Updated: ', oGithubDetails[i].updated_at, null, 'generateId', i)
    newSectionDoc.append(elementSubset)
    elementSubset = returnElement('li', 'Visibility: ', oGithubDetails[i].visibility, null, 'generateId', i)
    newSectionDoc.append(elementSubset)
    elementSubset = returnElement('li', 'Default branch: ', oGithubDetails[i].default_branch, null, 'generateId', i)
    newSectionDoc.append(elementSubset)
    elementSubset = returnElement('li', 'Size: ', oGithubDetails[i].size, null, 'generateId', i)
    newSectionDoc.append(elementSubset)
    elementSubset = returnElement('li', 'Main language: ', oGithubDetails[i].language, null, 'generateId', i)
    newSectionDoc.append(elementSubset)
    elementSubset = returnElement('li', 'Languages: ', oGithubDetails[i].languages_url, null, 'generateId', i)
    newSectionDoc.append(elementSubset)

    oppgavesection4Elm.appendChild(newSectionDoc)
  }
}

function returnElement(elementType:string, 
                       leadText?:string,
                       dataString?:string, 
                       className?:string,
                       idName?:string,
                       iterator?:number):HTMLElement {

 leadText = (leadText) ? leadText : ''
 dataString = (dataString) ? dataString : ''

 let returnElement:HTMLElement
if (idName === 'generateId') {
  idName = leadText + iterator.toString
}                       

returnElement = document.createElement(elementType);
if (idName) returnElement.setAttribute('id', idName);
if (className) returnElement.setAttribute('class', className);

returnElement.innerHTML = `${leadText} ${dataString}`
return returnElement
}


// Write stuff to a HTML section identified by sectionElm. textContent is self-explanatory and elementType represents HTML tag
function generateElement(contentString:string):DocumentFragment {
  let templateDoc = document.createElement('template');
  if( templateDoc.content ){
    templateDoc.innerHTML = contentString;
 }

  let parser = new DOMParser();
  let htmlDoc = parser.parseFromString(contentString, "text/html")  // denne gir ie egentlig et fragment, men et fullverdig html-dokument

   let docFragment = document.createDocumentFragment();
   docFragment.appendChild(htmlDoc.documentElement);

  return docFragment;
}




export {}
