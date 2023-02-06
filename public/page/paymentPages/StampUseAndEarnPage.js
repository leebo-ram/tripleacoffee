import { request } from '../../api.js';

export default function StampUseAndEarnPage({ $target, initialState }) {

    //상태관리
    this.state = {
        ...initialState,
        mem_stamp: 0,
        isLoaded: false
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        if(!this.state.isLoaded) memberCheck(this.state.mem_mobile)
        this.render()
    }

    // 최상단 요소


    // 렌더 함수
    this.render = () => {
        this.$element = document.querySelector('.optionPopup')

        if (this.$element) {
            this.$element.innerHTML = `
            <section id="popTitles">
    <div class="pop__title">
      <h2>스탬프 적립 / 사용</h2>
    </div>
  </section>

  <!-- 스탬프 적립하기 / 사용하기 -->
  <section id="popBox">
    <div class="memberStamp">
      <div class="member__stamps">
        <p>010-****-${this.state.mem_mobile.substr(this.state.mem_mobile.length-4, 4)}</p>
        <p class="member__stamp__comment">회원님 총 보유 스탬프</p>
        <p class="have__stamp">${this.state.mem_stamp}개</p>
      </div>
      <div>
        <p>10스탬프 이상부터 사용 가능</p>
      </div>
    </div>
    
    <div class="pop__middle__box">

      <div class="pop__boxing" id="stamp_save" data-stamp="${this.state.mem_stamp}">
        <img src="../img/stamp_round.png" alt="">
        <p class="stamp__description">스탬프 적립하기</p>
      </div>
  
      <div class="pop__boxing" id="stamp_use" data-stamp="${this.state.mem_stamp}">
        <img src="../img/stamp_square.png" alt="">
        <p class="stamp__description">스탬프 사용하기</p>
      </div>
    </div>
    
    <div class="using__stamp__info">
      <p>스탬프 사용하기를 선택하시면 핸드폰으로 인증번호가 발송 됩니다</p>
    </div>
  </section>



  <!-- 취소Btn -->
  <section id="pop__bottom">
    <button class="pop__cancel__Btn">취소</button>
  </section>
        `
        }
    }

    const memberCheck = async (mem_mobile) => {
        try{
            const res = await request('checkmobile', { mem_mobile: mem_mobile });
            if(res[0]) {
              this.setState({ 
                mem_stamp: res[0].mem_stamp,
                isLoaded: true
            })
            }else {
              this.setState({
                mem_stamp: 0,
                isLoaded: true
              })
            }

        }catch(e) {
            console.log(e);
        }
        this.state.isLoaded = true;
    }


    // 이벤트리스너

    $target.addEventListener('click', (e) => {

    })
}
