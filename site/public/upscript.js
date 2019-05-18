//const Tbutton = 2;

for (let i = 0; i < Arrbutton.length; i++) {
    const divn = document.createElement('button');
    divn.innerHTML = Arrbutton[i].wrd //+i;
    if (i === Tbutton) {
        divn.classList.add('bdow');
        divn.onmouseup = () => {
            location.href = "#"; //Arrbutton[i].ssl;
        };
    } else {
        divn.classList.add('bup');
        divn.onclick = (e) => {
            e.target.classList.remove('bup');
            e.target.classList.add('bdow');

            document.getElementById(idup).querySelectorAll('button')[Tbutton].classList.remove('bdow');
            document.getElementById(idup).querySelectorAll('button')[Tbutton].classList.add('bup');
            //e.target.style.color="red";
        }; //onmousedown
        divn.onmouseup = () => {
            location.href = Arrbutton[i].ssl;
        };
    }
    document.getElementById(idup).appendChild(divn);

    let name1 = window.localStorage.getItem('aName') || [];

    let p = document.createElement('p');
    p.innerHTML = "Вы-" + name1;
    document.getElementById("Hn").appendChild(p);
}

Plogin.onload = () => {

    document.createElement('div').innerHTML = Ht;
}
const divn2 = document.createElement('button');
divn2.innerHTML = "Вход2";
divn2.onmouseup = () => {

    //document.body.appendChild(doc.cloneNode(true));
    document.querySelector('.login').style.display = "block";
};

document.getElementById("bdiv").appendChild(divn2);