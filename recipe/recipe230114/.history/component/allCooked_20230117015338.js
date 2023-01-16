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
    this.$element.className = 'recipe_orderRecipe'; //recipe1만 복붙 
  
    $target.appendChild(this.$element);

  // 렌더 함수
  this.render = () => {
      if (this.state.data != '') {
          this.$element.innerHTML = `

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
