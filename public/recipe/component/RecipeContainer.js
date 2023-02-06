import { request } from '../../api.js'

export default function RecipeContainer({ $target, initialState }) {
    this.state = {
        ...initialState,
        data: '',
        r_name: ''
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        }
        callRecipe(this.state.m_idx)
        //this.render()
    }

    this.$element = document.createElement('div');
    this.$element.className = 'recipe_box';
    this.$element2 = document.querySelector('#recipe');

    this.$element2.appendChild(this.$element)
    //$target.appendChild(this.$element);

    this.render = () => {
        if(this.state.data != '') {
            this.$element.innerHTML = `
            <h3>레시피</h3>
            <div class="recipe1">
                <div><span>${this.state.r_name}</span></div>
                ${this.state.data.map(item => `
                    <p>${item}</p>
                `).join('')}
            </div>
            `;
        }else {
            this.$element.innerHTML = `
            <h3>레시피</h3>
            <div class="recipe1">
                <div><span></span></div>

            </div>
            `;
        }

    }

    const callRecipe = async (m_idx) => {
        if(m_idx != '') {
            const data = await request(`callRecipe?m_idx=${m_idx}`)
            let data_arr = [];
            if(data[0]) {
                this.state.r_name = data[0].r_name
                data_arr = data[0].r_recipe.split('; ');
                for(let i=0; i<data_arr.length; i++) {
                    data_arr[i] = i+1 + '. ' +data_arr[i]
                }
            }
            this.state.data = data_arr
        }else {
            this.state.data = '';
        }

        this.render();
    }
    this.render();
}