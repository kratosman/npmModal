'use strict'

function listeners(btnName, eventType, callback) {

  if (!(btnName instanceof HTMLElement) && !(window.document instanceof HTMLDocument)) {
    throw new Error('btnName must be a valid DOM element');
  }

  if (typeof eventType !== 'string' || eventType.trim() === "") {
    throw new Error('Event type must be a non-empty string');
  }

  if (typeof callback !== 'function') {
    throw new Error('Callback is a function');
  } 


  btnName.addEventListener(eventType, (event) => {
    event.preventDefault();
    callback(event);   
  })    
  return {
    btnName,
    eventType,
    callback
  }
}

function allListeners(btnName, eventType, callback) {

  if (!(btnName instanceof HTMLElement) && !(btnName instanceof NodeList && btnName.length > 0) && !Array.isArray(btnName) && btnName !== window.document ) {
    throw new Error('btnName must be a valid collection of DOM elements');
  }
  

  if (typeof eventType !== 'string' || eventType.trim() === "") {
      throw new Error('Event type must be a non-empty string');
  }

  if (typeof callback !== 'function') {
      throw new Error('Callback is a function');
  } 

  if (btnName instanceof NodeList || Array.isArray(btnName) || btnName === window.document || btnName instanceof HTMLElement) {
    Array.from(btnName).forEach(allElement => {
      allElement.addEventListener(eventType, (event) => {
        event.preventDefault();
        callback(event);
      })
    }) 
  }
    return {
      btnName,
      eventType,
      callback,
    }
}

function getModalByOne() {
  return {
    open: (modalDom, btnName) => {
      if (!(modalDom instanceof HTMLElement) && !(modalDom instanceof NodeList)) {
        throw new Error('modalDom must be a valid DOM element');
      }
      listeners(btnName, 'click', () => {
        modalDom.style.display = "block";
      })
    },
    close: (modalDom, btnName) => {
      if (!(modalDom instanceof HTMLElement) && !(modalDom instanceof NodeList)) {
        throw new Error('modalDom must be a valid DOM element');
      }
      listeners(btnName, 'click', () => {
        modalDom.style.display = "none";  
      })
    },
    window: (modalDom) => {
      if (!(modalDom instanceof HTMLElement) && !(window.document instanceof HTMLDocument)) {
        throw new Error('modalDom must be a valid DOM element');
      }
      listeners(window.document, 'click', (event) => {
        if (event.target === modalDom) {
          modalDom.style.display = "none";
        }
      })
    }
  }
}


function getAllModal() {
  return {
    open: (modalDom, btnName) => {
      if (!(modalDom instanceof HTMLElement) && !(modalDom instanceof NodeList && modalDom.length > 0)) {
        throw new Error('modalDom must be a valid DOM element');
      }
      allListeners(btnName, 'click', () => {
        modalDom.forEach(modalElement => {
          modalElement.style.display = "block";
        })
      })
    },
    close: (modalDom, btnName) => {
      if (!(modalDom instanceof HTMLElement) && !(modalDom instanceof NodeList && modalDom.length > 0)) {
        throw new Error('modalDom must be a valid DOM element');
      }
      allListeners(btnName, 'click', () => {
        modalDom.forEach(modalElement => {
          modalElement.style.display = "none";
        })
      })
    },
    window: (modalDoms) => {
      if (!Array.isArray(modalDoms)) {
        throw new Error('modalDom must be a valid DOM element');
      }
      allListeners(window.document, 'click', (event) => {
        for (const modalDom of modalDoms) {
          if (!modalDom.contains(event.target)) {
            modalDom.style.display = "none";
          }
        }
      })
    }
  }
}
export var modal = getModalByOne();
export var allModals = getAllModal();

