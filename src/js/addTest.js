//const a= require('./listTest');
const atributs = [
  [{
      atribut: "class",
      name: `inputQuestion`
    },
    {
      atribut: "name",
      name: "question"
    },
    {
      atribut: "type",
      name: "text"
    },
    {
      atribut: "placeholder",
      name: "Введите вопрос"
    }
  ],
  [{
      atribut: "class",
      name: `addAnswer`
    },
    {
      atribut: "name",
      name: "question"
    },
    {
      atribut: "type",
      name: "button"
    }
  ],
  [{
      atribut: "class",
      name: `answer`
    },
    {
      atribut: "name",
      name: "answer"
    },
    {
      atribut: "type",
      name: "text"
    },
    {
      atribut: "placeholder",
      name: "Ответ"
    }
  ],
  [{
      atribut: "class",
      name: `price`
    },
    {
      atribut: "name",
      name: "price"
    },
    {
      atribut: "type",
      name: "number"
    },
    {
      atribut: "placeholder",
      name: "Цена"
    }
  ],
  [{
      atribut: "class",
      name: `deleteAnswer`
    },
    {
      atribut: "name",
      name: "deleteAnswer"
    },
    {
      atribut: "type",
      name: "button"
    }
  ],
  [{
      atribut: "class",
      name: "chapel-in"
    },
    {
      atribut: "name",
      name: "chapel-in"
    },
    {
      atribut: "type",
      name: "number"
    },
    {
      atribut: "placeholder",
      name: "Критерий"
    }
  ],
  [{
      atribut: "class",
      name: "chapel-out"
    },
    {
      atribut: "name",
      name: "chapel-out"
    },
    {
      atribut: "type",
      name: "number"
    },
    {
      atribut: "placeholder",
      name: "Критерий"
    }
  ],
  [{
      atribut: "class",
      name: `description`
    },
    {
      atribut: "name",
      name: "chapel"
    },
    {
      atribut: "type",
      name: "text"
    },
    {
      atribut: "placeholder",
      name: "Ответ"
    }
  ]
];
/**
 * Object for create elements question of test.
 */
const question = {
  createElement: function (element, atributs) {
    var elem = document.createElement(element);
    question.assignAttributes(elem, atributs);
    return elem;
  },
  assignAttributes: function (element, atributs) {
    for (let index of atributs) {
      element.setAttribute(index.atribut, index.name);
    }
  }
};

let i = 1;
$('.question').on('click', '.addAnswer', (event) => {
  const aswerComponent = document.createElement("div");
  aswerComponent.setAttribute("class", "answerComponent");
  aswerComponent.appendChild(question.createElement("input", atributs[2]));
  aswerComponent.appendChild(question.createElement("input", atributs[3]));
  $(`.question> #${event.currentTarget.id}> .answerConteiner`).append(
    aswerComponent
  );
})

$('.addQuestion').on('click', event => {
  const Component = document.createElement("div");
  const questionComponent = document.createElement("div");
  const divAnswer = document.createElement("div");
  Component.setAttribute("class", "component");
  Component.setAttribute("id", `${i}`);
  questionComponent.setAttribute("class", "questionComponent");
  questionComponent.setAttribute("id", `${i}`);
  questionComponent.appendChild(question.createElement("input", atributs[0]));
  add = question.createElement("button", atributs[1]);
  add.setAttribute('id', i);
  del = question.createElement("button", atributs[4]);
  del.setAttribute('id', i);
  questionComponent.appendChild(add);
  questionComponent.appendChild(del);
  Component.appendChild(questionComponent);
  divAnswer.setAttribute("class", "answerConteiner");
  for (let j = 0; j < 2; j++) {
    const aswerComponent = document.createElement("div");
    aswerComponent.setAttribute("class", "answerComponent");
    aswerComponent.appendChild(question.createElement("input", atributs[2]));
    aswerComponent.appendChild(question.createElement("input", atributs[3]));
    divAnswer.appendChild(aswerComponent);
  }
  Component.appendChild(divAnswer);
  $(".question").append(Component);
  ++i;
  $('input').prop('required', true);
})

$('.question').on('click', '.deleteAnswer', (event) => {
  if ($(`.question #${event.currentTarget.id} .answerComponent`).length > 2) {
    $(`.question #${event.currentTarget.id} .answerComponent`).last().remove();
  }

});

$('.deleteQuestion').on('click', event => {
  if ($(`.question .component`).length > 1) {
    $(`.question .component`).last().remove();
  }
})

$('.newTest').submit( event => {
  event.preventDefault();
  let dataTest = {};
  let question = [];
  let price = [];
  $('.component').each((i, elem) => {
    let answer = [];
    let questionPrice = {};

    $(`#${i} .answerConteiner .answer`).each((j, answ) => {
      answer.push(answ.value);
    });

    $(`#${i} .answerConteiner .price`).each((j, answ) => {
      questionPrice[`${j}`] = answ.value;
    });


    question.push({
      "text": elem.getElementsByClassName('inputQuestion')[0].value,
      'id': i,
      'answer': answer,
    });

    price.push(questionPrice);
  });
  let description = [];
  $('.criteria').each((i, elem) => {
    let criteria = {};
    criteria['chapel-in'] = elem.getElementsByClassName('chapel-in')[0].value;
    criteria['chapel-out'] = elem.getElementsByClassName('chapel-out')[0].value;
    criteria['description'] = elem.getElementsByClassName('description')[0].value
    description.push(criteria);
  });
  dataTest['nameTest'] = document.getElementsByClassName('nameTest')[0].value;
  dataTest['question'] = question;
  dataTest['price'] = price;
  dataTest["description"] = description;
  $.ajax({
      type: "POST",
      url: "/add-test",
      data: dataTest,
      dataType: "json",
    })
    .done((result) => {
      $('.modal-body').text(result.url);
      $('#myModal').modal('show');
      $('input').val('') ;
      $('textarea').val('');
      while ($('.component').length > 1) {
        $('.component').last().remove();
      }
      while ($('.conteiner-criterias .criteria').length > 1) {
        $('.conteiner-criterias .criteria').last().remove();
      }
    })
    .fail(() => {
      console.log("Bad request.")
    })
});

$('.addCriteria').on('click', event => {
  const criteria = document.createElement('div');
  criteria.setAttribute('class', 'criteria');
  const chapels = document.createElement('div');
  chapels.setAttribute('class', 'chapels');
  chapels.appendChild(question.createElement('input', atributs[5]));
  chapels.appendChild(question.createElement('input', atributs[6]));
  criteria.appendChild(chapels);
  criteria.appendChild(question.createElement('textarea', atributs[7]));
  $('.conteiner-criterias').append(criteria);
  $('input').prop('required', true);
  $('textarea').prop('required', true);
});

$('.deleteCriteria').on('click', event => {
  if ($('.conteiner-criterias .criteria').length > 1) {
    $('.conteiner-criterias .criteria').last().remove();
  }
})