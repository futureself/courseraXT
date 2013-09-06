$(document).ready(function(){
    $("ul.course-item-list-section-list").each(function(){
        var seconds = 0;
        $(this).find("li").each(function(){
            var vidSeconds = 0;
            
            // Formats: (12:34) [12:34] with or without spaces
            var tmpSeconds = /[\(\[]\s?\d+\s?:\s?\d+\s?[\)\]]/m.exec($(this).text());
            if (tmpSeconds) {
                tmpSeconds = /\d+\s?:\s?\d+/.exec(tmpSeconds)[0].split(":");
                vidSeconds += (parseInt(tmpSeconds[0]) * 60) + parseInt(tmpSeconds[1]);
            }
            
            // Formats: (12 min) [12 min] with or without spaces
            if (vidSeconds < 1) {
                var tmpSeconds = /[\(\[]\s?\d+\s?min\s?[\)\]]/m.exec($(this).text());
                if (tmpSeconds) {
                    vidSeconds = parseInt(/\d+/.exec(tmpSeconds)) * 60;
                }
            }
            seconds += vidSeconds;
        });
        if (!isNaN(seconds) && seconds !== 0) {
            var headerContainer = $(this).prev("div.course-item-list-header");
            var header = headerContainer.find(":header");
            header.append(" [" + Math.round(seconds/60) + " min]");
        }
    });
});
