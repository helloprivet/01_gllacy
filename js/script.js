/* Slider */

let pageBody = document.querySelector('.page-body')
let slideButtons = document.querySelectorAll('.slide-button')

slideButtons.forEach(function (elem, i) {
  elem.addEventListener('click', function (evt) {
    evt.preventDefault();
    let currentButtonSlide = elem.dataset.name;
    let currentSlide = document.querySelector('.' + currentButtonSlide);

    document.querySelector('.active-item').classList.remove('active-item');
    currentSlide.classList.add('active-item');

    document.querySelector('.current-slide').classList.remove('current-slide');
    elem.classList.add('current-slide');

    pageBody.classList.remove('body-main-background');
    pageBody.classList.remove('body-second-background');
    pageBody.classList.remove('body-third-background');

    let backgroundList = {
      first: 'body-main-background',
      second: 'body-second-background',
      third: 'body-third-background',
    }

    let currentSlideName = currentButtonSlide.replace('-slide', '');
    pageBody.classList.add(backgroundList[currentSlideName]);
  });
});

/* Contacts Modal */

let contactsButton = document.querySelector('.contacts-button');
let contactsModal = document.querySelector('.modal');
let contactsModalClose = document.querySelector('.modal-close');
let contacsModalOverlay = document.querySelector('.modal-wrapper');

let contactsForm = contactsModal.querySelector('.feedback-form');
let contactsInputName = contactsModal.querySelector('.feedback-input-name');
let contactsInputEmail = contactsModal.querySelector('.feedback-input-email');
let contactsText = contactsModal.querySelector('.feedback-textarea');

let isStorageSupport = true;
let storageInputName = '';
let storageInputEmail = '';

try {
  storageInputName = localStorage.getItem('login');
  storageInputEmail = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

contactsButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  contactsModal.classList.add('modal-show');
  contacsModalOverlay.classList.add('modal-overlay');

  if (storageInputName && storageInputEmail) {
    contactsInputName.value = storageInputName;
    contactsInputEmail.value = storageInputEmail;
    contactsText.focus();
  } else {
    contactsInputName.focus();
  }
});

contactsModalClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  contactsModal.classList.remove('modal-show');
  contactsModal.classList.remove('modal-error');
  contacsModalOverlay.classList.remove('modal-overlay');
});

contactsForm.addEventListener('submit', function (evt) {
  if (!contactsInputName.value || !contactsInputEmail.value || !contactsText.value) {
    evt.preventDefault();
    contactsModal.classList.remove('modal-error');
    contactsModal.offsetWidth = contactsModal.offsetWidth;
    contactsModal.classList.add('modal-error');

  } else {
    if (isStorageSupport) {
      localStorage.setItem('login', contactsInputName.value)
      localStorage.setItem('email', contactsInputEmail.value)
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (contactsModal.classList.contains('modal-show')) {
      evt.preventDefault();
      contactsModal.classList.remove('modal-show');
      contactsModal.classList.remove('modal-error');
      contacsModalOverlay.classList.remove('modal-overlay');
    }
  }
});







