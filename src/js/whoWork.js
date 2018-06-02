let index = 0;
let pointAnswer = {};
let listQuestion = [];
let lengthTest = 0;
let symma = 0;
let descriptionResult = {};
$.ajax({
    type: 'POST',
    dataType: 'JSON',
    url: 'http://localhost:8000/who-work',
    success: data => {
        pointAnswer = data[1].answer[0];
        listQuestion = data[0].question;
        lengthTest = listQuestion.length;
        descriptionResult = data[2].description;
        fillFieldQuestion(data);
    }
}).fail((jqXHR, textStatus) => {
    alert("Request failed: " + textStatus);
});

function fillFieldQuestion() {
    $('.question').text(listQuestion[index].text);
    $('.answerOne').text(listQuestion[index].answer[0]);
    $('.answerTwo').text(listQuestion[index].answer[1]);
    $('.answerThree').text(listQuestion[index].answer[2]);
}

$('button').on('click', event => {
    if (event.currentTarget.className === "answerOne") {
        symma += pointAnswer[1];
    } else
    if (event.currentTarget.className === "answerTwo") {
        symma += pointAnswer[2];
    } else
    if (event.currentTarget.className === "answerThree") {
        symma += pointAnswer[3];
    }
    $('.question, .answerOne, .answerTwo, .answerThree').text('');
    index++;
    if (index === lengthTest - 1)
        showResults();
    fillFieldQuestion();
})

function showResults() {
    if (symma >= 0 && symma <= 12) {
        $('.modal-body').text(descriptionResult[1])
    } else
    if (symma >= 13 && symma <= 24) {
        $('.modal-body').text(descriptionResult[2])
    } else
    if (symma >= 25 && symma <= 36) {
        $('.modal-body').text(descriptionResult[3])
    } else
    if (symma >= 37 && symma <= 48) {
        $('.modal-body').text(descriptionResult[4])
    } else
    if (symma >= 49 && symma <= 60) {
        $('.modal-body').text(descriptionResult[5])
    }
    $('.question, .answerOne, .answerTwo, .answerThree').text('');
    $('#myModal').modal('show');

}