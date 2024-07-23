//const API_KEY = `8642daad00954a93b3182f67cfb01f6b`;
let newsList = []; //전역 변수로 선언

//1.버튼들에 클릭 이벤트 주기
const menus = document.querySelectorAll('.menus button'); //menus 밑에 있는 button 전부 들고 옴
menus.forEach((menu) =>
  menu.addEventListener('click', (event) => getNewsByCategory(event))
);

let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
); //url 변수를 전역변수로 선언

let totalResults = 0;
//임의로 정해 줄 수 있는 값
let page = 1;
const pageSize = 10; //pageSize와 groupSize는 고정된 값
const groupSize = 5;

//중복되는 코드들 함수 안에 넣기
const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error('No result for this search');
      }
      newsList = data.articles;
      totalResult = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message); //data 안에 있는 메시지를 에러 메시지로 던져 줌
    }
  } catch (error) {
    // console.log('error', error.message);
    errorRender(error.message);
  }
};

//뉴스를 가져오는 함수
const getLatestNews = async () => {
  //url 주소 필요
  //URL = 인스턴스
  //>> url 작업에 필요한 변수나 함수를 제공해 줌
  //http 주소로 생성된 URL이라는 인스턴스를 새로 만들어 준다!!
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
  );
  //apiKey는 따로 빼두는 게 좋음
  // const response = await fetch(url); //우리가 호출하고 싶은 url 넣어 주면 됨
  //이게 끝나면 response 값을 받아 볼 수 있음
  //fetch() : 데이터 달라고 요청하는 것

  getNews();

  //우리가 받은 response에서 json을 뽑아내겠다
  // const data = await response.json(); //json == 파일 형식 중 하나 (객체를 텍스트화 시킨 타입)
  // newsList = data.articles; //data.articles 하게 되면 뉴스 관련된 array를 받을 수 있음
  // render();S
  console.log('ddd', newsList);
};

const getNewsByCategory = async (event) => {
  //카테고리가 event에서 잘 읽히는지 확인
  // +) 콘솔에서 category가 전부 대문자로 나옴 >> 컴퓨터에서는 대소문자 구분이 중요하기 때문에 이를 전부 소문자로 바꿔 주기
  const category = event.target.textContent.toLowerCase();
  console.log('category', category);
  //2.카테고리별 뉴스 가져오기
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
  );
  //3.가져온 뉴스 보여주기 (render())
  //내가 보여 주고 싶은 내용을 newsList에 넣어 줘야 함
  getNews();
};

//검색 기능
const getNewsByKeyword = async () => {
  //input창 키워드 읽어오기
  const keyword = document.getElementById('search-input').value;
  console.log('keyword', keyword);
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`
  );

  getNews();
};

//뉴스를 그려주는 함수
//render 함수는 newsList가 확정되어야 사용 가능
const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
    <div class="col-lg-4">
      <img
        class="new-img-size"
        src= ${news.urlToImage}
      />
    </div>
    <div class="col-lg-8">
      <h2>
        ${news.title}
      </h2>
      <p>
        ${news.description}
      </p>
      <div>
        ${news.source.name} * ${news.publishedAt}
      </div>
    </div>
  </div>`
    )
    .join(''); //배열을 문자열로 바꿈
  console.log('html', newsHTML);

  document.getElementById('news-board').innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;

  document.getElementById('news-board').innerHTML = errorHTML;
};

const paginationRender = () => {
  //totalResult
  // > api 호출할 때마다 .totalResult라는 값이 들어있음
  //page
  //pageSize
  //groupSize

  //pageGroup
  const pageGroup = Math.ceil(page / groupSize);
  //lastPage
  const lastPage = pageGroup * groupSize;
  //fistPage
  const firstPage = lastPage - (groupSize - 1);

  let paginationHTML = ``;
  //숫자만 알 뿐 배열이 아님!! 기존처럼 배열 함수를 쓸 수 없음
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item">
        <a class="page-link" href="#">
          ${i}
        </a>
      </li>`;
  }

  document.querySelector('.pagination').innerHTML = paginationHTML;

  //   <nav aria-label="Page navigation example">
  //   <ul class="pagination">
  //     <li class="page-item">
  //       <a class="page-link" href="#" aria-label="Previous">
  //         <span aria-hidden="true">&laquo;</span>
  //       </a>
  //     </li>
  //     <li class="page-item"><a class="page-link" href="#">1</a></li>
  //     <li class="page-item"><a class="page-link" href="#">2</a></li>
  //     <li class="page-item"><a class="page-link" href="#">3</a></li>
  //     <li class="page-item">
  //       <a class="page-link" href="#" aria-label="Next">
  //         <span aria-hidden="true">&raquo;</span>
  //       </a>
  //     </li>
  //   </ul>
  // </nav>
};

getLatestNews();
