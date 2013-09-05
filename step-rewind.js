
var REWIND_TIME = 15; // seconds

// Milliseconds. This delay is needed because
// we must add the button after the coursera scripts
// have worked their magic. Unfortunately, Mutation
// Observers are not picking events inside the iframe.
var IFRAME_EVENT_DELAY = 5000;


// Rewind the video by a step the size of REWIND_TIME
function onStepRewind() {
    var video = $("iframe").contents().find("video")[0];
    if (video) {
        var time = video.currentTime - REWIND_TIME;
        video.currentTime = ((time) < 0) ? 0 : time;
    }
}

// Callback triggered by the iframe Mutation Observer
function onIframeChange(changes) {
    // Sometimes the event is triggered and yet there are no iframes
    if ($("iframe").length > 0) {
        setTimeout(function(){
            // At this point the video and controls should be ready
            if ($("iframe").contents().find("#step-rewind-control").length === 0) {
                var controls = $("iframe").contents().find(".course-lecture-view-right-controls-block");
                controls.prepend("<a id='step-rewind-control' href='javascript:void(0);' class='course-lecture-controls-button' style='opacity:0;'>« "+REWIND_TIME+"</a>");
                var stepRewindButton = $("iframe").contents().find("#step-rewind-control");
                stepRewindButton.animate({opacity:1}, 200);
                stepRewindButton.click(onStepRewind);
            }
        }, IFRAME_EVENT_DELAY);
    }
}

// Listen for events on iframe elements
var observer = new MutationSummary({
  callback: onIframeChange, // required
  queries: [{ element : "iframe" }]
});

