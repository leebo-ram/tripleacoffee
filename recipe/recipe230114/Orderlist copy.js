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
  this.$element.className = 'recipe_wrap';

  $target.appendChild(this.$element);

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

          <section id="recipe">
          <div class="orderNum_box">
            <h3>교환번호</h3>
            <div class="orderNum">

            ${this.state.data[0].orderList.map(
              (item) => `
              <div class="orderNum__list">
              <span class="orderNum__list__posNum"> POS: 01 </span>
              <time datetime="2001-05-15 19:00">
                [주문시간] ${item.order.date}
              </time>
              <p> 교환번호: ${item.order.orderIndex}
                <span class="orderNum__list__store">((${item.order.storeTO}))
                </span>
              </p>
            </div>

          `
          ).join('')}

          </div>
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
      await fetch('./dummy.json')
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
  this.$element.addEventListener('click', (e) => {});
}
