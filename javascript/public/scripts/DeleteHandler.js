const DeleteHandler = {
  async delete(id) {
    try {
      const res = await fetch(`/api/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.group(`DELETE to /api/delete/${id}`)
      console.log('status', res.status)
      if (res.ok) {
        const message = await res.text()
        console.log(message)
      }
      console.groupEnd()
      window.location.reload()
    } catch (e) {
      console.error(e)
      alert(e.message)
    }
  }
}