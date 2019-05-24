let hedr = sslk.clientHeight //+ bdiv.clientHeight;

const scrollblock = (Hobj) => { //,h
    let HobjH = Hobj.clientHeight //+ 90

    let h = window.innerHeight || 0;
    if (window.pageYOffset > hedr && HobjH <= h) {
        Hobj.style.position = "relative";
        Hobj.style.top = -hedr - 6 + window.pageYOffset + "px";
    }
    if (window.pageYOffset <= hedr && HobjH <= h) {
        //Hobj.style.position = "relative";
        Hobj.style.position = "";
    }

    if (window.pageYOffset <= HobjH - h + hedr && HobjH > h) {
        Hobj.style.position = "";

    }
    if (window.pageYOffset > HobjH - h + hedr && HobjH > h) {
        Hobj.style.position = "relative";
        Hobj.style.top = -HobjH + h - hedr + window.pageYOffset + "px";
    } //if1 

};

const classN = 'block';

window.onscroll = () => {
    if (document.getElementsByClassName(classN)) {
        Object.keys(document.getElementsByClassName(classN)).map(el => {

            scrollblock(document.getElementsByClassName(classN)[el]);
        });


    }

}; //onscroll sslk