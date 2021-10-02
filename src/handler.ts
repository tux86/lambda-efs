import { v4 as uuidv4 } from 'uuid'
export const handler = async (event: any, context: any) => {


    const data = {
        uuid: uuidv4()
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
}
