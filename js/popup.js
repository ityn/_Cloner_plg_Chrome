/**
 * Created by freez on 08.06.2016.
 */

function splitData(last_page)
{
    last_page = last_page || 2;
    var n = 1;
    var x = 0;
    var str = {};
    var res = [];
    var xhr = new XMLHttpRequest();
    var addr = 'https://www.ageofclones.com/journal/summary/date_range/forever/page/';
    while (n < last_page)
    {
        var addrn = addr+n;
        xhr.open("GET", addrn, false);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.responseText) {
                    var data = xhr.responseText;
                    var table = data.children('#journal_entries');
                    var myRows = table.find('tr');
                    for (var i = 1; i < myRows.length; i++)
                    {
                        for (var j = 0; j < 5; j++)
                        {
                            console.log(myRows[i].find('td:eq('+j+')').html());
                        }
                    }
                }
            }
        };

        n ++;
    }
    return res;

}

$(document).ready(function(){
    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.ageofclones.com/journal/summary/date_range/forever/page/2", true);
    xhr.send();
    var dmn = "https://www.ageofclones.com";
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4)
        {
            if (xhr.responseText)
            {
                /*var data = xhr.responseText;
                var pager = $('.pager', data);
                var last_count = pager.children('.arr.last').attr('href');
                var arr = last_count.split('/');
                var count = arr[6];
                //var content = splitData();

                var href = pager.children('a').attr('href');
                var container = '<a href="'+dmn+href+'" target="_blank">Сыылка 2</a>';

                $('#wrapper').html('<b><i>Полученные данные:</i></b>');
                $('#wrapper').append('<br>'+last_count);
                $('#wrapper').append('<br>'+container);*/
                var data = xhr.responseText;
                var table_data = $('table#journal_entries tbody', data);
                //var table = table_data.children('tbody');
                var myRows = table_data.find('tr');
                $('#wrapper').html('<b><i>Полученные данные:</i></b>');
                for (var i = 1; i < myRows.length; i++)
                 {
                     $('#wrapper').append('<br>');
                     for (var j = 0; j < 6; j++)
                     {
                         //var dt = ($(myRows[i].find('td:eq('+j+')').html()));
                         var dt = ($(myRows[i]).find('td:eq('+j+')').html());
                         $('#wrapper').append(dt);
                         $('#wrapper').append(' | ');
                     }
                 }
            }
        }
    }
});
