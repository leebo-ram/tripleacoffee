import { request } from '../../api.js';

export default function PayCompletePage({ $target, initialState }) {

    //상태관리
    this.state = {
        ...initialState
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        const today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        
        var dateString = year + '-' + month  + '-' + day;
        var hours = ('0' + today.getHours()).slice(-2); 
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2); 
  
        var timeString = hours + ':' + minutes  + ':' + seconds;
        updateSaleslog(dateString + " " + timeString);
        transferRecipe(dateString + " " + timeString);

        updateStamp();
        this.render();
    }

    // 최상단 요소
    

    // 렌더 함수
    this.render = () => {   
        this.$element = document.querySelector('.optionPopup')

        if(this.$element) {
        this.$element.innerHTML = `  
        <section id="popTitles">
          <div class="pop__title">
            <h2>결제완료</h2>
          </div>
        </section>
      
        <!-- 카드결제 -->
        <section id="pop__Complete__box">
            <div class="pay_Complete_ment">
              <h2>결제가 완료되었습니다.</h2>
              <p>이용해주셔서 감사합니다.</p>
              <p>영수증과 번호표를 챙겨가 주세요.</p>
            </div>
      
            <div class="pint__receipt__img">
              <img src="../../img/print_receipt.png" alt="img_Print receipt">
            </div>
          </div>
          
          <div class="payStamp">
            <div class="pay__Stamp__info">
              <div>
                <p class="pay__history">거래후 내역</p>
              </div>
      
              <div>
                <p>사용 스탬프</p>
                <span>${this.state.used_stamp}개</span>
              </div>
      
              <div class="accumulation">
                <p>적립 스탬프</p>
                <span>${this.state.saving_stamp}개</span>
              </div>
      
              <div>
                <p>잔여 스탬프</p>
                <span>${parseInt(this.state.saving_stamp) + parseInt(this.state.mem_stamp) - parseInt(this.state.used_stamp)}개</span>
              </div>
            </div>
          </div>
        </section>
      
      
        <!-- 취소Btn -->
        <section id="pop__bottom">
          <button class="pop__cancel__Btn home_Btn">메인화면으로</button>
        </section>
        `
        }
    }

    const updateStamp = async () => {
        const updateResult = await request('savestamp', {
            mem_stamp: parseInt(this.state.saving_stamp) + parseInt(this.state.mem_stamp) - parseInt(this.state.used_stamp),
            mem_mobile: this.state.mem_mobile
        });
        console.log(updateResult);
    }

    const updateSaleslog = async (date) => {
      let recipeStr = '';
      this.state.basket.map(item => {
        recipeStr += JSON.stringify(item)+"&";
      })
      recipeStr = recipeStr.slice(0, -1)
      const updateResult = await request('newsaleslog', {
        sl_date: date,
        sl_order: recipeStr,
      });
      if(updateResult) {console.log(true)}
      else console.log(false)
    }

    const recipeChat = io('/recipe');

    const transferRecipe = (date) => {
      let recipeStr = '';
      this.state.basket.map(item => {
        recipeStr += JSON.stringify(item)+",";
      })
      recipeStr = recipeStr.slice(0,-1)

      recipeChat.emit('recipe transfer', {
        name: 'kioskDevice',
        room: 'recipe',
        msg: `{"orderDate":"${date}","orderIndex": "${this.state.orderNum}", "choosedOrder": "${this.state.choosedOrder}","order":[${recipeStr}]}`
      });
    }
    
    // 이벤트리스너
    $target.addEventListener('click', (e) => {
        
    })
}
