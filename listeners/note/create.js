export default (key, streamId, data) => {
    console.log(`[MUTATION::CREATE] key: ${key} stream ID: ${streamId} payload: ${JSON.stringify(data)}]`)
}