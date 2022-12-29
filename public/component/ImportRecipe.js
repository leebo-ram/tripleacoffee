export default function ImportRecipe({ $target, initialState }) {
    this.state = {
        $target,
        initialState
    }
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }

    this.$element = document.createElement('form');
    this.$element.className = 'ImportRecipe';
    this.$element.encoding = 'multipart/form-data';
    this.$element.action = "http://localhost:3000/addmenu";
    this.$element.method = "post";
    
    $target.appendChild(this.$element)

    this.render = () => {
        this.$element.innerHTML = `
            <input type="text" placeholder="이름" id="m_name" name="m_name">
            <input type="text" placeholder="가격" id="m_price" name="m_price">
            <input type="text" placeholder="레시피" id="m_recipe" name="m_recipe">
            <input type="file" placeholder="이미지" id="m_img" name="m_img" accept="image/*">
            <input type="button" value="등록" id="m_btn" name="m_btn">
            <input type="submit" value="submit">
        `
    }
    
    this.render()

    const btn = document.getElementById("m_btn");
    console.log(btn)
    this.$element.addEventListener('click', (e) => {
        const $btn = e.target.closest("input")
        const m_name = document.getElementById("m_name").value;
        const m_price = document.getElementById("m_price").value;
        const m_recipe = document.getElementById("m_recipe").value;
        const m_img = document.getElementById("m_img").files[0];
        console.log(m_img)
        if($btn.type == "button") {
            const post = {
                m_name: m_name,
                m_price : m_price,
                m_recipe : m_recipe,
                m_img: m_img,
            }
            fetch("http://localhost:3000/addmenu", {
                method: "post",
                headers: {},
                body: post,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        }
    })
}
