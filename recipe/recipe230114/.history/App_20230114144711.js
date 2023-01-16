

export default function App({ $target }) {




    //상태관리
    this.state = {
        data: '',
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
        if(this.state.data != '') {
            this.$element.innerHTML = `
            <div class="orderNum">
            ${this.state.data.map(item => `
            <div class="orderNum__list">
            <span class="orderNum__list__posNum"> POS: 01 </span>
            <time datetime="2001-05-15 19:00">
            ${item.name}
            </time>
            <p> 교환번호: 108
              <span class="orderNum__list__store">(매장)
              </span>
            </p>
          </div>
            

        `).join('')}
            </div>
                
            `;
        }else {
            this.$element.innerHTML = `
            // json에서 받아온 데이터를 이용해 이곳에다가 html코드 적으면 됩니다
        `
        }

    }
    
    const json_import = async () => {
        let data = ''
        await fetch('./recipeJson/1coffeeRecipe.json')
        .then(res => res.json())
        .then(res => data = res)

        console.log(data)
        this.setState({
            data: data
        })
    }

    this.render()
    json_import()
    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {

    })
}
