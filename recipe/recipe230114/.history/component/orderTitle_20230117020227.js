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
  this.$element = document.createElement('div');    // <div></div>
  this.$element.className = 'recipe_orderTitle';          // <div class="recipe_wrap"></div>
  
  $target.appendChild(this.$element);               // <div class="recipe_wrap"></div> 자식요소로 들어감. 

  // 렌더 함수
  this.render = () => {
      if (this.state.data != '') {
          this.$element.innerHTML = `
          <section id="main__recipe">
              <div class="main__recipe_title">
              <p>Triple A Coffee Recipe</p>
              <a href="../recipe/recipeBase.html">
                  <button>베이스 만들기</button>
              </a>
              </div>
          </section>

          
          
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
