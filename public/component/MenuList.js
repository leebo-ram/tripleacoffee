export default function MenuList({ $target, initialState }) {
    //상태관리
    this.state = {
        initialized: initialState.initialized,
        menuData: initialState.menuData
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
    this.$element.className = 'wrap___list';
    
    if($target) $target.appendChild(this.$element);

    // 렌더 함수
    this.render = () => {
        const menuData = this.state.menuData;
        if(this.state.initialized) {
            if(menuData && $target) {
                this.$element.innerHTML = `
                ${menuData.map(item =>
                    `
                    <a class="wrap" target="blank" data-type="${item.m_category}" data-idx="${item.m_idx}" data-img="${item.m_img}" data-options="${item.m_options}" data-name="${item.m_name}" data-price="${item.m_price}">
                    <img class="menu__img" src="../uploads/${item.m_img}" alt="${item.m_name}" />
                    <div class="menu__description">
                      <p>${item.m_name}</p>
                      <p>${parseInt(item.m_price).toLocaleString()}원</p>
                    </div>
                  </a>
                    `).join('')}
            `
            }
            const filter = "COFFEE"
            const menus = document.querySelectorAll('.wrap');
            menus.forEach((wrap) => {
              // console.log(wrap.dataset.type);
              if(filter === wrap.dataset.type) {
                wrap.classList.remove('invisible');
              } else {
                wrap.classList.add('invisible');
              }
            });
        }
    }
    
    if($target) this.render();

    // // 이벤트리스너
    // $target.addEventListener('click', (e) => {

    // })
}
