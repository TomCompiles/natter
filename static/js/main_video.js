/**
 * Created by tom on 24/08/17.
 */


card_showing = false

var current_article = null

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
    // setTimeout(function () {
    //     new Tether({
    //         element: vid_card,
    //         target: vid,
    //         attachment: 'top center',
    //         targetAttachment: 'top center',
    //         // targetModifier: 'hidden'
    //         offset: '-15px 0px',
    //         enabled: true
    //     })
    // }, 200);
}

function show_vid_buttons() {
    pause_button = $('#vid-pause-icon')
    end_button = $('#vid-end-icon')
    pause_button.show()
    end_button.show()
}

function hide_card(){
    vid_card = $('#vid-card')
    vid_card.hide()
}

function hide_vid_buttons(){
    pause_button = $('#vid-pause-icon')
    pause_button.hide()
    end_button = $('#vid-end-icon')
    end_button.hide()
}

$('#vid-pause-icon').click(function (e) {
    video_player = videojs('my-video');
    if (video_player.paused() == false) {
        video_player.pause()
    } else {
        video_player.play()
    }
});

$('#vid-end-icon').click(function (e) {
    video_player = videojs('my-video');
    video_player.pause()
    hide_vid_buttons()
    hide_card()
    $('#my-video').hide()
    show_article()
});

function show_article() {
    article = current_article
    title = article.articleTitle
    content = article.articleContent
    $('#article-modal').modal()
    $('.modal-title').text(title)
    $('.modal-body p').html(content)

}

var current_card = null
function card_click() {
    video_player = videojs('my-video');
    if (video_player.paused() == false) {
        video_player.pause()
        card_text = current_card.text
        card_tag = current_card.tag
        vex.dialog.alert({
            unsafeMessage: '<b>'+card_tag+'</b></br>'+'<p>' +card_text+ '</p>',
            callback: function (value) {
                video_player.play()
            }
        });
    }

}

$('#vid-card').click(function (e) {
    e.preventDefault();
    card_click()
});

function set_card_tag(card,id) {
    vid_card_span = $('#vid-card span')
    tag = card.tag;
    vid_card_span.text(tag)

    vid_card = $('#vid-card')
    vid_card.attr("curr_id",id)

}

function handle_card(id, card, current_time) {
    current_card = card
    set_card_tag(card,id);
    show_card(card);
    setTimeout(function () {
       hide_card()
    }, 3000);
}



function play_video(article) {
    video_player = videojs('my-video');
    video_player.src(article.videoSRC);
    // debugger;
    video_player.ready(function () {
        $('#my-video').show()
        show_vid_buttons()
        reset_video_card_activations(article)
        register_article_cards(article)
        setTimeout(function () {
            video_player.play();
        }, 300);


    });


    video_player.on('ended', function () {
        hide_vid_buttons()
        $('#my-video').hide()
        vid_card.hide()
        show_article()


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
    video_id = article.id;
    video_register = article_cards_register[video_id];

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
        register_card_callback(article_id,card,handle_card)
        }
    }





//this class should be given to anything that is meant to start a video
$('.video-starter').click(function (e) {
    e.preventDefault();
    //todo: get actual video information
    img = e.target;
    index_of_article = parseInt(img.getAttribute("articleNo"))
    article = allArticles[index_of_article]
    current_article = article
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