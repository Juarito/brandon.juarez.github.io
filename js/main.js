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