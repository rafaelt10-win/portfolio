const elementy = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const obserwator = new IntersectionObserver(function (wpisy) {
    wpisy.forEach(function (wpis) {
      if (wpis.isIntersecting) {
        wpis.target.classList.add('visible');
        obserwator.unobserve(wpis.target);
      }
    });
  }, { threshold: 0.15 });

  elementy.forEach(function (el) { obserwator.observe(el); });
} else {
  elementy.forEach(function (el) { el.classList.add('visible'); });
}

const formularz = document.getElementById('gra');
const pole = document.getElementById('liczba');
const wynik = document.getElementById('wynik');

let tajna;
let proby;

function nowaGra() {
  tajna = Math.floor(Math.random() * 100) + 1;
  proby = 0;
  pole.value = '';
  wynik.textContent = '';
}

formularz.addEventListener('submit', function (e) {
  e.preventDefault();
  const strzal = Number(pole.value);

  if (!strzal || strzal < 1 || strzal > 100) {
    wynik.textContent = 'Wpisz liczbę od 1 do 100.';
    return;
  }

  proby = proby + 1;

  if (strzal < tajna) {
    wynik.textContent = strzal + ' to za mało.';
  } else if (strzal > tajna) {
    wynik.textContent = strzal + ' to za dużo.';
  } else {
    const slowo = proby === 1 ? 'próbie' : 'próbach';
    wynik.textContent = 'Trafione! Udało się w ' + proby + ' ' + slowo + '.';
  }

  pole.value = '';
  pole.focus();
});

document.getElementById('nowa').addEventListener('click', nowaGra);

nowaGra();
