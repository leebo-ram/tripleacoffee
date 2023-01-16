export default function App({ $target }) {

    //상태관리
    this.state = {

    }
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }

    // 최상단 요소
    this.$element = document.createElement('div');
    this.$element.className = 'recipe_wrap';
    
    $target.appendChild(this.$element)

    // 렌더 함수
    this.render = () => {
        this.$element.innerHTML = `
        <div class="orderNum_box">
        <h3>교환번호</h3>
        <div class="orderNum">
          <div class="orderNum__list">
            <span class="orderNum__list__posNum"> POS: 01 </span>
            <time datetime="2001-05-15 19:00">
              [주문시간] 2023-01-08 18:50:30
            </time>
            <p> 교환번호: 108
              <span class="orderNum__list__store">(매장)
              </span>
            </p>
          </div>
        `
    }
    
    this.render()

    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {

    })
}
