// Captures loading span
const spinnerSpan = document.getElementById('loading-spinner');

// Generating spinner and hide it by default
const spinningUrl = '../assets/img/spinning-loading.gif';
let loadingSpinner = document.createElement('img');
loadingSpinner.setAttribute('width', '32');
loadingSpinner.setAttribute('height', '32');
loadingSpinner.setAttribute('src', spinningUrl);
loadingSpinner.style.marginTop = '15px';
spinnerSpan?.appendChild(loadingSpinner);
spinnerSpan?.classList.add('d-none');

// Generates questions
async function generateQuestions() {

    //Hides the spinning element
    spinnerSpan.classList.add('d-none');

    const url = `${BASE_API_URL}/questions/generate`;

    const context = document.getElementById('formPrompt').value;

    const token = localStorage.getItem(TOKEN_KEY);
    
    if(!context)
    {
        alert('Please, type in your instruction.');
        return;
    }

    // Shows the spinning span
    spinnerSpan.classList.remove('d-none');

    // Http call
    const response = await fetch(url, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json" 
        },
        body: JSON.stringify({ "context": context })
    });

    const resJson = await response.json();

    if(!response.ok) 
    {
        alert(resJson.message);
    }
    else
    {
        document.getElementById('card-questions').classList.remove('d-none');
        
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < resJson.length; i++) {
            const question = resJson[i];
            
            // Create a new line
            let row = document.createElement('tr');
            row.setAttribute('id', `question_${i}`);
            
            // Create a cell for question
            let cellQuestion = document.createElement('td');
            cellQuestion.textContent = question;

            // Create a cell for answer
            let iconAnswer = document.createElement('i');
            iconAnswer.classList.add('bi', 'bi-chat-left-dots-fill');
            iconAnswer.addEventListener('click', (event) => generateAnswers(i));
            // iconAnswer.addEventListener('click', (event) => {
            //     alert(document.querySelector(`#question_${i} td:nth-child(1)`).innerHTML);
            // });
            let cellAnswer = document.createElement('td');
            cellAnswer.appendChild(iconAnswer);

            // Create a icon for action
            let iconAction = document.createElement('i');
            iconAction.classList.add('bi', 'bi-check2-square');
            let cellAction = document.createElement('td');
            cellAction.appendChild(iconAction);

            // Appending rows 
            row.appendChild(cellQuestion);
            row.appendChild(cellAnswer);
            row.appendChild(cellAction);
            document.getElementById('body-questions-answers').appendChild(row);
        }

        // Hides the spinning span
        spinnerSpan.classList.add('d-none');
    }
}

// Generate answers ad-hoc
async function generateAnswers(index) {
    //alert(document.querySelector(`#question_${index} td:nth-child(1)`).innerHTML);

    const token = localStorage.getItem(TOKEN_KEY);

    const url = `${BASE_API_URL}/questions/generate`;

    const context = (document.querySelector(`#question_${index} td:nth-child(1)`).innerHTML).slice(3);

    if(!context)
    {
        alert('Error. Model needs context to generate the answer.');
        return;
    }

    // Http call
    const response = await fetch(url, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json" 
        },
        body: JSON.stringify({ "context": context })
    });

    const resJson = await response.json();

    if(!response.ok) 
    {
        alert(resJson.message);
    }
    else
    {
        let answer = '';

        for(let i=0; i<resJson.length; i++)
        {
            answer = answer + ' ' + resJson[i];
        }
        
        const modalAnswer = new bootstrap.Modal(document.getElementById('modal-answer'));
        modalAnswer.show();
        document.getElementById('selected-question').innerHTML = `Question: ${context}`;
        document.getElementById('selected-answer').innerHTML = answer;
    }
}