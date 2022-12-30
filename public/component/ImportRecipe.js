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
    //this.$element.action = "/addmenu";
    //this.$element.method = "post";
    
    $target.appendChild(this.$element)

    this.render = () => {
        this.$element.innerHTML = `
            <input type="text" placeholder="이름" id="m_name" name="m_name">
            <input type="text" placeholder="가격" id="m_price" name="m_price">
            <textarea placeholder="레시피" id="m_recipe" name="m_recipe"></textarea>
            <input type="file" placeholder="이미지" id="m_img" name="m_img" accept="image/*">
            <input type="button" value="등록" id="m_btn" name="m_btn">
        `
    }
    
    this.render()

    const btn = document.getElementById("m_btn");
    this.$element.addEventListener('click', (e) => {
        const formData = new FormData();
        
        const $btn = e.target.closest("input")
        formData.append('m_name', document.getElementById("m_name").value);
        formData.append('m_price', document.getElementById("m_price").value);
        formData.append('m_recipe', document.getElementById("m_recipe").value);
        formData.append('m_img', document.getElementById("m_img").files[0]);

        if($btn.type == "button") {
            fetch("/addmenu", {
                method: "post",
                headers: {},
                body: formData,
            })
            .then((res) => res.json())
            .then((data) => console.log(data[0]))
            .catch((err) => console.log(err))
            document.getElementById("m_name").value = "";
            document.getElementById("m_price").value = "";
            document.getElementById("m_recipe").value = "";
        }
    })
}
