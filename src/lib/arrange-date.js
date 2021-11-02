const arrangeDate = (date) => {
    if( date.match(/T/) ) {
        let arrangedDate = date.replace( /T/, ' ' );
        arrangedDate = arrangedDate.replace( /Z/, '' );
        arrangedDate = arrangedDate.slice( 0, arrangedDate.length - 4 );

        return arrangedDate;

    } else {
        return date;
    }
}

export default arrangeDate;