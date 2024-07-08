function toggleMenu() {
  var items = document.getElementsByClassName('notIcon');
  for (var i = 0; i < items.length; i++) {
    if (items[i].classList.contains('hidden')) {
      items[i].classList.remove('hidden');
    } else {
      items[i].classList.add('hidden');
    }
  }
}

/* scripts.js */
document.addEventListener('DOMContentLoaded', function() {
  const galleryButtons = document.querySelectorAll('.showGalleryBtn');

  galleryButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetGallery = document.querySelector(this.getAttribute('data-target'));
      targetGallery.classList.toggle('gone');
      initializeGallery(targetGallery);
    });
  });

  function initializeGallery(gallery) {
    const galleryInner = gallery.querySelector('.gallery-inner');
    let currentIndex = 0;

    // Function to update the gallery position
    function updateGallery() {
      galleryInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Swipe functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    galleryInner.addEventListener('touchstart', function(event) {
      touchStartX = event.changedTouches[0].screenX;
    });

    galleryInner.addEventListener('touchend', function(event) {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) { // Swiped left
        if (currentIndex < galleryInner.children.length - 1) {
          currentIndex++;
          updateGallery();
        }
      } else if (touchEndX > touchStartX + 50) { // Swiped right
        if (currentIndex > 0) {
          currentIndex--;
          updateGallery();
        }
      }
    }

    // Navigation buttons for desktop
    let navLeft = gallery.querySelector('.nav-btn.left');
    let navRight = gallery.querySelector('.nav-btn.right');

    if (!navLeft) {
      navLeft = document.createElement('button');
      navLeft.className = 'nav-btn left';
      navLeft.innerHTML = '&#10094;';
      gallery.appendChild(navLeft);
    }

    if (!navRight) {
      navRight = document.createElement('button');
      navRight.className = 'nav-btn right';
      navRight.innerHTML = '&#10095;';
      gallery.appendChild(navRight);
    }

    navLeft.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
      }
    });

    navRight.addEventListener('click', function() {
      if (currentIndex < galleryInner.children.length - 1) {
        currentIndex++;
        updateGallery();
      }
    });
  }
});
