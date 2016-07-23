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
        var last_page = '';
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
                     last_page = pg_last.attr('href');
                     console.log(last_page);
                     $('#footer').html(pg_last.attr('href'));
                     var table_data = $('table#journal_entries tbody', data);
                     //var table = table_data.children('tbody');
                     var myRows = table_data.find('tr');

                     for (var i = 1; i < myRows.length-1; i++)
                     {
                         $('#wrapper').append('<br>');
                         var rs = {};
                         //****************************
                         var str_dt = $(myRows[i]).find('td:eq('+0+')').html();
                         if (str_dt.search(/add/) > -1){
                             rs.operation = 'add';
                         } else {
                             rs.operation = 'sub';
                         }
                         var str_dt = $(myRows[i]).find('td:eq('+1+')').html();
                         var onclck = $(str_dt).attr('onclick');
                         rs.created_at = onclck.match(/'(\d+)'/)[1];

                         var str_dt = $(myRows[i]).find('td:eq('+2+')').html();
                         var onclck = $(str_dt).attr('onclick');
                         //console.log(onclck.match(/'(\d+)'/));
                         rs.clone_id = onclck.match(/'(\d+)'/)[1];
                         rs.clone_name = $(myRows[i]).find('td:eq('+2+')').text();
                         rs.delta = ($(myRows[i]).find('td:eq('+4+')').text()).split(/[+-]/)[1];
                         rs.saldo = $(myRows[i]).find('td:eq('+5+')').text();

                         var comment =$(myRows[i]).find('td:eq('+6+')').html();
                         //.split(/\r+/g)
                         //console.log(new Date(new Number(rs.created_at)));
                         //console.log($(comment).children);
                         rs.action_type = ($(comment).attr('onclick')).match(/'(\d+)'/)[1];
                         rs.comment1 = $(comment).text();
                         rs.comment2 = $(comment).val();
                         rs.comment3 = $(comment).html();

                         rs.ref = $(myRows[i]).find('td:eq('+7+')').text();

                         //****************************
                         rs.dt = $(myRows[i]).find('td:eq('+1+')').html();
                         rs.name = $(myRows[i]).find('td:eq('+2+')').html();

                         res_json.push(rs);
                     }
                     $('#wrapper').html('<b><i>Полученные данные:</i></b>'+JSON.stringify({ res_json: res_json }));
                     $.ajax({
                         type: "POST",
                         url: "http://b3coin.com:3000/opt",
                         // The key needs to match your method's input parameter (case-sensitive).
                         data: JSON.stringify({ res_json: res_json }),
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         success: function(data){alert(data);},
                         failure: function(errMsg){alert(errMsg);}
                     });
                     console.log(res_json);
                 }
             }
         }
    });

});
