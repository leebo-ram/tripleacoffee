const API_END_POINT = '';

const request = async (req, body) => {
    const bodystr = JSON.stringify(body)
    if(body) {
        try {
            const res = await fetch(`${API_END_POINT}/${req ? req : ''}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: bodystr,
            })
    
            if(!res.ok) {
                throw new Error('서버 에러')
            }
            return await res.json();
        } catch(e) {
            throw new Error(`에러 ${e.message}`)
        }
    }else {
        try {
            const res = await fetch(`${API_END_POINT}/${req ? req : ''}`)
    
            if(!res.ok) {
                throw new Error('서버 에러')
            }
    
            return await res.json();
        } catch(e) {
            throw new Error(`에러 ${e.message}`)
        }
    }

}

export {request};
