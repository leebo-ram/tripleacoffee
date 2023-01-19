import RecipeTitle from './component/RecipeTitle.js';
import OrderNum from './component/orderNum.js';
import OrderList from './component/OrderList.js';
import RecipeContainer from './component/RecipeContainer.js';
import AllCooked from './component/AllCooked.js';

export default function RecipeApp({ $target }) {
    this.state = {
        data: [],
        choosedOrder: 0,
        choosedMenu: [],
        completedData: []
    }
    
    const recipeTitle = new RecipeTitle({
        $target
    });

    this.$element = document.createElement('section');
    this.$element.id = 'recipe';

    $target.appendChild(this.$element);

    const orderNum = new OrderNum({
        $target,
        initialState: {
            data: this.state.data,
            choosedOrder: this.state.choosedOrder,
            completedData: this.state.completedData
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
        orderNum.setState({
            data: this.state.data,
            choosedOrder: this.state.choosedOrder
        });

        orderList.setState({
            orderData: this.state.data[this.state.choosedOrder] ? this.state.data[this.state.choosedOrder]:this.state.completedData[this.state.choosedOrder-this.state.data.length],
            choosedMenu: this.state.choosedMenu
        })

        if(this.state.data[this.state.choosedOrder] || this.state.completedData[this.state.choosedOrder - this.state.data.length]) {

            const temp_arr = this.state.data.concat(this.state.completedData)
            console.log(temp_arr)
            console.log(this.state.choosedMenu)
            for(let i=0; i< 4; i++) {
                if(i > 3) break;
                switch(i) {
                    case 0:
                        recipeContainer1.setState({
                            m_idx: temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]] ? temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx: ''
                        })
                        break;
                    case 1:
                        recipeContainer2.setState({
                            m_idx: temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]] ? temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx: ''
                        })
                        break;
                    case 2:
                        recipeContainer3.setState({
                            m_idx: temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]] ? temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx: ''
                        })
                        break;
                    case 3:
                        recipeContainer4.setState({
                            m_idx: temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]] ? temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx: ''
                        })
                        break;
                    default:
                        break;
                }
            }
        }else {

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
            choosedMenu: count_arr,
            choosedOrder: 0
        })
    }

    $target.addEventListener('click', (e) => {
        if (e.target.closest('div')) {
            // 주문목록 선택
            if (e.target.closest('div').classList.contains('orderNum__list')) {
                // const exchangeList = document.querySelector('.orderNum__list.selected');
                // if (exchangeList != null) {
                //     exchangeList.classList.remove('selected');

                // }
                
                if (!e.target.closest('div').classList.contains('selected')) {
                    e.target.closest('div').classList.add('selected');
                    let count_arr = [];
                    if(this.state.data[e.target.closest('div').dataset.index]) {
                        for(let i=0; i<this.state.data[e.target.closest('div').dataset.index].order.length; i++) {
                            if(i == 4) break;
                            count_arr.push(i);
                        }
                        this.setState({
                            choosedOrder: e.target.closest('div').dataset.index,
                            choosedMenu: count_arr
                        })
                    }else {
                        for(let i=0; i<this.state.completedData[e.target.closest('div').dataset.index - this.state.data.length].order.length; i++) {
                            if(i == 4) break;
                            count_arr.push(i);
                        }
                        this.setState({
                            choosedOrder: e.target.closest('div').dataset.index,
                            choosedMenu: count_arr
                        })
                    }

                }else this.setState({ choosedOrder: -1 })
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

            // 메뉴 마침버튼 클릭
            if(e.target.closest('div').classList.contains('order__menu__complete__btn')) {
                e.target.closest('div').parentElement.parentElement.classList.add('completed')
            }

            
        }
        if(e.target.closest('button')) {
            if(e.target.closest('button').id == 'allcooked') {
                if(this.state.data[this.state.choosedOrder]) {
                    this.state.completedData.push(this.state.data[this.state.choosedOrder]);
                    this.state.data = this.state.data.filter((value, index, arr) => {
                        return index != this.state.choosedOrder;
                    });
                    if(this.state.data.length == 0) {
                        this.setState({
                            choosedOrder: -1,
                            choosedMenu: []
                        })
                    }else {
                        let count_arr = [];
                        for(let i=0; i<this.state.data[0].order.length; i++) {
                            if(i == 4) break;
                            count_arr.push(i);
                        }
                        this.setState({
                            choosedOrder: 0,
                            choosedMenu: count_arr
                        })
                    }

                }



            }
        }
    })
}