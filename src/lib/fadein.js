const fadeIn = ( scrollVol, tgtClassName, addClassName ) => {
    let $tgt = document.querySelectorAll( tgtClassName );
    console.log(3,tgtClassName, addClassName, $tgt);

    window.addEventListener( 'scroll', () => {
        for (let i = 0; i < $tgt.length; i++) {
            const element = $tgt[i].getBoundingClientRect().top;
            const scroll  = window.pageYOffset || document.documentElement.scrollTop;
            const offset  = element + scroll;
            const windowHeight = window.innerHeight;

            if( scroll > offset - windowHeight + scrollVol ) {
                $tgt[ i ].classList.add( addClassName );
            }
        }
    } );
}

export default fadeIn;