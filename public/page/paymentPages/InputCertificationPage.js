
export default function InputCertificatioinPage({ $target, initialState }) {

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
      <h2>스탬프 사용</h2>
      <p>핸드폰으로 발송된 인증번호를 입력하시고 인증하여 주세요.</p>
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
        <p>10스탬프 이상부터 10스탬프 단위로 사용 가능</p>
      </div>
    </div>
    
    <div class="pop__middle__box">
      <!-- 전화번호 입력 -->
      <div id="Certification">
        <p>인증 번호 입력</p>
        <div class="certification__Num">
          <input type="text" name="name" required minlength="4" maxlength="8" size="10" id="certification__Num">
          <button class="certification__btn">인증</button>
        </div>
      </div>
    </div>
  </section>

  <section id="certification__numbers">
      <div class="number123 certification__number123">
        <button class="number1" data-val="1">
          <input type="hidden" value="certification__Num">
          <p>1</p>
        </button>
        <button class="number2" data-val="2">
          <input type="hidden" value="certification__Num">
          <p>2</p>
        </button>
        <button class="number3" data-val="3">
          <input type="hidden" value="certification__Num">
          <p>3</p>
        </button>
      </div>
      <div class="number456 certification__number456">
        <button class="number4" data-val="4">
          <input type="hidden" value="certification__Num">
          <p>4</p>
        </button>
        <button class="number5" data-val="5">
          <input type="hidden" value="certification__Num">
          <p>5</p>
        </button>
        <button class="number6" data-val="6">
          <input type="hidden" value="certification__Num">
          <p>6</p>
        </button>
      </div>
      <div class="number789 certification__number789">
        <button class="number7" data-val="7">
          <input type="hidden" value="certification__Num">
          <p>7</p>
        </button>
        <button class="number8" data-val="8">
          <input type="hidden" value="certification__Num">
          <p>8</p>
        </button>
        <button class="number9" data-val="9">
          <input type="hidden" value="certification__Num">
          <p>9</p>
        </button>
      </div>
      <div class="number0 certification__number0" >
        <button class="number__del__ALL">
          <input type="hidden" value="certification__Num">
          <p>전체삭제</p> 
        </button>
        <button class="number__zero" data-val="0">
          <input type="hidden" value="certification__Num">
          <p>0</p>
        </button>
        <button class="number__pop">
          <input type="hidden" value="certification__Num">
          <i class="fas fa-backspace"></i>
        </button>
      </div>
  </section>

  <!-- 취소 / 주문Btn -->
  <section id="pop__bottom">
    <button>취소</button>
    <button class="pop__order__Btn">주문</button>
  </section>
        `
        }
    }


    // 이벤트리스너
    $target.addEventListener('click', (e) => {
        const certificationBtn = document.getElementById('certification__Num');
        if(certificationBtn) {
            if (e.target.closest('button')) {
                if (e.target.closest('button').dataset.val) {
                    if (certificationBtn.value.length < 4) {
                        certificationBtn.value +=
                            e.target.closest('button').dataset.val;
                        console.log(certificationBtn.value.length);
                    }
                    return;
                }
                if (e.target.closest('button').className == 'number__del__ALL') {
                    certificationBtn.value = '';
                    return;
                }
                if (e.target.closest('button').className == 'number__pop') {
                    certificationBtn.value = certificationBtn.value.slice(0, -1);
                    return;
                }
            }
        }
        
    })
}
