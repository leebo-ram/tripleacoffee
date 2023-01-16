import data from './recipeJson/10baseRecipe.json';

export default function App({ $target }) {
console.log(data);
console.log('ddd')
    //상태관리
    this.state = {

    }
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }

    // 최상단 요소
    this.$element = document.createElement('div');
    this.$element.className = 'recipe_wrap';
    
    $target.appendChild(this.$element)

    // 렌더 함수
    this.render = () => {
        this.$element.innerHTML = `
          <section id="recipe">
            <div class="orderNum_box">
              <h3>교환번호</h3>
              <div class="orderNum">
                <div class="orderNum__list">
                  <span class="orderNum__list__posNum"> POS: 01 </span>
                  <time datetime="2001-05-15 19:00">
                    [주문시간] 2023-01-08 18:50:30
                  </time>
                  <p> 교환번호: 108
                    <span class="orderNum__list__store">(매장)
                    </span>
                  </p>
                </div>
              </div>
            </div>
        
        
            <div class="orderList_box">
              <h3>주문목록 <span class="orderList__count">총 5건</span>
                <h3>
                  <div class="orderList">
                    <div class="order__menu">
                      <p class="order__menu__name">ICE)카페라떼 <span>1개</span></p>
                      <ul class="order__menu__option">
                        <li>
                          ▶ 디카페인 변경
                          <!-- <span>1개</span> -->
                        </li>
                        <li>▶ 헤이즐넛시럽 추가 <span>1개</span></li>
                        <li>▶ 휘핑크림 추가 <span>1개</span></li>
                      </ul>
        
                      <!-- 주문 목록 완료 Btn -->
                      <div class="order__menu__btn">
                        <div class="order__menu__cancel__btn order__menuBtns">
                          <p>해제</p>
                         </div>
                         <div class="order__menu__complete__btn order__menuBtns">
                           <p>마침</p>
                         </div>
                      </div>
                      
                    </div>
        
                  </div>
            </div>
        
            <div class=" recipe1_box">
              <h3>레시피1</h3>
              <div class="recipe1">
                <div>메뉴명: <span>ICE)카페라떼</span></div>
                <p>2. <span class="orderNum__list__store">(매장)</span>컵에 얼음80% 채운다.</p>
                <p>1. 2샷을 내린다.</p>
                <p>3. 컵에 우유를 90% 채운다.</p>
                <p>4. 2샷을 컵에 넣는다.</p>
              </div>
            </div>
        
            <div class="recipe2_box">
              <h3>레시피2</h3>
              <div class="recipe2">
                <div>메뉴명: <span>HOT)아메리카노(오리지널)</span></div>
                <p>2. <span class="orderNum__list__packaging">(포장)</span>컵에 얼음80% 채운다.</p>
                <p>1. 2샷을 내린다.</p>
                <p>3. 컵에 물을 90% 채운다.</p>
                <p>4. 2샷을 컵에 넣는다.</p>
              </div>
            </div>
        
            <div class="recipe3_box">
              <h3>레시피3</h3>
              <div class="recipe3">
                <div>메뉴명: <span>HOT)아메리카노(오리지널)</span></div>
                <p>1. 2샷을 내린다.</p>
                <p>2. <span class="orderNum__list__packaging">(포장)</span>컵에 얼음80% 채운다.</p>
                <p>3. 컵에 물을 90% 채운다.</p>
                <p>4. 2샷을 컵에 넣는다.</p>
              </div>
            </div>
        
            <div class="recipe4_box">
              <h3>레시피4</h3>
              <div class="recipe3">
                <div>메뉴명: <span>HOT)아메리카노(오리지널)</span></div>
                <p>1. 2샷을 내린다.</p>
                <p>2. <span class="orderNum__list__packaging">(포장)</span>컵에 얼음80% 채운다.</p>
                <p>3. 컵에 물을 90% 채운다.</p>
                <p>4. 2샷을 컵에 넣는다.</p>
              </div>
            </div>
          </section>
        
          <div class="all__cooked">
            <button>
              <p>전체완료</p>
            </button>
          </div>
        </body>
        
        </html>
        `
    }
    
    this.render()

    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {
        
    })
}
