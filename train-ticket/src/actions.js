export function createSet(payload) {
    return {
        type: 'set',
        payload
    }
}

export function createAdd(payload) {
    return {
        type: 'add',
        payload
    }
}