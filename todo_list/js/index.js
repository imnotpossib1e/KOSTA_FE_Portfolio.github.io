// 초기 데이터
let mockData = [
  { id: 0, isDone: false, content: 'React study', date: new Date().getTime() },
  { id: 1, isDone: true, content: '친구만나기', date: new Date().getTime() },
  { id: 2, isDone: false, content: '낮잠자기', date: new Date().getTime() },
];
// 요일 출력을 위한 배열
let day = ['일', '월', '화', '수', '목', '금', '토'];

// 초기 데이터 세팅 및 날짜 출력
onload = () => {
  initData(mockData);

  const today = new Date();

  document.querySelector('header h1').innerHTML =
    `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${day[today.getDay() + 1]}요일`;
};

// 전체 출력
const initData = (printDate) => {
  document.querySelector('.todos_wrapper').innerHTML = '';
  printDate.forEach((d) => {
    document.querySelector('.todos_wrapper').innerHTML += `
      <div class="todoitem">
        <input type="checkbox" id="${d.id}" onChange="onUpdate(${d.id})" ${d.isDone && 'checked'}/>
        <div class="content">${d.content}</div>
        <div class="date">${new Date(d.date).toLocaleString()}</div>
        <button name="${d.id}" onclick="todoDel(this)" value="${d.id}">삭제</button>
      </div>
    `;
  });
};

// 추가
let idIndex = 3;
document
  .querySelector('.Editor > button')
  .addEventListener('click', function (e) {
    event.preventDefault();
    let content = document.querySelector('#add').value;
    mockData.push({
      id: idIndex++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    });
    initData(mockData);
  });

// 수정(checkbox 상태 변경)
const onUpdate = (targetId) => {
  mockData = mockData.map((item) => {
    if (item.id === targetId) {
      item.isDone ? (item.isDone = false) : (item.isDone = true);
    }
    return item;
  });

  initData(mockData);
};
// 삭제
const todoDel = (th) => {
  mockData = mockData.filter((item) => item.id != th.value);

  initData(mockData);
};

// 검색
document.querySelector('#keyword').addEventListener('keyup', () => {
  let searchedTodos = getFilterData(event.target.value);
  initData(searchedTodos);
});

const getFilterData = (search) => {
  if (search === '') {
    return mockData;
  }
  let result = mockData.filter((item) => {
    if (item.content.indexOf(search) == 0) {
      return item;
    }
  });
  return result;
};
