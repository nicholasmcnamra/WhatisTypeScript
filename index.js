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
    var w = document.getElementById("word");
    var d = document.getElementById("definition");
    var phonetic = document.getElementById("phonetic");
    w.innerHTML = data[0].word;
    d.innerHTML = data[0].meanings[2].definitions[0].definition;
    phonetic.innerHTML = data[0].phonetics[1].text;
    console.log(data[0]);
    // let p = document.createElement("p");
    // let w = document.createElement("p");
    // mainContainer.appendChild(w);
    // mainContainer.appendChild(p);
}
