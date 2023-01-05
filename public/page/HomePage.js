export default function HomePage({ $target, initialState, appSetState }) {

    //상태관리
    this.state = {
        $target,
        initialState
    }
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }
/*      <section id="home">
          <div class="bigconts">
            <img src="./img/bigconts.jpg" alt="bigconts_EggTart">
          </div>
          <div class="touch___btn">
              <p><b>주문</b>하시려면<br/><b>화면을 터치</b>해 주세요</p>
          </div>
        </section> */
    // 최상단 요소
    // this.$element = document.createElement('section');
    // this.$element.setAttribute('id','home')
    
    // $target.appendChild(this.$element)

    // 렌더 함수
    this.render = () => {
        $target.innerHTML = `
        <section id="home">
        <a>
        <div class="bigconts">
          <img src="../img/bigconts.jpg" alt="bigconts_EggTart">
          <img src="../img/img_screen touch.png" alt="화면터치">
        </div>
      </a>
        </section>
        `
    }
    
    this.render()

    // 이벤트리스너
    // $target.addEventListener('click', (e) => {
    //     if(e.target.closest('div').className == 'touch___btn') {
    //         appSetState({ 
    //             initialized: true,
    //             presentPage: 'menuList'
    //          })
    //     }

    // })
}
