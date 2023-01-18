import RecipeTitle from './component/RecipeTitle.js';
import OrderNum from './component/orderNum.js';
import OrderList from './component/OrderList.js';
import RecipeContainer from './component/RecipeContainer.js';
import AllCooked from './component/AllCooked.js';

export default function RecipeApp({ $target }) {
    this.state = {
        data: [],
        choosedOrder: 0,
        choosedMenu: []
    }

    const recipeTitle = new RecipeTitle({
        $target
    });

    const orderNum = new OrderNum({
        $target,
        initialState: {
            data: this.state.data,
            choosedOrder: this.state.choosedOrder,
        },
    });

    const orderList = new OrderList({
        $target,
        initialState: {
            orderData: this.state.data[this.state.choosedOrder],
            choosedMenu: this.state.choosedMenu
        }
    })

    const recipeContainer1 = new RecipeContainer({
        $target,
        initialState: {
            m_idx: ''
        }
    })
    const recipeContainer2 = new RecipeContainer({
        $target,
        initialState: {
            m_idx: ''
        }
    })
    const recipeContainer3 = new RecipeContainer({
        $target,
        initialState: {
            m_idx: ''
        }
    })
    const recipeContainer4 = new RecipeContainer({
        $target,
        initialState: {
            m_idx: ''
        }
    })

    const allCooked = new AllCooked({
        $target,
        initialState: {
            
        }
    })

    this.setState = (nextState) => {
        
        this.state = {
            ...this.state,
            ...nextState,
        };
        console.log(this.state.choosedMenu)
        orderNum.setState({
            data: this.state.data,
            choosedOrder: this.state.choosedOrder
        });

        orderList.setState({
            orderData: this.state.data[this.state.choosedOrder],
            choosedMenu: this.state.choosedMenu
        })

        for(let i=0; i< this.state.data[this.state.choosedOrder].order.length; i++) {
            recipeContainer1.setState({
                m_idx: ''
            })
            recipeContainer2.setState({
                m_idx: ''
            })
            recipeContainer3.setState({
                m_idx: ''
            })
            recipeContainer4.setState({
                m_idx: ''
            })
            if(i > 3) break;
            if(this.state.choosedMenu.length < i+1) break;

            switch(i) {
                case 0:
                    recipeContainer1.setState({
                        m_idx: this.state.data[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx
                    })
                    break;
                case 1:
                    recipeContainer2.setState({
                        m_idx: this.state.data[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx
                    })
                    break;
                case 2:
                    recipeContainer3.setState({
                        m_idx: this.state.data[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx
                    })
                    break;
                case 3:
                    recipeContainer4.setState({
                        m_idx: this.state.data[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx
                    })
                    break;
                default:
                    break;
            }
        }
    }

    const recipeChat = io('/recipe');
    
    recipeChat.emit("recipe transfer", {
        name: 'recipeDevice',
        room: 'recipe',
        msg: 'logged in'
    });

    recipeChat.on("recipe transfer", function(recievedData) {
        dataRecieved(recievedData)

    });

    const dataRecieved = (recievedData) => {
        if(recievedData == 'logged in') return;
        recievedData = JSON.parse(recievedData)
        let count = 0;
        recievedData.order.map(item => {
            count++;
            let option_arr = [];
            if(item.m_options != '') {
                option_arr = item.m_options.split(',');
                for(let i=0; i< option_arr.length; i++) {
                    if(option_arr[i].slice(-1) == ')') {
                        option_arr[i] = option_arr[i].replaceAll(')','')
                        let temp = option_arr[i].split('(');
                        option_arr[i] = { name: temp[0], quantity: temp[1]}
                    }else {
                        option_arr[i] = { name: option_arr[i], quantity: "1"}
                    }
                }
            }

            item.m_options = option_arr;
        })
        let count_arr = [];
        for(let i=0; i<count; i++) {
            if(i == 4) break;
            count_arr.push(i);
        }
        this.state.data.push(recievedData)

        this.setState({
            data: this.state.data,
            choosedMenu: count_arr
        })
    }

    $target.addEventListener('click', (e) => {
        if (e.target.closest('div')) {
            // 주문목록 선택
            if (e.target.closest('div').classList.contains('orderNum__list')) {
                const exchangeList = document.querySelector(
                    '.orderNum__list.selected'
                );
                if (exchangeList != null) {
                    exchangeList.classList.remove('selected');
                }
                if (!e.target.closest('div').classList.contains('selected')) {
                    e.target.closest('div').classList.add('selected');
                    this.setState({
                        choosedOrder: e.target.closest('div').dataset.index
                    })
                }
                return;
            }
            // 선택된 주문의 음료목록 선택
            if (e.target.closest('div').classList.contains('order__menu')) {
                if (e.target.closest('div').classList.contains('selected')) {
                    e.target.closest('div').classList.remove('selected');
                    this.state.choosedMenu = this.state.choosedMenu.filter((value, index, arr) => {
                        return value != e.target.closest('div').dataset.index;
                    });

                } else {
                    if(this.state.choosedMenu.length < 4) {
                        e.target.closest('div').classList.add('selected');
                        this.state.choosedMenu.push(parseInt(e.target.closest('div').dataset.index))
                    }
                    
                }
                this.setState({
                    choosedMenu: this.state.choosedMenu
                })
                return;
            }
            
        }
    })
}