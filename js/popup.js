/**
 * Created by freez on 08.06.2016.
 */

$(document).ready(function(){
    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.ageofclones.com/journal/summary/date_range/forever", true);
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
                var container = '<a href="'+dmn+href+'" target="_blank">Сыылка 2</a>';
                $('#wrapper').html(container);
            }
        }
    }
});
