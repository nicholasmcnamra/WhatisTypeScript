// Import stylesheets
// import './style.css';
var form = document.querySelector('#defineform');
form.onsubmit = function () {
    var formData = new FormData(form);
    var text = formData.get('defineword');
    console.log(text);
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/".concat(text))
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        appendData(data);
    })
        .catch(function (err) {
        console.log('error: ' + err);
    });
    return false; // prevent reload
};
function appendData(data) {
    var mainContainer = document.getElementById("quotes");
    var word = document.getElementById("word");
    var definition = document.getElementById("definition");
    var phonetics = document.getElementById("phonetic");
    var synonyms = document.getElementById("synonyms");
    var antonyms = document.getElementById("antonyms");
    var audio = document.getElementById("audio");
    var audioSource = document.getElementById("audioSource");
    console.log(data[0]);
    //word**************************
    word.innerHTML = data[0].word;
    //phonetics *************
    var phoneticFound = false;
    for (var i = 0; i < data[0].phonetics.length; i++) {
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
    var definitionFound = false;
    for (var i = 0; i < data[0].meanings.length; i++) {
        if (data[0].meanings[i].definitions[0].definition) {
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
    if (data[0].meanings[0].synonyms[0]) {
        synonyms.innerText = "Synonyms";
        for (var i = 0; i < data[0].meanings.length; i++) {
            if (data[0].meanings[i].synonyms[0]) {
                var synonymsThing = document.createElement("li");
                synonymsThing.textContent = data[0].meanings[i].synonyms;
                synonyms.appendChild(synonymsThing);
            }
        }
    }
    //antonyms*************************
    antonyms.innerHTML = "";
    if (data[0].meanings[0].antonyms[0]) {
        antonyms.innerText = "Antonyms";
        for (var i = 0; i < data[0].meanings.length; i++) {
            if (data[0].meanings[i].anytonyms[0]) {
                var antonymsThing = document.createElement("li");
                antonymsThing.textContent = data[0].meanings[i].antonyms;
                antonyms.appendChild(antonymsThing);
            }
        }
    }
    var audioFound = false;
    for (var i = 0; i < data[0].phonetics.length; i++) {
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
