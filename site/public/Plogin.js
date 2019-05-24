//const Ht = '<div class="login" style="display:none;"><button>X</button><h3>Вход</h3><label for="login">Логин</label><input type="text" id="login" name="login" /><label for="password">Пароль</label><input type="password" id="password" name="password" /><input type="submit" value="Войти" id="loginB" /></div>'
document.querySelector('.login button').onclick = () => {
    document.querySelector('.login').style.display = "none";
};
//document.body.onload = () => {//}
loginB.onclick = () => {
    //alert('aName ' + window.localStorage.getItem('aName'));
    socket.emit("login", ([login.value, password.value]));

    // window.localStorage.setItem("aName", login.value);

    login.value = "";
    password.value = "";
    document.querySelector('.login').style.display = "none";
};