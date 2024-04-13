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

    let w = document.getElementById("word")!;
    let d = document.getElementById("definition")!;
    let phonetic = document.getElementById("phonetic");

    w.innerHTML = data[0].word;
    d.innerHTML = data[0].meanings[2].definitions[0].definition;
    phonetic.innerHTML = data[0].phonetics[1].text;


    console.log(data[0]);


    // let p = document.createElement("p");
    // let w = document.createElement("p");
    // mainContainer.appendChild(w);
    // mainContainer.appendChild(p);
}

