export const baseUrl = 'http://localhost:4000'

export const postRequest =async (url, body) => {
    console.info('bodyyy:   ', body)
    const response = await fetch(url, {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body
    })

    const data = await response.json()

    if (!response.ok) {
        let message = "An errr ocurred"

        if (data?.message) {
            message = data.message
        }else{
            message = data
        }

        return {error: true, message}
    }
    return data
}

