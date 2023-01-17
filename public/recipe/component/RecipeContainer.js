import { request } from '../../api.js'

export default function RecipeContainer({ $target, initialState }) {
    this.state = {
        ...initialState,
        data: ''
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        }
        console.log('레시피 setstate')
        callRecipe(this.state.m_name)
        this.render()
    }

    this.$element = document.createElement('div');
    this.$element.className = 'recipe_box';

    $target.appendChild(this.$element);

    this.render = () => {
        this.$element.innerHTML = `
        <h3>레시피1</h3>
        <div class="recipe1">
          <div>메뉴명: <span>${this.state.m_name}</span></div>
          ${this.state.data.map(item => `
            <p>${item}</p>
          `).join('')}
        </div>
        `;
    }

    const callRecipe = async (m_name) => {
        const data = await request(`callRecipe?m_name=${m_name}`)
        console.log(data)
        let data_arr = [];
        if(data[0]) {
            data_arr = data[0].r_recipe.split('; ');
            for(let i=0; i<data_arr.length; i++) {
                data_arr[i] = i+1 + '. ' +data_arr[i]
            }
        }
        this.state.data = data_arr
        console.log(data_arr)
    }
    callRecipe("HOT)아메리카노(오리지널)")
}