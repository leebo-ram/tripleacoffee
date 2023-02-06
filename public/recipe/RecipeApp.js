import RecipeTitle from './component/RecipeTitle.js';
import OrderNum from './component/OrderNum.js';
import OrderList from './component/OrderList.js';
import RecipeContainer from './component/RecipeContainer.js';
import AllCooked from './component/AllCooked.js';

import BaseRecipe from './BaseRecipe.js';

export default function RecipeApp({ $target }) {
    this.state = {
        data: [],
        choosedOrder: 0,
        choosedMenu: [],
        completedData: [],
        presentPage: 'recipe'
    }

    const recipeTitle = new RecipeTitle({
        $target,
        presentPage: this.state.presentPage
    });



    this.$element = document.createElement('section');
    this.$element.id = 'recipe';

    this.$element2 = document.createElement('section');
    this.$element2.id = 'recipeBase';

    $target.appendChild(this.$element);
    $target.appendChild(this.$element2)

    const baseRecipe = new BaseRecipe({
        $target
    })

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
        recipeTitle.setState({
            presentPage: this.state.presentPage
        })
        if(this.state.presentPage == 'recipe') {
            this.$element2.style.display = 'none';
            this.$element.style.display = 'flex';
            document.querySelector('.all__cooked').style.display = 'flex';
            
        }else {
            this.$element.style.display = 'none';
            document.querySelector('.all__cooked').style.display = 'none';
            this.$element2.style.display = 'flex';

        }
        orderNum.setState({
            data: this.state.data,
            completedData: this.state.completedData,
            choosedOrder: this.state.choosedOrder
        });

        orderList.setState({
            orderData: this.state.data[this.state.choosedOrder] ? this.state.data[this.state.choosedOrder] : this.state.completedData[this.state.choosedOrder - this.state.data.length],
            choosedMenu: this.state.choosedMenu
        })

        if (this.state.data[this.state.choosedOrder] || this.state.completedData[this.state.choosedOrder - this.state.data.length]) {

            const temp_arr = this.state.data.concat(this.state.completedData)
            for (let i = 0; i < 4; i++) {
                if (i > 3) break;
                switch (i) {
                    case 0:
                        recipeContainer1.setState({
                            m_idx: temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]] ? temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx : ''
                        })
                        break;
                    case 1:
                        recipeContainer2.setState({
                            m_idx: temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]] ? temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx : ''
                        })
                        break;
                    case 2:
                        recipeContainer3.setState({
                            m_idx: temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]] ? temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx : ''
                        })
                        break;
                    case 3:
                        recipeContainer4.setState({
                            m_idx: temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]] ? temp_arr[this.state.choosedOrder].order[this.state.choosedMenu[i]].m_idx : ''
                        })
                        break;
                    default:
                        break;
                }
            }
        } else {

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

    recipeChat.emit("completedrecipe", {
        name: 'recipeDevice',
        room: 'completedrecipe',
        msg: 'logged in'
    });

    recipeChat.on("recipe transfer", function (recievedData) {
        dataRecieved(recievedData)
    });

    recipeChat.on("completedrecipe", function (recievedData) {
        completedDataRecieved(recievedData)
    })

    const dataRecieved = (recievedData) => {
        if (recievedData == 'logged in' || recievedData[0] == undefined) return;
        let count_arr = [];
        for (let i = 0; i < recievedData[0].order.length; i++) {
            if (i == 4) break;
            count_arr.push(i);
        }
        this.state.data = recievedData
        console.log(recievedData)
        this.setState({
            data: this.state.data,
            choosedMenu: count_arr,
            choosedOrder: 0
        })

    }

    const completedDataRecieved = (recievedData) => {
        console.log(recievedData)
        if (recievedData == 'logged in' || recievedData[0] == undefined) return;
        this.state.completedData = recievedData;
        this.state.data = this.state.data.filter((value, index, arr) => {
            return value.orderIndex != recievedData[recievedData.length - 1].orderIndex;
        });
        if (this.state.data.length == 0) {
            this.setState({
                completedData: this.state.completedData,
                choosedOrder: -1,
                choosedMenu: []
            })
        } else {
            let count_arr = [];
            for (let i = 0; i < this.state.data[0].order.length; i++) {
                if (i == 4) break;
                count_arr.push(i);
            }
            this.setState({
                completedData: this.state.completedData,
                choosedOrder: 0,
                choosedMenu: count_arr
            })
        }

    }

    $target.addEventListener('click', (e) => {
        if (this.state.presentPage == 'recipe') {
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
                        if (this.state.data[e.target.closest('div').dataset.index]) {
                            for (let i = 0; i < this.state.data[e.target.closest('div').dataset.index].order.length; i++) {
                                if (i == 4) break;
                                count_arr.push(i);
                            }
                            this.setState({
                                choosedOrder: e.target.closest('div').dataset.index,
                                choosedMenu: count_arr
                            })
                        } else {
                            for (let i = 0; i < this.state.completedData[e.target.closest('div').dataset.index - this.state.data.length].order.length; i++) {
                                if (i == 4) break;
                                count_arr.push(i);
                            }
                            this.setState({
                                choosedOrder: e.target.closest('div').dataset.index,
                                choosedMenu: count_arr
                            })
                        }

                    } else this.setState({ choosedOrder: -1 })
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
                        if (this.state.choosedMenu.length < 4) {
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
                if (e.target.closest('div').classList.contains('order__menu__complete__btn')) {
                    if (e.target.closest('div').parentElement.parentElement.classList.contains('completed')) {
                        e.target.closest('div').parentElement.parentElement.classList.remove('completed');
                        e.target.closest('div').classList.remove('completed');
                        const index = e.target.closest('div').dataset.index;
                        if (this.state.data[this.state.choosedOrder]) {
                            this.state.data[this.state.choosedOrder].order[index].done = false;
                        } else {
                            this.state.completedData[this.state.choosedOrder - this.state.data.length].order[index].done = false;
                        }
                        e.target.closest('div').firstElementChild.innerText = '마침'

                        if (!e.target.closest('div').parentElement.parentElement.classList.contains('selected')) {
                            if (this.state.choosedMenu.length < 4) {
                                e.target.closest('div').parentElement.parentElement.classList.add('selected');
                                this.state.choosedMenu.push(parseInt(e.target.closest('div').dataset.index))
                            }
                        }
                        this.setState({
                            choosedMenu: this.state.choosedMenu
                        })

                    } else {
                        e.target.closest('div').parentElement.parentElement.classList.add('completed');
                        e.target.closest('div').classList.add('completed');
                        const index = e.target.closest('div').dataset.index;
                        if (this.state.data[this.state.choosedOrder]) {
                            this.state.data[this.state.choosedOrder].order[index].done = true;
                        } else {
                            this.state.completedData[this.state.choosedOrder - this.state.data.length].order[index].done = true;
                        }
                        e.target.closest('div').firstElementChild.innerText = '제조'

                        if (e.target.closest('div').parentElement.parentElement.classList.contains('selected')) {
                            e.target.closest('div').parentElement.parentElement.classList.remove('selected');
                            this.state.choosedMenu = this.state.choosedMenu.filter((value, index, arr) => {
                                return value != e.target.closest('div').dataset.index;
                            });

                        }
                        this.setState({
                            choosedMenu: this.state.choosedMenu
                        })
                    }

                }


            }
            if (e.target.closest('button')) {
                if (e.target.closest('button').id == 'allcooked') {
                    if (this.state.data[this.state.choosedOrder]) {
                        // this.state.completedData.push(this.state.data[this.state.choosedOrder]);
                        recipeChat.emit("completedrecipe", {
                            name: 'recipeDevice',
                            room: 'completedrecipe',
                            msg: this.state.data[this.state.choosedOrder]
                        });


                    }
                }else if(e.target.closest('button').id == 'recipe_page_btn') {
                    this.setState({
                        presentPage: 'baseRecipe'
                    })
                }
            }
        }else {
            if(e.target.closest('button')) {
                if(e.target.closest('button').id == 'recipe_page_btn') {
                    this.setState({
                        presentPage: 'recipe'
                    })
                }
            }
        }
    })
}