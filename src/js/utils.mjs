// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

export function getParam(param) {
  const queryString = window.location.search;
  const urlParam = new URLSearchParams(queryString);
  const parameter = urlParam.get(param);
  return parameter;
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// 2 Copy the renderListWithTemplate function and paste it into our utils.js module. Rename it to renderWithTemplate. Modify the function to remove the loop and instead of passing in a list, let's pass in data.
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback) {
    // parentElement.insertAdjacentHTML('afterbegin', template);
    parentElement.insertAdjacentHTML('afterbegin', template);
    if (callback) {
      callback(data);
    }
  }

  // 3  Create another function in utils.js called loadTemplate(path). In this function we need to make a fetch request to the provided path, then process the response as text. (We have usually processed our responses as JSON!)
  async function loadTemplate(path) {
    try {
      const response = await fetch(path); // FETCH
      // console.log(response)
      const template = await response.text();
    // console.log(template)
    return template;
  } catch (error) {
    console.log(error);
  }
}

// 4  Create one more function in utils.js called loadHeaderFooter. It needs to do the following:
export async function loadHeaderFooter() {
  // 4.1  Load the header and footer templates in from our partials. (loadTemplate)
  const htmlHeader = await loadTemplate('../partials/header.html');
  // console.log(htmlHeader)
  const htmlFooter = await loadTemplate('../partials/footer.html');
  // console.log(htmlFooter)

  // 4.2 Grab the header and footer elements out of the DOM
  const header = document.querySelector('#main-header');
  const footer = document.querySelector('#main-footer');

  // 4.3  Render the header and footer (renderWithTemplate)
  renderWithTemplate(htmlHeader, header);
  renderWithTemplate(htmlFooter, footer);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
  ) {
    if (clear) {
      parentElement.innerHTML = '';
    }
    parentElement.insertAdjacentHTML(position, list.map(templateFn).join(''));
  }

  // set a listener for both touchend and click
  export function setClick(selector, callback) {
    qs(selector).addEventListener('touchend', (event) => {
      event.preventDefault();
      callback();
    });
    qs(selector).addEventListener('click', callback);
  }

  export function alertMessage(message, scroll = true) {
      // create element to hold our alert
      const alert = document.createElement('div');
      // add a class to style the alert
      alert.classList.add('alert');
      // set the contents. You should have a message and an X or something the user can click on to remove
      alert.innerHTML = `<h3>${message}</h3><span>X</span>`;
      setTimeout(() => {
        alert.remove()
      }, 6000);
      // add a listener to the alert to see if they clicked on the X
  
      // if they did then remove the child
      alert.addEventListener('click', function(e) {
          if(alert) { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
            main.removeChild(this);
          }
      })
      // add the alert to the top of main
      const main = document.querySelector('main');
      main.prepend(alert);
    // make sure they see the alert by scrolling to the top of the window
    //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
    if(scroll)
      window.scrollTo(0,0);
  
  }
