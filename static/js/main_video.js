/**
 * Created by tom on 24/08/17.
 */


function tether_card() {
    //Creates a new tether for the card
    vid_card = $('#vid-card')
    vid = $('#my-video')
    new Tether({
        element: vid_card,
        target: vid,
        attachment: 'top center',
        targetAttachment: 'top center',
        // targetModifier: 'hidden'
        offset: '-15px 0px',
        enabled: true
    })
}



function play_video(url) {
    vid_id = 2
    video_player = videojs('my-video');
    video_player.src(url);
    // debugger;
    video_player.ready(function () {
        $('#my-video').show()
        setTimeout(function(){ video_player.play(); }, 300);
        reset_video_activations(vid_id)
        tether_card()

    });


    video_player.on('ended', function () {
        $('#my-video').hide()
        show_article("hi")
        vid_card.hide()

    });

    video_player.on('playing', function () {
        // vid_card.show()
        // vid_card.position()


    });

    video_player.on('timeupdate', function () {
        // vid_card.text(this.currentTime());
        check_time_register(vid_id, this.currentTime())
    })
}

videos_time_register = {}

// Calls a function at a particular time for a particular video
function register_time_callback(v_id, vtime, callback) {
    if (videos_time_register[v_id]) {
        videos_time_register[v_id].push({
            video_id: v_id,
            video_time: vtime,
            callback: callback,
            activated: false
        })
    } else {
        videos_time_register[v_id] = []
        videos_time_register[v_id].push({
            video_id: v_id,
            video_time: vtime,
            callback: callback,
            activated: false,
        })
    }
}



function check_time_register(video_id, currentTime) {
    video_register = videos_time_register[video_id]

    for (var index = 0; index < video_register.length; index++) {
        var item = video_register[index];
        if (item.activated == false) {
            if (currentTime > item.video_time) {
                item.callback(video_id, currentTime)
                videos_time_register[video_id][index].activated = true
            }
        }
    }
}

function reset_video_activations(video_id) {
    video_register = videos_time_register[video_id]
    if (video_register) {
        for (var index = 0; index < video_register.length; index++) {
            videos_time_register[video_id][index].activated = false
        }
    }
}



//this class should be given to anything that is meant to start a video
$('.video-starter').click(function (e) {
    e.preventDefault();
    //todo: get actual video information
    img = e.target;
    index_of_article = parseInt(img.getAttribute("articleNo"))
    article = allArticles[index_of_article]
    vid_url = article.videoSRC;
    // vid_url = "https://s3-eu-west-1.amazonaws.com/content.natter-london.com/sophie+video+1.mp4"
    // vid-url = e.attr('url')
    play_video(vid_url)
});



$(document).ready(function () {

    main_content = $('#main-content')
    vid = $('#my-video')

    vid_inner = $('.vjs-tech')

    vid.hide()

    vid_card = $('#vid-card')
    tether_card()


    vid_card.click(function (e) {
        e.preventDefault();
        video_player = videojs('my-video');
        if (video_player.paused() == false) {
            video_player.pause()
            vex.dialog.alert({
                unsafeMessage: '<b>Hello World!</b>',
                callback: function (value) {
                    video_player.play()
                }
            });
        }
    });

    function show_article(content) {
        $('#article-modal').modal()
    }

    function update_card_text(params) {

    }


    function show_card(id, time) {
        // in future get card text from id
        // etc


        // card_details = get_card_details()
        vid_card.show()
        tether_card()
    }


    register_time_callback(2, 1, show_card)



    //play the intro video
    video_player = videojs('my-video');
    video_player.src("http://s3.eu-west-2.amazonaws.com/natter-london.com/Natter+warm+up.mp4");

    video_player.ready(function () {
        Pace.stop()
        $('#my-video').show()
        video_player.play();
    });

    video_player.on('ended', function () {
        main_content.show()
        $('#my-video').hide()
        // show_article("hi")
        // vid_card.hide()

    });

    video_player.on('playing', function () {
        // vid_card.show()
        // vid_card.position()


    });

});

// video_player.on('timeupdate', function () {
// 	// vid_card.text(this.currentTime());
// 	check_time_register(vid_id, this.currentTime())
// })