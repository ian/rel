const port = 3282

;(async () => {
  console.log()
  console.log(`rel running on http://localhost:${port}`)
  
  await new Promise(() => {
    setTimeout(() => {}, 10000)
  })
})()
