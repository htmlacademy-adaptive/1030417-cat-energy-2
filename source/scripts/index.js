/* в этот файл добавляет скрипты*/
const toggleButton = document.querySelector('.header__toggle');
const headerNavigation = document.querySelector('.navigation');

toggleButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  toggleButton.classList.toggle('header__toggle--opened');
  headerNavigation.classList.toggle('navigation--opened');
});

const slider = document.querySelector('.slider');
const before = slider.querySelector('.slider__wrapper-before');
const changeBtn = document.querySelector('.slider__button');

if (slider) {

  let isActive = false;
  const width = slider.offsetWidth / 2;
  before.style.width = `${width}px`;


  const beforeAfterSlider = (cursorPosition) => {
    const shift = Math.max(0, Math.min(cursorPosition, slider.offsetWidth));
    before.style.width = `${shift}px`;
    changeBtn.style.left = `${shift}px`;
  };

  const pauseEvents = (evt) => {
    if (evt.stopPropagation) {
      evt.stopPropagation();
    }
    if (evt.preventDefault) {
      evt.preventDefault();
    }
    evt.cancelBubble = true;
    evt.returnValue = false;
    return false;
  };

  slider.addEventListener('mousedown', () => {
    isActive = true;
  });

  slider.addEventListener('mouseup', () => {
    isActive = false;
  });

  slider.addEventListener('mouseleave', () => {
    isActive = false;
  });


  slider.addEventListener('mousemove', (evt) => {
    if (!isActive) {
      return;
    }

    let cursorPosition = evt.pageX;
    cursorPosition -= slider.getBoundingClientRect().left;
    beforeAfterSlider(cursorPosition);
    pauseEvents(evt);
  });

  slider.addEventListener('touchstart', (evt) => {
    evt.preventDefault();
    isActive = true;
  });

  slider.addEventListener('touchend', (evt) => {
    evt.preventDefault();
    isActive = false;
  });

  slider.addEventListener('touchcancel', (evt) => {
    evt.preventDefault();
    isActive = false;
  });


  slider.addEventListener('touchmove', (evt) => {
    evt.preventDefault();
    if (!isActive) {
      return;
    }

    let touchPosition;
    let i;

    for (i = 0; i < evt.changedTouches.length; i++) {
      touchPosition = evt.changedTouches[i].pageX;
      touchPosition -= slider.getBoundingClientRect().left;
      beforeAfterSlider(touchPosition);
      pauseEvents(evt);
    }
  });

}
