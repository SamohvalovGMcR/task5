//const Tbutton = 2;
//let socket = {};

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

        }; //onmousedown
        divn.onmouseup = () => {
            location.href = Arrbutton[i].ssl;
        };
    }
    document.getElementById(idup).appendChild(divn);


} //for






if (document.getElementById("menu")) menu.onclick = () => {

    if (lft.style.minWidth === "160px") {
        lft.style.minWidth = "0";
    } else lft.style.minWidth = "160px";
    // alert(lft.style.position)
    lft.style.top = -6 - sslk.clientHeight + window.pageYOffset + "px";
};

let p = document.createElement('p');

document.getElementById("Hn").appendChild(p);



//let name1 = window.localStorage.getItem('aName') || [];
p.dataset.name1 = window.localStorage.getItem('aName');
p.innerHTML = "Вы-" + window.localStorage.getItem('aName') || [];
//alert(name1);

window.onunload = () => window.localStorage.setItem("aName", p.dataset.name1);



let ddv = document.createElement('div') //
ddv.innerHTML = Ht;
document.body.appendChild(ddv);
//}
const divn2 = document.createElement('button');
divn2.innerHTML = "Вход";
divn2.classList.add('bup');
divn2.onmousedown = () => {
    divn2.classList.remove('bup');
    divn2.classList.add('bdow');
};
divn2.onmouseup = () => {


    document.querySelector('.login').style.display = "block";
    divn2.classList.remove('bdow');
    divn2.classList.add('bup');
};

document.getElementById("bdiv").appendChild(divn2);

//scriptSconn.onload = () => {
socket.on('sendname', function(name1) {

    p.dataset.name1 = name1;
    p.innerHTML = "Вы-" + name1;
});

// } //onload
//