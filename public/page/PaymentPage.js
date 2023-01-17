import ChooseOrderPage from "./paymentPages/ChooseOrderPage.js";
import StampMemberCheck from "./paymentPages/StampMemberCheck.js";
import StampUseAndEarnPage from "./paymentPages/StampUseAndEarnPage.js";
import StampUsePage from "./paymentPages/StampUsePage.js";
import InputCertificatioinPage from "./paymentPages/InputCertificationPage.js";

import { request } from "../api.js";
import PayCompletePage from "./paymentPages/payCompletePage.js";


export default function PaymentPage({ $target, initialState }) {
    
    //상태관리
    this.state = {
        ...initialState,
        presentPage: 'chooseOrder',
        choosedOrder: '매장',
        mem_stamp: 0,
        mem_mobile: '',
        saving_stamp: 0,
        used_stamp: 0,
        nth_content: 0,
        basket_quantity: 0,
        verified: false,
    }

    const chooseOrderPage = new ChooseOrderPage({
        $target
    });

    const stampMemberCheck = new StampMemberCheck({
        $target,
        presentPage: this.state.presentPage,
    });

    const stampUseAndEarnPage = new StampUseAndEarnPage({
        $target,
        presentPage: this.state.presentPage,
        mem_mobile: ''
    });

    const stampUsePage = new StampUsePage({
        $target,
        presentPage: this.state.presentPage,
        basket: this.state.basket,
        mem_stamp: this.state.mem_stamp,
        mem_mobile: this.state.mem_mobile,
        nth_content: this.state.nth_content
    })

    const inputcertificationPage = new InputCertificatioinPage({
        $target,
        presentPage: this.state.presentPage,
        mem_mobile: this.state.mem_mobile
    })

    const payCompletePage = new PayCompletePage({
        $target,
        presentPage: this.state.presentPage,
        mem_mobile: this.state.mem_mobile,
        mem_stamp: this.state.mem_stamp,
        saving_stamp: 0,
        used_stamp: this.state.used_stamp,
        basket: this.state.basket,
        orderNum: this.state.orderNum,
        choosedOrder: this.state.choosedOrder
    })

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        let basket_quantity = 0;
        this.state.basket.map(item => {
            this.state.totalPrice += parseInt(item.m_price);
            if(item.m_quantity > 1) {
                for(let i=0; i< item.m_quantity; i++) {
                    basket_quantity++;
                }
            }else {
                basket_quantity++;
            }
        });
        this.state.basket_quantity = basket_quantity;
        
        switch(this.state.presentPage) {
            case 'chooseOrder':
                chooseOrderPage.render();
                break;

            case 'stampMemberCheck':
                stampMemberCheck.setState({
                    presentPage: this.state.presentPage,
                });
                break;
            case 'stampUseAndEarn':
                stampUseAndEarnPage.setState({
                    presentPage: this.state.presentPage,
                    mem_mobile: this.state.mem_mobile,
                    basket: this.state.basket,
                    isLoaded: false
                });
                
                break;

            case 'stampUse':
                stampUsePage.setState({
                    presentPage: this.state.presentPage,
                    mem_mobile: this.state.mem_mobile,
                    mem_stamp: this.state.mem_stamp,
                    basket: this.state.basket,
                    nth_content: this.state.nth_content
                });
                break;

            case 'inputcertification':
                inputcertificationPage.setState({
                    presentPage: this.state.presentPage,
                    mem_mobile: this.state.mem_mobile,
                    mem_stamp: this.state.mem_stamp,
                })
                break;

            case 'payingComplete':
                payCompletePage.setState({
                    presentPage: this.state.presentPage,
                    mem_mobile: this.state.mem_mobile,
                    mem_stamp: this.state.mem_stamp,
                    saving_stamp: this.state.saving_stamp,
                    used_stamp: this.state.used_stamp,
                    basket: this.state.basket,
                    orderNum: this.state.orderNum,
                    choosedOrder: this.state.choosedOrder
                })
                break;

            default:

                break;
        }
    }

    const smsCertification = async () => {
            try {
                const smsResponse = await request('smsCertification', { phoneNumber: this.state.mem_mobile });
                return await smsResponse;
            } catch(e) {
                console.log(e);
            }
    }

    const smsVerify = async (verifyCode) => {
            try {
                const smsResponse = await request('verifysms', { 
                    phoneNumber: this.state.mem_mobile,
                    verifyCode: verifyCode 
                });
                return await smsResponse;
            } catch(e) {
                console.log(e);
            }
    }

    // 최상단 요소
    

    // 이벤트리스너
    $target.addEventListener('click', (e) => {
        // chooseOrderPage 클릭이벤트
        if(this.state.presentPage == 'chooseOrder') {
            if(e.target.closest('div').id) {
                if(e.target.closest('div').id == 'for_here') {
                    console.log('먹고가기')
                    this.setState({
                        choosedOrder: '매장',
                        presentPage: 'stampMemberCheck'
                    })
                }else if(e.target.closest('div').id == 'to_go') {
                    console.log('포장하기')
                    this.setState({
                        choosedOrder: '포장',
                        presentPage: 'stampMemberCheck'
                    })
                }
            }
            return;
        }else if(this.state.presentPage == 'stampMemberCheck') {
            if(e.target.closest('div')) {
                if(e.target.closest('div').className == 'input__mobileNumber__btn') {
                    const mobileInput = document.querySelector('#mobileNumber');
                    const mem_mobile = mobileInput.value + mobileInput.dataset.masked;
                    if(mobileInput.value.length == 13) {
                        this.setState({ 
                            mem_mobile: mem_mobile.replaceAll("-",'').replaceAll('*',''),
                            presentPage: 'stampUseAndEarn'
                        })
                    }
                }
            }
            if(e.target.closest('button')) {
                if(e.target.closest('button').className == 'pop__former__Btn') {
                    this.setState({
                        presentPage: 'chooseOrder'
                    })
                }else if(e.target.closest('button').className == 'pop__skip__Btn') {
                    this.setState({
                        presentPage: 'payingComplete'
                    })
                }
            }

        }else if(this.state.presentPage == 'stampUseAndEarn') {
            if(e.target.closest('div')) {
                if(e.target.closest('div').className == 'pop__boxing' && e.target.closest('div').id=="stamp_use") {
                    this.setState({
                        mem_stamp: e.target.closest('div').dataset.stamp,
                        count: 0,
                        totalPrice: 0,
                        presentPage: 'stampUse'
                    })

                }else if(e.target.closest('div').className == 'pop__boxing' && e.target.closest('div').id=="stamp_save") {
                    let count = 0;
                    this.state.basket.map(item => {
                        if(item.m_quantity > 1) {
                            for(let i=0; i< item.m_quantity; i++) {
                                if(item.m_category != 'Bakery' && item.m_category != 'Dessert & Waffle')
                                count++;
                            }
                        }else {
                            if(item.m_category != 'Bakery' && item.m_category != 'Dessert & Waffle')
                                count++;
                        }
                    });
                    this.setState({
                        mem_stamp: e.target.closest('div').dataset.stamp,
                        saving_stamp: count,
                        presentPage: 'payingComplete'
                    })
                }
            }
        }else if(this.state.presentPage == 'stampUse') {
            if(e.target.closest('button')) {
                if(e.target.closest('button').className == 'pop__use__Btn') {
                    smsCertification()
                    .then((data) => {
                        console.log(data)
                        if(!data) {
                            window.alert('sms 발송 실패')
                        }else {
                            this.setState({
                                presentPage: 'inputcertification',
                                used_stamp: document.querySelector('p.use_count').textContent.replace('개','')
                            })
                        }
                    })
                }
            }

            if (e.target.closest('div')) {
                if (e.target.closest('div').className == 'arrow_top') {
                    if (this.state.nth_content > 0) {
                        this.setState({
                            nth_content: this.state.nth_content - 1,
                        })
                    }
                } else if (e.target.closest('div').className == 'arrow__down') {
                    if (this.state.nth_content < this.state.basket_quantity - 4) {
                        this.setState({
                            nth_content: this.state.nth_content + 1,
                        });
                    }

                }
            }

        }else if(this.state.presentPage == 'inputcertification') {
            if(e.target.closest('button')) {
                if(e.target.closest('button').className == 'certification__btn') {
                    const verifyCode = document.getElementById('certification__Num').value;
                    smsVerify(verifyCode)
                    .then((data) => {
                        console.log(data)
                        if(!data) {
                            window.alert('sms 인증 실패')
                        }else {
                            window.alert('sms 인증 성공')
                            this.setState({
                                verified: true,
                            })
                        }
                    })
                }else if(e.target.closest('button').className == 'pop__order__Btn') {
                    if(this.state.verified) {
                        this.setState({
                            presentPage: 'payingComplete'
                        })
                    }else {
                        window.alert("sms 인증 필요")
                    }
                }
            }

        }




    })
}
