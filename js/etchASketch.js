let clickEvents = [];
let initValue = 16;
let color = '#000';


/* Check the input's value for digits and not alphabetical caracters */
function checkForNumber () {
    let inputValue = event.target.value;
    let regexp = /^\d{1,}$/;
    if(inputValue){
        if(!inputValue.match(regexp) || inputValue < 16){
            $('#errorMessage').addClass('visible');
            return false;
        } else {
            $('#errorMessage').removeClass('visible');
            return true;
        }
    } else if ( inputValue === '') {
        $('#errorMessage').removeClass('visible');
    }
    return null;
}

/* Add tracing function */
function enableTracing () {
    $('.square').on('click', () => {
        clickEvents.push('click')
        $('.square').hover( ()=> {
            let id = event.target.id;
            $(`#${id}`).css({ "background-color": color });
        })
        checkNbClicks()
    })
}

/* Set the color for tracing */
function setColor (){
    color = event.target.value;
}

/* Helper function checking the user progress on tracing */
function checkNbClicks(){
    if(clickEvents.length === 2){
        $('.square').off('click');
        $('.square').unbind('mouseenter mouseleave');
        enableTracing();
        clickEvents = [];
    }
}

/* Submitting by pressink key "Enter" */
function getEnter () {
    if(event.charCode === 13 && checkForNumber()){
        changeGridSize( 'getValue' )
    }
}


/*************** GRID ************ */
/* Init grid creation */
function generateGrid (n) {
    /* Set value of css propriety grid-template-columns */
    function settupCSS (n) {
        var nCol = n;
        let classValue = '';
        while ( nCol > 0){
            classValue += 'auto '
            nCol--;
        }
        $('#grid').css({"display":"grid","grid-template-columns":classValue});
    }

    /* Generate squares */
    function generateSquares (n) {
        let nSquares = n * n;
        let allSquares = '';
        while (nSquares > 0) {
            allSquares += `<div id="${nSquares}" class="square"></div>`
            nSquares--;
        }
        settupCSS(n)
        return allSquares;
    }
    $('#grid-input').attr('placeholder',`${n} (x ${n})`);
    return generateSquares( n )
}


/* Submitting the input or Make on action on Add or Remove buttons */
function changeGridSize ( action ) {
    let inputValue = parseInt($('#grid-input')[0].value);
    initValue = action === 'more' ? initValue + 4 : action === 'less' ? initValue - 4 : inputValue;
    if( initValue >= 16) {
        $('#grid-input')[0].value = '';
        $('#grid').append( Grid(initValue) )
    } else {
        initValue = 16;
    }
    enableTracing();
}


/* Clear the entire sheet */
function clearSquare () {
    $('.square').css('background-color', '#EEE')
}


/* Create Grid */
Grid = (n) => {
    let initCols = n ? n : initValue;
    $('.square').remove();
    $('#grid').append( generateGrid(initCols) );
    enableTracing();

}



$(document).ready( () => Grid() );