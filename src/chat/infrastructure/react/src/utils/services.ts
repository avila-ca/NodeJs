export const baseUrl = 'http://localhost:4000'

export const postRequest =async (url, body) => {
    const response = await fetch(url, {
        method:"POST",
        mode: 'cors',
        headers:{
            "Content-Type": "application/json"
        },
        body
    })

    const data = await response.json()
    console.log('en services fetch', response);
    
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

export const getRequest =async (url, headers) => {
    const {token} = headers
    const response = await fetch(url, {
        method:"GET",
        mode: 'cors',
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        },
    })

    const data = await response.json()
    console.log('en services fetch', response);
    
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



export const postHeaderRequest =async (url, body, headers) => {
    const response = await fetch(url, {
        method:"POST",
        mode: 'cors',
        headers:{
            "Authorization": `Bearer ${headers.token}`,
            "Content-Type": "application/json"
        },
        body
    })

    const data = await response.json()
    console.log('en services fetch', response);
    
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