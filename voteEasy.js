
// collect question series
var questionSeries = [ ];  // series[questionData]

    function
initializeQuestions( ){
    for ( var t in questions ){
        for ( var q = 0;  q < questions[t].length;  ++q ){
            var question = questions[t][q];
            // add computed fields
            question.topic = t;
            if ( ! question.yes ){  question.yes = 'yes';  }
            if ( ! question.no ){  question.no = 'no';  }
            // collect
            questionSeries.push( question );
        }
    }
}


// constants
var LEVELS = 5;

// state
var questionIndex = 1;
// var userAnswers = [ ];



// on load...
jQuery(document).ready( function(){

// retrieve data via AJAX
// jQuery.get( {  } );

    // initialize DOM elements
    initializeQuestions();
    initializeTopics();
    initializeSigns();
    // set handlers
    jQuery('.arrow').on('click', handleNextQuestion);
    jQuery('.topicButton').on('click', handleTopicClick);
    jQuery('#topicSelector').on('change', handleTopicSelect);
    jQuery('#closeQuestion').on('click', function(){ setQuestion(null);} );
    jQuery('.scaleBox').on('click', handleAnswerScaleClick);
} );


// user input handlers //////////////////////////////////////////////////////////////////////

    function
handleAnswerScaleClick( event ){
    var level = event.target.getAttribute('level');
    level = parseInt(level);
    questionSeries[ questionIndex ].myAnswer = level;
    // update answer display, and advance to next question
    var question = questionSeries[ questionIndex ];
    setQuestion( question );
    setTimeout( function(){ handleIncrementQuestion(1); } , 500 );
    // update signs display
    updateScores();
}

    function
handleTopicClick( event ){ 
    var topic = event.target.getAttribute('topic');
    setQuestionForTopic( topic );
}

    function
handleTopicSelect( event ){ 
    var topicSelector = jQuery('#topicSelector')[0];
    var topic = topicSelector.value;
    setQuestionForTopic( topic );
}

    function
setQuestionForTopic( topic ){
    var questionsForTopic = questions[topic];
    var question = questionsForTopic ?  questionsForTopic[0]  :  null;
    questionIndex = questionSeries.indexOf( question );
    setQuestion( question );
}


    function
handleNextQuestion( event ){
    if ( event.target.parentElement.id == 'nextQuestion' ){
        handleIncrementQuestion( 1 );
    }
    else if ( event.target.parentElement.id == 'prevQuestion' ){
        handleIncrementQuestion( -1 );
    }
}

    function
handleIncrementQuestion( increment ){
    questionIndex = ( questionIndex + increment ) % questionSeries.length;  // wrap after end
    while ( questionIndex < 0 ){  questionIndex += questionSeries.length;  }  // wrap before start
    var question = questionSeries[questionIndex];
    setQuestion( question );
}


// initialize DOM //////////////////////////////////////////////////////////////////////

    function 
initializeTopics() {
    // buttons
    var topicButtons = jQuery('#topicButtons')[0];
    for ( var topic in questions ){
        var button = createElement('div', null, 'topicButtonCell', '<div class=topicButton topic="'+topic+'"><span class=firstLetter>'+topic[0]+'</span>'+topic.slice(1)+'</div>' );
        topicButtons.appendChild( button );
    }
    // select pull-down
    var topicSelector = jQuery('#topicSelector')[0];
    for ( var topic in questions ){
        var option = createElement('option', null, 'topicOption', null);
        option.value = topic;
        option.text = topic;
        topicSelector.appendChild( option );
    }
}

    function 
initializeSigns() {
    var signs = jQuery('#signs')[0];
    var index = 0;
    for ( var candidateName in candidates ){
        candidate = candidates[candidateName];
        candidate.index = index++;
        var image = candidate.image;
        var party = candidate.party
        var score = candidate.score ?  candidate.score  :  0;
        var sign = createElement('div', 'signCell'+candidate.index, 'signCell', 
            '<div class="sign" id="sign'+candidate.index+'">' + 
                '<div class="candidateName">'+candidateName+'</div>' + 
                '<div class="candidateScore" id="score'+candidate.index+'">' + score + '% match</div>' + 
                '<img class="candidateImage" src="'+image+'"/>' + 
                '<div class="candidateParty">'+party+'</div>' + 
            '</div>'
        );
        signs.appendChild( sign );
    }
}

    function 
setQuestion( questionData ){
    var voteEasyDiv = jQuery('#voteEasy')[0];
    if ( questionData == null ){  voteEasyDiv.setAttribute('questionState', 'none');  return;  }

    // find divs
    var questionDiv = jQuery('#question')[0];
    var questionTopicDiv = jQuery('#questionTopic')[0];
    var questionTextDiv = jQuery('#questionText')[0];
    var answerTrue = jQuery('#answerTrue')[0];
    var answerFalse = jQuery('#answerFalse')[0];
    
    // set topic
    var questionTopic = questionData.topic;
    var topicHtml = '<span class=firstLetter>'+questionTopic[0]+'</span>'+questionTopic.slice(1);
    var questionsForTopic = questions[questionTopic];
    if ( questionsForTopic.length > 1 ){
        var questionIndexForTopic = questionsForTopic.indexOf( questionData );
        topicHtml += ' <span id=topicQuestionCount>' + (questionIndexForTopic+1) + ' of ' + questionsForTopic.length + '</span>';
    }
    questionTopicDiv.innerHTML = topicHtml;

    // set question
    questionTextDiv.innerHTML = questionData.text;

    // set answer options    
    answerTrue.innerHTML = questionData.yes;
    answerFalse.innerHTML = questionData.no;

    // show user answer
    for ( var l = 0;  l < 5;  ++l ){
        jQuery('#scaleBox'+l)[0].setAttribute('selected', 'false');
    }
    if ( questionData.myAnswer !== null  &&  questionData.myAnswer !== undefined ){
        jQuery('#scaleBox'+questionData.myAnswer)[0].setAttribute('selected', 'true');
    }

    voteEasyDiv.setAttribute('questionState', 'show');
}

    function 
updateScores() {
    // score = sum( levels-diff )
    //     normalize scores to 0-100%.  
    //     ignore topics that user did not answer
    //     consider topics that candidate did not answer
    // for each candidate...
    for ( var c in candidates ){  
        var candidate = candidates[c];
        // reset scores
        var scoreSum = 0;
        var scoreLimit = 0;
        // for each topic x question...
        for ( var t in questions ){  
            for ( var q = 0;  q < questions[t].length;  ++q ){
                var question = questions[t][q];
                if ( question.myAnswer == undefined ){  continue;  }
                scoreLimit += LEVELS - 1;

                // get candidate answer
                var candidateTopicAnswers = candidate.answers[t];
                var candidateAnswer = candidateTopicAnswers ?  candidateTopicAnswers[q]  :  null;
                var candidateLevel = (LEVELS-1) / 2;
                if ( candidateAnswer == question.yes ){  candidateLevel = LEVELS-1;  }
                if ( candidateAnswer == question.no ){  candidateLevel = 0;  }

                // increment match score
                var diff = Math.abs(candidateLevel - question.myAnswer);
                scoreSum += LEVELS - 1 - diff;
            }
        }
        candidate.score = (scoreLimit == 0)?  0  :  Math.floor(100*(scoreSum / scoreLimit));
    }
    updateSigns();
}
    
    function 
updateSigns() {
    // rank candidates by score
    var candidatesOrdered = [];
    for ( var c in candidates ){  candidatesOrdered.push( candidates[c] );  }
    candidatesOrdered.sort( function(a,b){ return (b.score - a.score); } );
    for ( var c = 0;  c < candidatesOrdered.length;  ++c ){
        candidatesOrdered[c].rank = candidatesOrdered.length - c;
    }
// console.log( 'candidatesOrdered=', candidatesOrdered );
    
    // update display
    jQuery('#signs')[0].setAttribute('scored', 'true');
    // for each candidate...
    for ( var c in candidates ){  
        var candidate = candidates[c];
        jQuery('#score'+candidate.index)[0].innerHTML = candidate.score + '% match';
// Group signs into equal-scored non-overlapping levels?
// Measure width needed for all signs, especially in widest level?
        // Set sizes & positions of signs
//         var sign = jQuery('#sign'+candidate.index)[0];
//         var scale = ( (candidate.score/1.5) + 50 )/ 100;
//         var translate =  - ((1/scale) * 100);
//         sign.style.transform = 'scale('+scale+','+scale+') translate('+translate+'%,'+translate+'%)';

// // var sign = jQuery('#signCell'+candidate.index)[0];
// var sign = jQuery('#sign'+candidate.index)[0];
// var scale = (candidate.score/200) + 0.50;
// sign.style.transform = 'scale('+scale+','+scale+')';
//         sign.style.zIndex = candidate.rank;
//         sign.style.top = ((candidate.score*2) - 50) + 'px';
    }

// use absolute positioning
// find size reduction to fit at least 3 signs on biggest row
var screenWidth = jQuery(window).width();
console.log( 'screenWidth=', screenWidth );
var sumLargestRowWidth = 0;
for ( var c = 0;  c < candidatesOrdered.length;  ++c ){
    var candidate = candidatesOrdered[c];
    candidate.originalWidth = jQuery('#signCell'+candidate.index).width();
console.log( 'candidate=', candidate, '  originalWidth=', candidate.originalWidth );
    candidate.scale = (candidate.score/200) + 0.50;  // compute sign size based on score alone
    if ( c < 3 ){  sumLargestRowWidth += candidate.scale * candidate.originalWidth;  }
}
var scaleMultiple = Math.min( (screenWidth-10)/sumLargestRowWidth, 1.00 );
console.log( 'scaleMultiple=', scaleMultiple );
// Group signs into rows, fitting at least 3 signs per row.
var signY = 0;
var signX = 0;
var rows = [ [] ];  // series[ series[candidate] ]
for ( var c = 0;  c < candidatesOrdered.length;  ++c ){
    var candidate = candidatesOrdered[c];
    candidate.scale *= scaleMultiple;
    candidate.scaledWidth = candidate.scale * candidate.originalWidth;
console.log( 'scale=', candidate.scale, ' scaledWidth=', candidate.scaledWidth );
    if ( signX + candidate.scaledWidth > screenWidth ){
        // place this sign on next row
        signX = 0;
        rows.push( [] );
        signY -= 50 * candidate.scale;
    }
    candidate.x = signX;
    candidate.y = signY;
    signX += candidate.scaledWidth;
    rows[ rows.length-1 ].push( candidate );
}
// center rows, align last row top
for ( var r = 0;  r < rows.length;  ++r ){
    var sumRowWidth = rows[r].reduce( function(s,c){ return s + c.scaledWidth; } , 0 );
console.log( 'sumRowWidth=', sumRowWidth );
    var shiftX = (screenWidth - sumRowWidth)/2;
    for ( var c = 0;  c < rows[r].length;  ++c ){
        rows[r][c].x += shiftX;
        rows[r][c].y -= signY;
    }
}
// apply size & position to sign divs
for ( var c = 0;  c < candidatesOrdered.length;  ++c ){
    var candidate = candidatesOrdered[c];
    var sign = jQuery('#signCell'+candidate.index)[0];
    // when resizing with transform, align to top left corner
    // left = 0.5orig - scale/2  =  0.5/scale - 1.00/2  =  0.5/scale - 0.50
    var scale = candidate.scale;
    var translate = -100 * ((0.5/scale) - 0.5);
    sign.style.transform = 'scale('+scale+','+scale+') translate('+translate+'%,'+translate+'%)';
    sign.style.zIndex = candidate.rank;
    sign.style.left = candidate.x + 'px';
    sign.style.top = candidate.y + 'px';
}


}


    function
createElement( tag, id, className, innerHTML ){
    var element = document.createElement(tag);
    if ( id !== null ){  element.id = id;  }
    if ( className !== null ){  element.className = className;  }
    if ( innerHTML !== null ){  element.innerHTML = innerHTML;  }
    return element;
}

