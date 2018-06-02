

$.ajax({
        type: 'GET',
        url: `/all-test`,
        dataType: 'json',
    })
    .done(
        data => {
            createLinksOnTest(data);
        }
    )
    .fail();



$('.nameTest').on('click', '.test', (event) => {
    $.ajax({
            type: 'GET',
            url: `/test-show/?id=${event.currentTarget.id}`,
            dataType: 'json',
        })
        .done(
            data => {
                showTest(data);
            }
        )
        .fail();
})

function showTest(dataTest) {
    $('.modal-body').text('');
    $('.modal-title').text(`Name: ${dataTest.nameTest}`);
    const p = document.createElement('p');
    p.innerText = `Url: http://localhost:8000/test/?id=${dataTest._id}`;
    $('.modal-title').append(p);

    dataTest.question.forEach(element => {
        const question = document.createElement('div');
        question.setAttribute('class', 'question');

        const questionText = document.createElement('h3');
        questionText.innerText = element.text;

        question.appendChild(questionText);

        element.answer.forEach(element => {
            const answerDiv = document.createElement('div');
            answerDiv.setAttribute('class', 'answerDiv');

            // const input = document.createElement('input');
            // input.setAttribute('type', 'checkbox');
            // input.setAttribute('class', 'answer');

            const label = document.createElement('label');
            label.setAttribute('class', 'textAnswer');
            label.innerText = element

            // answerDiv.appendChild(input);
            answerDiv.appendChild(label);

            question.appendChild(answerDiv);
        });
        $('.modal-body').append(question);
    })
    $('#myModal').modal('show');
}

$('.testSearch').on('input key', event => {
    checkRequests(event.currentTarget.value);
    let url = `/search/?name=${event.currentTarget.value}`;
    if(!event.currentTarget.value) {
        url = '/all-test';
    }
    const req = $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
        })
        .done(result => {
            console.log(result)
            $('.test').remove();
            createLinksOnTest(result);
        })
        .fail(error => {

        })
    requestsStorage.set(event.currentTarget.value, req);

})

const requestsStorage = new Map();

function checkRequests(select) {
    if (requestsStorage.has(select)) {
        const oldRequest = requestsStorage.get(select);

        oldRequest.abort();

        requestsStorage.delete(select);
    }
}

function createLinksOnTest(data) {
    data.forEach((question, i) => {
        if (question !==null) {
            const inputText = document.createElement('button');
            inputText.setAttribute('class', 'test');
            inputText.setAttribute('id', question._id);
            inputText.innerText = question.nameTest;
            inputText.setAttribute('type', 'button');
            $('.nameTest').append(inputText);
        }
    })
}