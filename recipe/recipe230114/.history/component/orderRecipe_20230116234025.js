export default function Orderlist({ $target }) {
    //상태관리
    this.state = {
        data: '',
    };
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        };
        this.render();
    };
  
    // 최상단 요소 
    this.$element = document.createElement('div');
    this.$element.className = 'recipe_wrap'; //recipe1만 복붙 
  
    $target.appendChild(this.$element);

  // 렌더 함수
  this.render = () => {
      if (this.state.data != '') {
          this.$element.innerHTML = `

            //json 완성시 data[0].orderList.map 의 orderList를 바꿔주기
          ${this.state.data[0].orderList.map(item => `
            <div class=" recipe1_box">
            <h3>레시피1</h3>
          <div class="recipe1">
            <div>메뉴명: <span>ICE)카페라떼</span></div>
            <p>1. 2샷을 내린다.</p>
            <p>2. <span class="orderNum__list__store">(매장)</span>컵에 얼음80% 채운다.</p>
            <p>3. 컵에 우유를 90% 채운다.</p>
            <p>4. 2샷을 컵에 넣는다.</p>
          </div>
        </div>
          `
                )
                .join('')}

          </section>
    
          <div class="all__cooked">
            <button>
              <p>전체완료</p>
            </button>
          </div>
          
          `;

      } else {
          this.$element.innerHTML = `
          // 데이터 불러오기 실패. 
      `;
      }
  };

  const json_import = async () => {
      let data = '';
      await fetch('../Dummy.json')
          .then((res) => res.json())
          .then((res) => (data = res));

      console.log(data);
      this.setState({
          data: data,
      });
  };

  this.render();
  json_import();
  // 이벤트리스너
  this.$element.addEventListener('click', (e) => {
  });
}
