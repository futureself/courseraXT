$(document).ready(function(){
    $("ul.course-item-list-section-list").each(function(){
        var minutes = 0; 
        $(this).find("li").each(function(){
            minutes += parseInt((/[0-9]+\s?min/m).exec($(this).text()));
        });
        if (!isNaN(minutes)) {
            var headerContainer = $(this).prev("div.course-item-list-header");
            var header = headerContainer.find(":header");
            header.html(header.html()+" ["+minutes+" min]");
        }
    });
});
