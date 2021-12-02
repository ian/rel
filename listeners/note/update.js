export default (key, streamId, data) => {
    console.log(`[MUTATION::UPDATE] key: ${key} stream ID: ${streamId} payload: ${JSON.stringify(data)}]`)
}