import { request } from "../api.js";

import OptionShowMenu from "../component/OptionShowMenu.js";
import OptionContent from "../component/OptionContent.js";
import OptionCart from "../component/OptionCart.js";

export default function OptionPage({ $target, initialState }) {

    //상태관리
    this.state = {
        selectedMenu: initialState.selectedMenu,
        option_price: 0,
        options: '',
        loaded: false
    }
    const optionsShowMenu = new OptionShowMenu({
        initialState: {
            m_name: this.state.selectedMenu.m_name,
            m_price: this.state.selectedMenu.m_price,
            m_img: this.state.selectedMenu.m_img,
            loaded: false
        }
    })
    this.setState = (nextState) => {
        if(nextState.option_price) {           

            const option_price = document.getElementsByClassName('option__text__hiden');
            let optionstr = '';
            let total_price = parseInt(this.state.selectedMenu.m_price);

            for(let i=0; i<option_price.length; i++) {
                if(option_price[i].lastElementChild.textContent) {
                    optionstr += option_price[i].firstElementChild.textContent.replaceAll(',','') + " ";
                    total_price += parseInt(option_price[i].lastElementChild.textContent.replace('원','').replace(',',''));
                }
                
            }

            optionsShowMenu.setState({
                m_price: total_price,
                optionstr: optionstr
            })
            return;
        }else {
            this.state = {
                ...this.state,
                ...nextState
            }
            
            if(!this.state.loaded) {
                calloptions();
            }
            this.render()
        }


    }

    // 최상단 요소
    

    // 렌더 함수
    this.render = () => {   
        if(document.querySelector('.optionPopup')) document.querySelector('.optionPopup').innerHTML = ``;
        let optionCount = 4;
        if(this.state.loaded) {
            optionsShowMenu.setState({
                m_name: this.state.selectedMenu.m_name,
                m_price: this.state.selectedMenu.m_price,
                m_img: this.state.selectedMenu.m_img,
                loaded: false,
                quantity: 1,
                optionstr: ''
            })
            for(let [key, value] of this.state.options) {
                new OptionContent({
                    initialState: {
                        mo_category: key,
                        mo_content: value,
                        m_price: this.state.m_price
                    },
                    setOptionsState: this.setState
                })
                optionCount --;
            }
            for(optionCount; optionCount > 0; optionCount--) {
                new OptionContent({
                    initialState: {
                        mo_category: '',
                        mo_content: '',
                        m_price: this.state.m_price
                    },
                    setOptionsState: this.setState
                })
            }
            new OptionCart({
                $target
            })
    

        }

            


    }

    const calloptions = async () => {
        const optionsMap = new Map();
        try {
            const options = await request('calloptions', { m_options: this.state.selectedMenu.m_options });
            
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
            this.setState({
                options: optionsMap,
                loaded: true
            })
            console.log(e);
        }
    }

    // 이벤트리스너
    $target.addEventListener('click', (e) => {
        //console.log(e.target)

    })
}
