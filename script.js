const form = document.querySelector('form');

const resultDiv = document.querySelector('.result');

form.addEventListener('submit',(e)=>{
     e.preventDefault();
     getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word)=>{
    try {
      
    
      
    resultDiv.innerHTML = "Fetching Data..."
    
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    
    const data = await  response.json();

     let definitions = data[0].meanings[0].definitions[0];

       resultDiv.innerHTML = `
           <h2><strong>Word: </strong>${data[0].word}</h2>
           <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
           <p class="phonetic">${data[0].phonetic}</p>
           <p><strong>Meaning:   </strong>${definitions.definition === undefined ? "Not Found" :        definitions.definition}</p>
           <p><strong>Example:   </strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
           <p><strong>Synonyms:</strong>${data[0].meanings[0].synonyms.length === 0 ? "Not Found":data[0].meanings[0].synonyms }</p>
          
          
         `;
       

       // Fetching Antonyms
        if(data[0].meanings[0].antonyms.length === 0 ) 
        {
          resultDiv.innerHTML += `<p><strong>Antonyms:</strong></p>
          <span>Not Found</span>`;
        }

        else{
          resultDiv.innerHTML += ` <p><strong>Antonyms:</strong></p>`
          for(let i=0; i<data[0].meanings[0].antonyms.length; i++)
          {
            resultDiv.innerHTML += `<li>${data[0].meanings[0].antonyms[i]}</li>`
          }
        }


        // Adding Read More Option
           resultDiv.innerHTML += `<div><a href = "${data[0].sourceUrls}" target="_blank">Read More </a></div>`;
          } 
    
           catch (error) {
            resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`
          }
      
        console.log(data);
    
}