
export default function ChooseOrderPage({ $target, initialState }) {

    //상태관리
    this.state = {
        ...initialState
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }

    // 최상단 요소
    

    // 렌더 함수
    this.render = () => {   
        this.$element = document.querySelector('.optionPopup')

        if(this.$element) {
        this.$element.innerHTML = `  
        <section id="popTitles">
            <div class="pop__title">
                <h2>주문 방법 선택</h2>
            </div>
        </section>

        <!-- 먹고가기, 포장하기 -->
        <section id="popBox">
            <div class="pop__middle__box">
                <div class="pop__boxing" id="for_here">
                    <img src="../img/store.png" alt="store_img">
                    <p>먹고가기</p>
                </div>

                <div class="pop__boxing" id="to_go">
                    <img src="../img/shoppingBag.png" alt="shoppingBag_img">
                    <p>포장하기</p>
                </div>
            </div>
        </section>
    
        <!-- 취소Btn -->
        <section id="pop__bottom">
            <button class="pop__cancel__Btn">취소</button>
        </section>
        `
        }
    }


    // 이벤트리스너
    $target.addEventListener('click', (e) => {

    })
}
