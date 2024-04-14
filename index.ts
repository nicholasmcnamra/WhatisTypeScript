// Import stylesheets
// import './style.css';

const form: HTMLFormElement = document.querySelector('#defineform')!;

form.onsubmit = () => {
  const formData = new FormData(form);

  const text = formData.get('defineword') as string;
  console.log(text);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        appendData(data);
    })
    
    .catch(function(err) {
        console.log('error: ' + err);
    })
  return false; // prevent reload
};

function appendData(data) {
    let mainContainer = document.getElementById("quotes")!;

    let word = document.getElementById("word")!;
    let definition = document.getElementById("definition")!;
    let phonetics = document.getElementById("phonetic");
    let synonyms = document.getElementById("synonyms");
    // let antonyms = document.getElementById("antonyms");
    let audio = document.getElementById("audio")as HTMLAudioElement;
    let audioSource = document.getElementById("audioSource") as HTMLSourceElement;

    console.log(data[0]);


    //word**************************
    word.innerHTML = data[0].word;

    //phonetics *************
    let phoneticFound = false;
  
    for (let i = 0; i < data[0].phonetics.length; i++) {
    if (data[0].phonetics[i].text) {
      phonetics.innerHTML = data[0].phonetics[i].text;
      phoneticFound = true;
      break;
    }
  }
  if (!phoneticFound) {
    phonetics.innerHTML = "N/A";
  }

  //definitions******************
  let definitionFound = false;

for (let i = 0; i < data[0].meanings.length; i++){
  if(data[0].meanings[i].definitions[0].definition){
    definition.innerHTML = data[0].meanings[i].definitions[0].definition;
    definitionFound = true;
    break;
  }
}
if (!definitionFound) {
  definition.innerHTML = "N/A";
}


//synonyms*************************
synonyms.innerHTML = "";

 for(let i = 0; i < data[0].meanings.length; i++){
  if(data[0].meanings[i].synonyms[0]){
    let synonymsThing = document.createElement("li");
    synonymsThing.textContent = data[0].meanings[i].synonyms;
    synonyms.appendChild(synonymsThing);
  }
 }

//antonyms*************************
// antonyms.innerHTML = "";
// if (data[0].meanings[0].antonyms != null) {

// for (let i = 0; i < data[0].meanings.length; i++) {
//     if (data[0].meanings[i].anytonyms[0]) {
//         let antonymsThing = document.createElement("li");
//         antonymsThing.textContent = data[0].meanings[i].antonyms;
//         antonyms.appendChild(antonymsThing);
//     }
// }}

 let audioFound = false;
  
 for (let i = 0; i < data[0].phonetics.length; i++) {
 if (data[0].phonetics[i].audio) {
   audioSource.src = data[0].phonetics[i].audio;
   audio.load();
   audioFound = true;
   break;
 }
}
if (!audioFound) {
 audio.innerHTML = "N/A";
}
}

