// DOM 요소
const fruitList = document.getElementById('fruitList');
const veggieList = document.getElementById('veggieList');

const searchBox = document.getElementById('searchBox');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
  //data는 과일 또는 야채의 배열
  console.log(data);
  container.innerHTML = '';
  data.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/
function filterAndSortFruits(e) {
  let result = [...fruits];

  result = result.filter((item) => item.name.indexOf(searchBox.value) === 0);

  const sortMap = {
    name: (a, b) => a.name.localeCompare(b.name),
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
  };

  if (e?.target === sortSelect) {
    result.sort(sortMap[e.target.value]);
  }

  return renderProducts(result, fruitList);
}

// 채소 출력 (3개씩 증가)
function loadVeggies() {
  if (veggies.length <= veggiePage) {
    alert('상품이 없습니다.');
    return;
  }
  let result = [...veggies].slice(0, (veggiePage += 3));
  renderProducts(result, veggieList);
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener('input', filterAndSortFruits);

sortSelect.addEventListener('change', filterAndSortFruits);

loadMoreBtn.addEventListener('click', loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
