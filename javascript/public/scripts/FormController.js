const FormController = {
  async submit(postData) {
    let redirectToHome = false
    const [endpoint, method] = 'id' in postData ? ['update', 'patch'] : ['add', 'put']
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      console.group(`${method.toUpperCase()} to /api/${endpoint}`)
      console.log('status', res.status)
      if (res.ok) {
        const message = await res.text()
        console.log(message)
        redirectToHome = true
      }
      console.groupEnd()
    } catch (e) {
      console.error(e)
      alert(e.message)
    } finally {
      if (redirectToHome) window.location.href = '/'
    }
  }
}