Server = {
    response: '',
    getData: function() {
        $.ajax({
            url: "http://api.nbp.pl/api/exchangerates/tables/A/?format=JSON",
            dataType: 'json',
            type: "GET"
        }).done(function(response) {;
            Server.response = response[0];
            variable(response);
            return response[0];
        });
    }
}

Tables = {
    array: [
        'PLN',
        'USD',
        'EUR',
        'GBP',
        'CHF',
        'RUB',
        'CNY',
        'HRK',
        'CZK',
        'UAH',
        'HUF',
        'HKD',
        'AUD',
        'SEK',
        'JPY'
    ]
}

Server.getData();


const menuBtn = $('.menuBtn'),
    menu = $('.menu'),
    main = $('#mainCurrencyContainer'),
    submit = $('.submit'),
    select = $('.currency'),
    select2 = $('.currency2'),
    result = $('.result'),
    tableLi = $('.table'),
    info = $('.info');
menuBtn.on('click', function() {
    menu.toggle(200);
});


function variable(response) {
var longString = '';
    for (var i = 0; i < response.length; i++) {
        const currency = response[i].rates;
        // console.log(currency);
        for (var j = 0; j < currency.length; j++) {
            const codeName = currency[j].code,
                rateValue = currency[j].mid,
                name = currency[j].currency;
                let string = '<tr> <td class="name">' + name + '</td> <td class="code">' + codeName + '</td> <td class="rate">' + rateValue + '</td>  </tr>';

                longString += string;
            for (var k = 1; k < Tables.array.length; k++) {
                if (Tables.array[k] === codeName) {
                    var html = '<option id=option' + k + ' ' + 'data-rate=' + rateValue + ' ' + 'value="' + codeName + '">' + name + '(' + codeName + ')' + '</option>';
                    select.append(html);
                    select2.append(html);

                }
            }
        }
    }
    $('table').append(longString);
}

submit.on('click', function(event) {
    event.preventDefault();
    const currencyFrom = $('.currency').val(),
        currencyTo = $('.currency2').val(),
        inputVal = $('.amount').val(),
        rate1 = $('.currency option:selected').data('rate'),
        rate2 = $('.currency2 option:selected').data('rate'),
        rateVal = rate1*10000,
        rateVal2 = rate2*10000,
        sum = inputVal * rateVal / rateVal2,
        stosunek = rateVal / rateVal2,
        change = $('.change'),
        stos = $('.stosunek'),
        changeResult = $('.changeResult');
console.log(rate1);
console.log(sum.toFixed(2));

  change.text('Kwota wymieniana:' + ' ' + inputVal + ' ' + currencyFrom)
        stos.text('Przelicznik:' + ' ' + stosunek.toFixed(4))
        changeResult.text('Kwota otrzymana:' + ' ' + sum.toFixed(2) + ' ' + currencyTo);
});
tableLi.on('click', function() {
  $('.currencyTable').show();
  $('.section').hide();
});
$('.calc').on('click', function() {
  $('.currencyTable').hide();
  $('.section').show();
});
