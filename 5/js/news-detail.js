  
$(document).ready(function () {
    axios.get('http://mock-api.com/rnNWOLKl.mock/detail')
        .then(function (res) {
            console.log("res", res.data);
            var i;
            var item;
            for (i = 0; i < res.data.length; ++i) {
                item = res.data[i];
                console.log('item', item);
                $('#one').append('<h4 style="text-align: center;">' + item.title  +'</h4>' + '<p>' + item.detail + '</p>' );
            }
        })
        .catch(function (e) {
            console.log('e', e);
        });
    console.log('continue');
});
