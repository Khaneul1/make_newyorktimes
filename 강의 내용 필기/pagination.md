pagination : 유저가 페이지를 쉽게 이동할 수 있도록 해 둔 페이지 네이비게이션

pageSize :: 기본값 20으로 설정

> > 내가 원하는 값 마음대로 줄 수 있음
> > 기본값에 따라 data를 20개씩만 받음

pageSize : 20
page : 3
total result (전체 데이터) : 101

예시 상황
101개의 결과가 왔을 경우 (total result = 101)
한 번에 10개의 데이터를 받음 (pageSize : 10)
현재 보고 있는 페이지가 3페이지 (page:3)

pagination을 어떻게 프린트해야 하나

> > total page = totalResult / pageSize
> > 10.1 -> 남는 게 없게 항상 올림해 줘야 함

totalPage는 11개가 됨

페이지를 몇 개씩 끊어서 보여 줄 건지 중요
groupSize = 5

> > 5개씩 보여 주고 끊을 예정이니 3개의 그룹으로 pagination을 나누게 됨
> > pagination을 통해 몇 번째 페이지에 속하는지 계산하는 것이 중요함

> > pageGroup = page/groupSize
> > 3/5 = 0...3 (3도 올림해 줘야 함) -> 내가 속해 있는 페이지가 1이라는 것을 알 수 있음

:: 내가 속한 그룹 번호를 알면 그 그룹의 첫 번째와 마지막 페이지를 알 수 있다

> > 내가 있는 페이지 3. 그룹은 총 5개
> > 3/5=0...3 -> 1
> > 1 == 내가 속한 그룹 번호
> > 1x5 = 5 마지막 페이지
> > 5-4 = 1 첫 번째 페이지 (여기서 4 = 5-1 한 것)

#우리가 알아야 하는 값

1. totalResult >> 주어지는 값
2. pageSize >> 우리가 정하는 값
3. page >> 우리가 정하는 값

- pagination 몇 개 보여 줄지

1. groupSize

#우리가 구해야 하는 값

1. 전체 페이지
   totalPage = totalResult/pageSize (올림 꼭 하기)
   > > Math.celi
2. 몇 번째 페이지에 속해 있는지
   pageGroup = page/groupSize (올림)
   > > Math.celi
3. 마지막 페이지
   pagegroup x groupSize
4. 첫 번째 페이지
   마지막 - (groupSize - 1)

첫~마까지를 render() 해 줘야 함
