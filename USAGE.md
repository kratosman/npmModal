# npmModal


import { modal } from "./modals.js";

var myBtn = document.querySelector('#myBtn');
var myModal = document.querySelector('#myModal');
var myClose = document.querySelector('.close');

modal.open(myModal, myBtn);
modal.close(myModal, myClose);
modal.window(myModal)
