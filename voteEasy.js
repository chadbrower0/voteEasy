
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
    updateSigns();
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
        var sign = createElement('div', null, 'signCell', 
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
updateSigns() {
    // update scores:  score = sum( levels-diff )  ?
    // want to normalize scores to 0-100%.  
    // want to ignore topics where user did not answer?  
    // want to consider topics candidate did not answer?
//     var scoreLimit = questionSeries.length * LEVELS;
// console.log( '\n scoreLimit=', scoreLimit );
    // for each candidate...
    for ( var c in candidates ){  
console.log( 'c=', c );
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
console.log( '\t question.topic=', question.topic, 
 '\t question.myAnswer=', question.myAnswer,
 '\t candidateAnswer=', candidateAnswer, 
 '\t candidateLevel=', candidateLevel, 
 '\t diff=', diff 
);
                scoreSum += LEVELS - 1 - diff;
            }
        }
    candidate.score = (scoreLimit == 0)?  0  :  Math.floor(100*(scoreSum / scoreLimit));
console.log( '\t score=', candidate.score );
    }
    
    // rank candidates by score
    var candidatesOrdered = [];
    for ( var c in candidates ){  candidatesOrdered.push( candidates[c] );  }
    candidatesOrdered.sort( function(a,b){ return (b.score - a.score); } );
console.log( 'candidatesOrdered=', candidatesOrdered );
    for ( var c = 0;  c < candidatesOrdered.length;  ++c ){
        candidatesOrdered[c].rank = candidatesOrdered.length - c;
    }
    
    // update display
    // for each candidate...
    for ( var c in candidates ){  
        var candidate = candidates[c];
        jQuery('#score'+candidate.index)[0].innerHTML = candidate.score + '% match';
        // group signs into equal-scored non-overlapping levels?
        // measure width needed for all signs, especially in widest level
        // set sizes & positions of signs
        var sign = jQuery('#sign'+candidate.index)[0];
        var scale = ( (candidate.score/1.5) + 50 )/ 100;
        sign.style.transform = 'scale('+scale+','+scale+')';
        sign.style.zIndex = candidate.rank;
        sign.style.top = candidate.score + 'px';
    }
}


    function
createElement( tag, id, className, innerHTML ){
    var element = document.createElement(tag);
    element.id = id;
    element.className = className;
    element.innerHTML = innerHTML;
    return element;
}

