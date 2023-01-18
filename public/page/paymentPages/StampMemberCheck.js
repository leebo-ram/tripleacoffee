
export default function StampMemberCheck({ $target, initialState }) {

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

        if (this.$element) {
            this.$element.innerHTML = `  
                <section id="popTitles">
                    <div class="pop__title">
                        <h2>스탬프 적립</h2>
                    </div>
                </section>
    
                <!-- 스탬프 적립하기 / 사용하기 -->
                <section id="popBox">
                    <div class="memberStamp">
                        <div class="member__stamps stampEarn__description">
                            <p>서비스 이용약관 및 개인정보 처리방침에 동의시</p>
                            <h2><span>스탬프 적립</span>을 위해 전화번호를 입력해 주세요</h2>
                        </div>
                    </div>
                </section> 

                <!-- 전화번호 입력 -->
                <section id="hp__numbers_box">
                    <div id="hp">
                        <div class="phoneNum">
                            <p>핸드폰 번호 입력</p>
                        <input type="text" name="mobileNumber" required size="10" id="mobileNumber" value="010-" data-masked="">
                
                            <div>
                                <img src="../img/stampEarn_mobile.png" alt="">
                            </div>
                        </div>
                
                        <div class="hp__numbers">
                            <div class="number123">
                                <button class="number1" data-val="1">
                                <input type="hidden" value="mobileNumber">
                                <p>1</p>
                                </button>
                                <button class="number2" data-val="2">
                                <input type="hidden" value="mobileNumber">
                                <p>2</p>
                                </button>
                                <button class="number3" data-val="3">
                                <input type="hidden" value="mobileNumber">
                                <p>3</p>
                                </button>
                            </div>
                            <div class="number456">
                                <button class="number4" data-val="4">
                                <input type="hidden" value="mobileNumber">
                                <p>4</p>
                                </button>
                                <button class="number5" data-val="5">
                                <input type="hidden" value="mobileNumber">
                                <p>5</p>
                                </button>
                                <button class="number6" data-val="6">
                                <input type="hidden" value="mobileNumber">
                                <p>6</p>
                                </button>
                            </div>
                            <div class="number789">
                                <button class="number7" data-val="7">
                                <input type="hidden" value="mobileNumber">
                                <p>7</p>
                                </button>
                                <button class="number8" data-val="8">
                                <input type="hidden" value="mobileNumber">
                                <p>8</p>
                                </button>
                                <button class="number9" data-val="9">
                                <input type="hidden" value="mobileNumber">
                                <p>9</p>
                                </button>
                            </div>
                            <div class="number0">
                                <button class="number__del__ALL">
                                <input type="hidden" value="mobileNumber">
                                <p>전체삭제</p> 
                                </button>
                                <button class="number__zero" data-val="0">
                                <input type="hidden" value="mobileNumber">
                                <p>0</p>
                                </button>
                                <button class="number__pop">
                                <input type="hidden" value="mobileNumber">
                                <i class="fas fa-backspace"></i>
                                </button>
                            </div>
                
                            <div class="input__mobileNumber__btn">
                                <button>입력하기</button>
                            </div>
                        </div>
                    </div>
                </section>
        
    
    
                <!-- 취소Btn -->
                <section id="pop__bottom">
                    <button class="pop__former__Btn">
                        <i class="fas fa-chevron-left"></i>
                    이전으로
                    </button>
                    <button class="pop__skip__Btn">
                    건너뛰기
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </section>
        `
        }
    }


    // 이벤트리스너

    $target.addEventListener('click', (e) => {

        if (document.querySelector('#hp__numbers_box') && this.state.presentPage == 'stampMemberCheck') {

            // stampMemberCheck.html - 핸드폰 번호 입력
            if (e.target.closest('button')) {
                const mobileNumberBtn = document.getElementById('mobileNumber');

                // Button 클릭시 target에 입력
                if (e.target.closest('button').dataset.val) {
                    if (mobileNumberBtn.value.length < 13) {
                        mobileNumberBtn.value += e.target.closest('button').dataset.val;

                        // 전화번호 하이픈 자동생성
                        let masking = '';
                        for (let i = 0; i < mobileNumberBtn.value.length - 9; i++) {
                            masking += '*';
                        }
                        if(mobileNumberBtn.value.length > 9) {
                            mobileNumberBtn.dataset.masked += e.target.closest('button').dataset.val
                        };
                        mobileNumberBtn.value = mobileNumberBtn.value
                            .replace(/[^0-9]/g, '')
                            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                            .replace(/(\-{1,2})$/g, '')

                            // 맨 끝 4자리만 마스킹 처리 => 010-1234-****
                            .replace(/(?<=.{9})./g, `${masking}`);
                    }
                    if(mobileNumberBtn.value.length == 8) {
                        mobileNumberBtn.value += '-';
                    }
                    return;
                }

                // 전체 삭제
                if (e.target.closest('button').className == 'number__del__ALL') {
                    mobileNumberBtn.value = '010-';
                    mobileNumberBtn.dataset.masked = "";
                    return;
                }

                // 끝에서 하나만 삭제
                if (e.target.closest('button').className == 'number__pop') {
                    if(mobileNumberBtn.value.length == 4) return;
                    if(mobileNumberBtn.dataset.masked.length >0) {
                        mobileNumberBtn.dataset.masked = mobileNumberBtn.dataset.masked.slice(0, -1);
                    }
                    
                    if(mobileNumberBtn.value.length == 9) {
                        mobileNumberBtn.value = mobileNumberBtn.value.slice(0, -2);
                    }else {
                        mobileNumberBtn.value = mobileNumberBtn.value.slice(0, -1);
                    }
                    return;
                }
            }
        }



    })
}
