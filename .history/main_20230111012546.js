'use strict';

// Menu_v2.html - Menu filtering
window.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target == null || e.target == undefined) return;
    // if (!e.target.closest('button')) return;

    if (e.target.classList.contains('category__btn')) {
        const active = document.querySelector('.category__btn.selected');
        if (active != null) {
            active.classList.remove('selected');
        }
        if (!e.target.classList.contains('selected'))
            e.target.classList.add('selected');
        const filter = e.target.closest('button').dataset.filter;
        const menus = document.querySelectorAll('.wrap');
        menus.forEach((wrap) => {
            // console.log(wrap.dataset.type);
            if (filter === '*' || filter === wrap.dataset.type) {
                wrap.classList.remove('invisible');
            } else {
                wrap.classList.add('invisible');
            }
        });
        return;
    }

    //---------------------------------------

    // 수량 증감 btn
    console.log(e.target.closest('button'));
    // Menu_v2.html - 하단 장바구니 부분,
    if (e.target.closest('button')) {
        if (e.target.closest('button').className == 'showMenu__plus__btn') {
            console.log('+');
            console.log(e.target.closest('button').firstElementChild.value);
            const target = document.getElementById(
                `${e.target.closest('button').firstElementChild.value}`
            );
            console.log(target);
            target.value++;
            return;
        } else if (
            e.target.closest('button').className == 'showMenu__minus__btn'
        ) {
            console.log('-');
            const target = document.getElementById(
                `${e.target.closest('button').firstElementChild.value}`
            );
            console.log(target);
            if (target.value > 1) {
                target.value--;
            }
            return;

            // option.html - 수량증감 btn
        } else if (
            e.target.closest('button').className == 'prod-quantity__plus'
        ) {
            console.log('+');
            console.log(e.target.closest('button').firstElementChild.value);
            const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
            console.log(target);
            target.value++;
            return;
        } else if (
            e.target.closest('button').className == 'prod-quantity__minus'
        ) {
            console.log('-');
            const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
            console.log(target);
            if (target.value > 1) {
                target.value--;
            }
            return;
        }
    }

    //---------------------------------------

    // inputCertification.html - 인증번호 입력
    const certificationBtn = document.getElementById('certification__Num');
    if (e.target.closest('button')) {
        if (e.target.closest('button').dataset.val) {
            if (certificationBtn.value.length < 4) {
                certificationBtn.value +=
                    e.target.closest('button').dataset.val;
                console.log(certificationBtn.value.length);
            }
            return;
        }
        if (e.target.closest('button').className == 'number__del__ALL') {
            certificationBtn.value = '';
            return;
        }
        if (e.target.closest('button').className == 'number__pop') {
            certificationBtn.value = certificationBtn.value.slice(0, -1);
            return;
        }
    }

    //---------------------------------------

    // stampMemberCheck.html - 핸드폰 번호 입력
    if (e.target.closest('button')) {
        const mobileNumberBtn = document.getElementById('mobileNumber').value;

        // Button 클릭시 target에 입력
        if (e.target.closest('button').dataset.val) {
            if (mobileNumberBtn.value.length < 13) {
                console.log(mobileNumberBtn);
                mobileNumberBtn.value += e.target.closest('button').dataset.val;
                console.log(mobileNumberBtn.value.length);

                // 전화번호 하이픈 자동생성
                let masking = '';
                for (let i = 0; i < mobileNumberBtn.value.length - 9; i++) {
                    masking += '*';
                }
                mobileNumberBtn.value = mobileNumberBtn.value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                    .replace(/(\-{1,2})$/g, '')

                    // 맨 끝 4자리만 마스킹 처리 => 010-1234-****
                    .replace(/(?<=.{9})./g, `${masking}`);
            }
            return;
        }

        // 전체 삭제
        if (e.target.closest('button').className == 'number__del__ALL') {
            mobileNumberBtn.value = '';
            return;
        }

        // 끝에서 하나만 삭제
        if (e.target.closest('button').className == 'number__pop') {
            mobileNumberBtn.value = mobileNumberBtn.value.slice(0, -1);
            return;
        }
    }

    //---------------------------------------

    // recipe Main(레시피 메인화면).html - select click on order list
    // 교환목록
    if (e.target.closest('div')) {
        if (e.target.closest('div').classList.contains('orderNum__list')) {
            const exchangeList = document.querySelector('.orderNum__list.selected');
            if (exchangeList != null) {
                exchangeList.classList.remove('selected');
            }
            if (!e.target.closest('div').classList.contains('selected')) {
                e.target.closest('div').classList.add('selected');
            }
            return;
        }
    }

    // 주문목록
    if (e.target.closest('div')) {
        if (e.target.closest('div').classList.contains('order__menu')) {
            console.log(e.target);
            if (e.target.closest('div').classList.contains('selected')) {
                e.target.closest('div').classList.remove('selected');
            } else if (!e.target.closest('div').classList.contains('selected')) {
                e.target.closest('div').classList.add('selected');
            }
            if (e.target.closest('p').classList.contains('selected')) {
                e.target.closest('p').classList.remove('selected');
            } else if (!e.target.closest('p').classList.contains('selected')) {
                e.target.closest('p').classList.add('selected');
            }
            return;
        }


        // 해제 btn && 마침 btn 선택시 btn의 배경색깔 변경 단, 각 메뉴마다 btn 1개만 선택 불가
        if (e.target.closest('div')) {
            if (e.target.closest('div').classList.contains('order__menuBtns')) {
                console.log(e.target);
                if (e.target.closest('div').classList.contains('selected')) {
                    e.target.closest('div').classList.remove('selected');
                } else if (!e.target.closest('div').classList.contains('selected')) {
                    e.target.closest('div').classList.add('selected');
                }
            }
            return;
        }

        if(e.target.closest('p')) {
            if(e.target.closest('p').closest.getElementsByClassName('order__menu__name')){
                const fontColor = document.getElementsByClassName('.order__menu__name.deco');
                if (fontColor != null) {
                    console.log('안녕하세요');
                }
            }

        }

        const testElements = document.getElementsByClassName('order__menu__name');
        const fontColor = document.getElementsByClassName('.order__menu__name.deco');

        





            // 메뉴 FontColor Change 실패 코드
            // if (e.target.closest('p')) {
            //     if (e.target.closest('p').classList.contains('order__menu__name')) {
            //         const fontColor = document.querySelector('.order__menu__name.deco');
            //         if (fontColor != null) {
            //             fontColor.classList.remove('deco');
            //         }
            //         if (!e.target.closest('p').classList.contains('deco')) {
            //             e.target.closest('p').classList.add('deco');
            //         }
            //         return;
            //     }
            // }
            
            
            
            
        return;
    }
        






    

    // 해제 btn 단, 연속적인 선택 불가
    // if (e.target.closest('div')) {
    //     if (e.target.closest('div').classList.contains('order__menuBtns')) {
    //         const active = document.querySelector('.order__menuBtns.selected');
    //         if (active != null) {
    //             active.classList.remove('selected');
    //         }
    //         if (!e.target.closest('div').classList.contains('selected')) {
    //             e.target.closest('div').classList.add('selected');
    //         }
    //         return;
    //     }
    // }

    //---------------------------------------

    // recipe Base(베이스 레시피).html - select click on order list
    // 베이스 종류
    if (e.target.closest('div')) {
        if (e.target.closest('div').classList.contains('base__menu')) {
            const active = document.querySelector('.base__menu.selected');
            if (active != null) {
                active.classList.remove('selected');
            }
            if (!e.target.closest('div').classList.contains('selected')) {
                e.target.closest('div').classList.add('selected');
            }
            return;
        }
    }

    // 베이스 레시피1,2 둘 중 하나 선택
    if (e.target.closest('div')) {
        if (e.target.closest('div').classList.contains('base__recipes')) {
            const active = document.querySelector('.base__recipes.selected');
            if (active != null) {
                active.classList.remove('selected');
            }
            if (!e.target.closest('div').classList.contains('selected')) {
                e.target.closest('div').classList.add('selected');
            }
            return;
        }
    }
});



        
// var see = document.getElementsByClassName('orderList_box');
// var see = document.getElementsByClassName('order__menu__btn');
// var see = document.getElementsByClassName('order__menu__name');
// const parent = see.children.parentElement;
console.log('-------------');
// console.log(children.parentElement);
// const matches = Node.parentElement('order__menu__name');
// console.log(matches);
console.log('안녕');

// const myElement = document.getElementsByClassName('order__menu__name');
const myElement2 = document.getElementsByClassName('order__menu__name');
// console.log(myElement);
console.log(myElement2[1], myElement2[3]);
// console.log(myElement2[0,1,2,3,4,5]); //undefined


const ptags = document.getElementsByClassName('order__menu__option');
console.log(ptags);