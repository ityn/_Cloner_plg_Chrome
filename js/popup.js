/**
 * Created by freez on 08.06.2016.
 */


/*
 https://www.ageofclones.com/journal/kalita/from_date/20-06-2016/to_date/22-06-2016/page/1
 */
$(document).ready(function(){
    $('#header').html('' +
        '<input type="date" id="dt1" value="'+new Date()+'">date1' +
        '<input type="date" id="dt2" value="'+new Date()+'">date2' +
        '<button type="button" id="btn_sbm">get data</button>' +
        '');
    //$('#wrapper').html('<br><i>Полученные данные:</i></br>');
    $('#btn_sbm').click(function(e){
        var dt1 = new Date($('#dt1').val());
        var dt1_str = ""+dt1.getDate()+"-"+Math.round(dt1.getMonth()+1)+"-"+dt1.getFullYear();
        var dt2 = new Date($('#dt2').val());
        var dt2_str = ""+dt2.getDate()+"-"+Math.round(dt2.getMonth()+1)+"-"+dt2.getFullYear();
        var res_json = [];
        var dmn = "https://www.ageofclones.com";
        var addr = dmn+"/journal/kalita/from_date/"+dt1_str+"/to_date/"+dt2_str+"/page/1";
        $('#wrapper').html('<br><i>Полученные данные:</i></br>'+addr);

         xhr = new XMLHttpRequest();
         xhr.open("GET", addr, true);
         xhr.send();
         var dmn = "https://www.ageofclones.com";
         xhr.onreadystatechange = function()
         {
             if (xhr.readyState == 4)
             {
                 if (xhr.responseText)
                 {
                     var data = xhr.responseText;
                     var pg_last = $('div.pager a.arr.last', data);
                     $('#wrapper').html('<b><i>Полученные данные:</i></b>');
                     $('#footer').html(pg_last.attr('href'));
                     var table_data = $('table#journal_entries tbody', data);
                     //var table = table_data.children('tbody');
                     var myRows = table_data.find('tr');

                     for (var i = 1; i < myRows.length; i++)
                     {
                         $('#wrapper').append('<br>');
                         var res = {};
                         for (var j = 0; j < 9; j++)
                         {
                             var dt = ($(myRows[i]).find('td:eq('+j+')').html());
                             $('#wrapper').append(dt);
                             $('#wrapper').append(' | ');
                         }
                         res.dt = $(myRows[i]).find('td:eq('+1+')').html();
                         res.name = $(myRows[i]).find('td:eq('+2+')').html();
                         res_json.push(res);
                     }
                     console.log(res_json);
                 }
             }
         }
    });

});
