  
$(document).ready(function () {

    function get(page) {
        $('#loading').css('display', 'block');
        axios.get('https://mock-api.com/rnNWOLKl.mock/news?page=' + page)
            .then(function (res) {
                console.log("res", res.data);
                var i;
                var item;
                $('#introduce tr:not(:first-child)').remove();
                for (i = 0; i < res.data.length; ++i) {
                    item = res.data[i];
                    console.log('item', item);
                    $('#introduce').append('<tr  style="color: rgb(39, 139, 197);">' +
                        '<td> <img " src="' + item.imgurl + ' " </td>' +
                        '<td style="padding:30px;">' + item.name + '</td>' +
                        '<td style="padding:30px;">' + item.sonority + '</td>' +
                        '<td style="padding:30px;"> <a href="' + item.url + '"><button class="btn btn-primary bg-warning">大致内容</button></a> </td>' +
                        '</tr>');
                }
                $('#loading').css('display', 'none');

            })
            .catch(function (e) {
                console.log('e', e);
            });
    }
    get(1);
    $('#pagination button').click(function (){
        var page = Number($(this).text());
        get(page);
        $('#pagination button').removeClass('active');
        $(this).addClass('active');
    });

});