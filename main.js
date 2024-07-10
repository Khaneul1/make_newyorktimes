//const API_KEY = `8642daad00954a93b3182f67cfb01f6b`;
let newsList = []; //전역 변수로 선언

//뉴스를 가져오는 함수
const getLatestNews = async () => {
  //url 주소 필요
  //URL = 인스턴스
  //>> url 작업에 필요한 변수나 함수를 제공해 줌
  //http 주소로 생성된 URL이라는 인스턴스를 새로 만들어 준다!!
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
  );
  console.log('uuu', url);
  //apiKey는 따로 빼두는 게 좋음
  const response = await fetch(url); //우리가 호출하고 싶은 url 넣어 주면 됨
  //이게 끝나면 response 값을 받아 볼 수 있음
  //fetch() : 데이터 달라고 요청하는 것

  //우리가 받은 response에서 json을 뽑아내겠다
  const data = await response.json(); //json == 파일 형식 중 하나 (객체를 텍스트화 시킨 타입)
  newsList = data.articles; //data.articles 하게 되면 뉴스 관련된 array를 받을 수 있음
  render();
  console.log('ddd', newsList);
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
        ${news.source.naem} * ${news.publishedAt}
      </div>
    </div>
  </div>`
    )
    .join(''); //배열을 문자열로 바꿈
  console.log('html', newsHTML);

  document.getElementById('news-board').innerHTML = newsHTML;
};

getLatestNews();
