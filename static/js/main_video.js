/**
 * Created by tom on 24/08/17.
 */


//Article functions
function get_article(id) {
    return allArticles[id]
}

//Card Related Functions
function show_card() {
    //Creates a new tether for the card
    vid_card = $('#vid-card')
    vid = $('#my-video')
    vid_card.show()
    setTimeout(function () {
        new Tether({
            element: vid_card,
            target: vid,
            attachment: 'top center',
            targetAttachment: 'top center',
            // targetModifier: 'hidden'
            offset: '-15px 0px',
            enabled: true
        })
    }, 10);
}

function show_pause() {
    pause_button = $('#vid-pause-icon')
    vid = $('#my-video')
    vid_card.show()
    setTimeout(function () {
        new Tether({
            element: pause_button,
            target: vid,
            attachment: 'top center',
            targetAttachment: 'top left',
            // targetModifier: 'hidden'
            offset: '0px 0px',
            enabled: true
        })
    }, 10);
}

function hide_card(){
    vid_card = $('#vid-card')
    vid_card.hide()
}

function hide_pause(){
    pause_button = $('#vid-pause-icon')
    pause_button.hide()
}

$('#vid-pause-icon').click(function (e) {
    video_player = videojs('my-video');
    video_player.pause()
});




function play_video(article) {
    video_player = videojs('my-video');
    video_player.src(article.videoSRC);
    // debugger;
    video_player.ready(function () {
        $('#my-video').show()
        show_pause()
        register_article_cards(article)
        setTimeout(function () {
            video_player.play();
        }, 300);
        reset_video_card_activations(article)

    });


    video_player.on('ended', function () {
        hide_pause()
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
        check_card_register(article, this.currentTime())
    })
}

article_cards_register = {}

// Calls a function at a particular time for a particular video
function register_card_callback(v_id, card, callback) {
    if (article_cards_register[v_id]) {
        vtime = card.time
        article_cards_register[v_id].push({
            video_id: v_id,
            card : card,
            video_time: vtime,
            callback: callback,
            activated: false
        })
    } else {
        article_cards_register[v_id] = []
        vtime = card.time
        article_cards_register[v_id].push({
            video_id: v_id,
            card : card,
            video_time: vtime,
            callback: callback,
            activated: false
        })
    }
}


function check_card_register(article, currentTime) {
    video_id = article.id
    video_register = article_cards_register[video_id]

    for (var index = 0; index < video_register.length; index++) {
        var item = video_register[index];
        if (item.activated == false) {
            if (currentTime > item.video_time) {
                item.callback(video_id,item.card, currentTime)
                article_cards_register[video_id][index].activated = true
            }
        }
    }
}

function reset_video_card_activations(video_id) {
    video_register = article_cards_register[video_id]
    if (video_register) {
        for (var index = 0; index < video_register.length; index++) {
            article_cards_register[video_id][index].activated = false
        }
    }
}

function register_article_cards(article) {
    a_cards = article.cards
    article_id = article.id
    for (var index = 0; index < a_cards.length; index++) {
        var card = a_cards[index];
        register_card_callback(article_id,card,show_card)
        }
    }

function handle_card(id, card, current_time) {
    debugger;
    show_card(card)
    setTimeout(function () {
        vid_card.show();
        ;
    }, 300);
}


function show_article(content) {
    $('#article-modal').modal()
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
    play_video(article)
});


$(document).ready(function () {

    main_content = $('#main-content')
    vid = $('#my-video')

    vid_inner = $('.vjs-tech')

    vid.hide()

    vid_card = $('#vid-card')


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

    function update_card_text(params) {

    }


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
// 	check_card_register(vid_id, this.currentTime())
// })