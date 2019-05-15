//const Tbutton = 2;

for (let i=0 ; i<Arrbutton.length ; i++){
  var divn=document.createElement('button');
  divn.innerHTML =Arrbutton[i].wrd//+i;
  if (i===Tbutton){ 
  divn.classList.add('bdow');
  divn.onmouseup=()=>{
    location.href = "#"; //Arrbutton[i].ssl;
   };
  }else{
  divn.classList.add('bup');
  divn.onclick=(e)=>{
   e.target.classList.remove('bup');
   e.target.classList.add('bdow');
  
  document.getElementById(idup).querySelectorAll('button')[Tbutton].classList.remove('bdow'); 
  document.getElementById(idup).querySelectorAll('button')[Tbutton].classList.add('bup'); 
 //e.target.style.color="red";
    };//onmousedown
  divn.onmouseup=()=>{
    location.href = Arrbutton[i].ssl;
   };
  }
  document.getElementById(idup).appendChild(divn);
}