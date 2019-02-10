let initValue = 16;
/* Init grid creation */
function generateGrid (n) {
    /* Set value of css propriety grid-template-columns */
    function settupCSS (n) {
        var nCol = n;
        let classValue = '';
        while ( nCol > 0){
            classValue += '30px '
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


/* Check the input's value for digits and not alphabetical caracters */
function check () {
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

}

/* Submitting by pressink key "Enter" */
function getEnter () {
    if(event.charCode === 13 && check()){
        changeGridSize( 'getValue' )
    }
}

function remove () {
    $('.square').remove();
}

Grid = (n) => {
    let initCols = n ? n : initValue;
    remove()
    $('#grid').append( generateGrid(initCols) );
}

$(document).ready( () => Grid());