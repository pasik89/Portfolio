$(function() {


    //JSONEDITORONLINE.ORG

    // const unknownObj = {
    //       'asasa':123,
    //       'asdasd': 235,
    //       'adsdsd': 333
    // };
    //
    // for (var key in unknownObj) {
    //   //key to klucz ('asasa')
    //   //unknownObj[key] to wartość (123)
    // }
    const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2016-07-25&end_date=2016-08-01&api_key=scXZq06Z33nnXYB5Zx48eTCWbAtFwm851zbFxeFN';

    function addLi() {
        const ul = $('.main')
        const li = $('<li class="date">')

        ul.append(li);


        return li
    }

    let nextUrl = "";
    let prevUrl = "";

    function meteors(apiUrl) {
        $.ajax({
            url: apiUrl,
            dataType: 'json',
            type: "GET"
        }).done(function(response) {
            nextUrl = response.links.next;
            prevUrl = response.links.prev;
            for (let date in response.near_earth_objects) {
                const oneDate = response.near_earth_objects[date];
                const appendUl = $('<ul class="nameList">').appendTo(addLi().text(date));

                for (let i = 0; i < oneDate.length; i++) {

                    const name = oneDate[i].name;
                    const hrefUrl = oneDate[i].nasa_jpl_url;
                    const armagedon = oneDate[i].is_potentially_hazardous_asteroid;
                    appendUl.append($('<li class="name">')
                        .append($('<a class="links" target="_blank">')
                            .attr('href', hrefUrl)
                            .css({
                                "text-decoration": "none",
                                "color": armagedon ? 'red' : 'green'
                            })
                            .text(name)));
                }
            }

            $('.main .date').on("click", function() {
                $(this).find('.nameList').toggle(550);
            });

        }).fail(function(error) {
            console.log(error);
        });
    }
    meteors(apiUrl);
    const nextBtn = $('.nextBtn'),
        prevBtn = $('.prevBtn');

    nextBtn.on('click', function() {
        $('.main').empty();
        meteors(nextUrl);
    });

    prevBtn.on('click', function() {
        $('.main').empty();
        meteors(prevUrl);
    });
});
