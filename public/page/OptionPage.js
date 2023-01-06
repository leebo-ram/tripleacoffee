import { request } from "../api.js";

import OptionShowMenu from "../component/OptionShowMenu.js";
import OptionContent from "../component/OptionContent.js";
import OptionCart from "../component/OptionCart.js";

export default function OptionPage({ $target, initialState }) {

    //상태관리
    this.state = {
        selectedMenu: initialState.selectedMenu,
        options: '',
        loaded: false
    }

    this.setState = (nextState) => {
        console.log(nextState)
        this.state = {
            ...this.state,
            ...nextState
        }
        console.log(this.state)
        if(!this.state.loaded) calloptions();
        this.render()
    }

    // 최상단 요소


    // 렌더 함수
    this.render = () => {
        if(this.state.loaded) {
            new OptionShowMenu({
                $target,
                initialState: {
                    m_name: this.state.selectedMenu.m_name,
                    m_price: this.state.selectedMenu.m_price,
                    m_img: this.state.selectedMenu.m_img
                }
            })
            for(let [key, value] of this.state.options) {
                new OptionContent({
                    $target,
                    initialState: {
                        mo_category: key,
                        mo_content: value
                    }
                })
            }
            new OptionCart({
                $target
            })
    

        }

            


    }

    const calloptions = async () => {
        try {
            const options = await request('calloptions', { m_options: this.state.selectedMenu.m_options });
            console.log(options)
            const optionsMap = new Map();
            options.forEach(el => {
                if(!optionsMap.has(el.mo_category)) {
                    optionsMap.set(el.mo_category, JSON.stringify(el))
                }else {
                    optionsMap.set(el.mo_category, optionsMap.get(el.mo_category) + ";" + JSON.stringify(el))
                }
            });
            let str = '';
            for(let [key, value] of optionsMap) {
                str += key + '=' + value + '%';
            }

            this.setState({
                options: optionsMap,
                loaded: true
            })
        } catch(e) {
            const optionsMap = new Map();
            this.setState({
                options: optionsMap,
                loaded: true
            })
            console.log(e);
        }
    }
    
    this.render()

    // 이벤트리스너
    // this.$element.addEventListener('click', (e) => {

    // })
}
