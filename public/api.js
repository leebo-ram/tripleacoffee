const API_END_POINT = '';

const request = async (req) => {
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

export {request};
