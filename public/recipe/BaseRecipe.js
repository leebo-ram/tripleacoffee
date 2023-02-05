import { request } from '../api.js';

export default function BaseRecipe({ $target, initialState }) {
    this.state = {
        data : [],
        choosedRecipe: [],
        ...initialState
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        console.log(this.state.data)

        this.render()
    }

    this.$element = document.querySelector('#recipeBase');
    console.log(this.$element)

    this.$element2 = document.createElement('div');
    this.$element2.className = 'baseList_box';

    this.$element3 = document.createElement('div');
    this.$element3.className = 'base__recipe1_box';

    this.$element4 = document.createElement('div');
    this.$element4.className = 'base__recipe2_box';

    this.$element.appendChild(this.$element2)
    this.$element.appendChild(this.$element3)
    this.$element.appendChild(this.$element4)
    
    this.render = () => {
        const baseListScroll = document.querySelector('.baseList') ? document.querySelector('.baseList').scrollTop : 0;
        this.$element2.innerHTML = `
        <h3>베이스 종류<h3>
            <div class="baseList">
                ${this.state.data.map((item, index) => `
                <div class="base__menu ${this.state.choosedRecipe.indexOf(item.r_idx) == -1 ? '':'selected'}" data-index=${item.r_idx}>
                <p>${item.r_name}</p>
            </div>
            `).join('')}
        `;
        document.querySelector('.baseList').scrollTop = baseListScroll;
        if(this.state.data.length > 0 && this.state.choosedRecipe[0]) {
            const data = this.state.data.filter((value, index, arr) => {
                return value.r_idx == this.state.choosedRecipe[0]
            })[0]
            console.log(data)
            this.$element3.innerHTML = `
            <h3>베이스 레시피1</h3>
            <div class="base__recipes">
                <div><span>${data.r_name}</span></div>
                ${data.r_recipe.map((item, index) => `
                <p>${index + 1}. ${item}</p>
                `).join('')}
                <ol>
                    <p>※ 사용기한 : ${data.expirationDate} ※<p>
                    <p>※ 보관방법 : ${data.storageMethod} ※</p>
                </ol>
            </div>

            `;
        }else {
            this.$element3.innerHTML = `
            <h3>베이스 레시피1</h3>
            <div class="base__recipes">
                <div></div>
                <ol>

                </ol>
            </div>
            `
        }
        
        if(this.state.data.length > 0 && this.state.choosedRecipe[1]) {
            const data = this.state.data.filter((value, index, arr) => {
                return value.r_idx == this.state.choosedRecipe[1]
            })[0]
            console.log(data)
            this.$element4.innerHTML = `
            <h3>베이스 레시피2</h3>
            <div class="base__recipes">
                <div><span>${data.r_name}</span></div>
                ${data.r_recipe.map((item, index) => `
                <p>${index + 1}. ${item}</p>
                `).join('')}
                <ol>
                    <p>※ 사용기한 : ${data.expirationDate} ※<p>
                    <p>※ 보관방법 : ${data.storageMethod} ※</p>
                </ol>
            </div>

            `;
        }else {
            this.$element4.innerHTML = `
            <h3>베이스 레시피2</h3>
            <div class="base__recipes">
                <div></div>
                <ol>

                </ol>
            </div>
            `
        }
    }

    const roadBaseRecipe = async () => {
        const data = await request('callBaseRecipe')
            console.log(data);
            data.map(item => {
                const recipe_arr = item.r_recipe.split('|');
                item.r_recipe = recipe_arr[0].split('; ');
                item.expirationDate = recipe_arr[1];
                item.storageMethod = recipe_arr[2];
            })
            this.setState({
                data: data,
                choosedRecipe: [data[0].r_idx, data[1].r_idx]
            })
    }
    "믹스 야채 40g + 양상추 60g + 호두&아몬드 믹스 1작은술 + 방울토마토 3개; 주문이 들어오면 크렌베리 1작은술 + 옥수수 1작은술|야채상태보고 결정|냉장보관"
    roadBaseRecipe();
    this.render();

    this.$element.addEventListener('click', (e) => {
        if(e.target.closest('div')) {
            const target = e.target.closest('div');
            if(target.classList.contains('base__menu')) {
                if (target.classList.contains('selected')) {
                    target.classList.remove('selected');
                    this.state.choosedRecipe = this.state.choosedRecipe.filter((value, index, arr) => {
                        return value != target.dataset.index;
                    });

                } else {
                    if (this.state.choosedRecipe.length < 2) {
                        target.classList.add('selected');
                        this.state.choosedRecipe.push(parseInt(target.dataset.index))
                    }

                }
                this.setState({

                })
            }
        }
    })
}