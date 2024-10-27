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
      } else {
        throw new Error(`Could not delete todo #${id}`)
      }
      console.groupEnd()
      return true
    } catch (e) {
      console.error(e)
      alert(e.message)
      return false
    }
  }
}