export const moonrakerUrl = 'https://printer.caioabrahao.com.br'

let token: string | null = null
let refreshToken: string | null = null

export async function login(username:string, password:string) {
    const response = await fetch(
        `${moonrakerUrl}/access/login`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
            "source": "moonraker"
        })
        }
    )

    if (!response.ok) {
        throw new Error('Login failed')
    }

    const data = await response.json()

    token = data.result.token
    refreshToken = data.result.refresh_token

    console.log('Logged in as:', data.result.username)

    return data.result
}

export async function getTemperatures() {

    if (!token) {
        throw new Error('Not logged in')
    }

    const response = await fetch(
        `${moonrakerUrl}/printer/objects/query?extruder=temperature,target`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    if (!response.ok) {
        throw new Error('Failed to get temperatures')
    }

    return await response.json()
}