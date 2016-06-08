/**
 * Created by freez on 08.06.2016.
 */

$(document).ready(function(){
    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.ageofclones.com/journal/inventory/from_date/08-06-2016/to_date/08-06-2016/page/1", true);
    xhr.send(null);
    var dmn = "https://www.ageofclones.com";
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4)
        {
            if (xhr.responseText)
            {
                var data = xhr.responseText;
                var pager = $('.pager', data);
                var href = pager.children('a').attr('href');
                $('#wrapper').html(href);
            }
        }
    }
});
