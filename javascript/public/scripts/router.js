(async function () {
  const { pathname } = window.location
  const container = document.getElementById('main-content')
  if (!container) throw new Error('Cannot load page as "main-content" was missing')
  
  /**
   * 
   * @param {string} path 
   */
  async function loadContentForPath(path) {
    const script = document.createElement('script')
    script.src = '/scripts/' + path + '.js'
    script.defer = true
      
    const homePageResponse = await fetch(`/${path}.html`)
    const homePageString = await homePageResponse.text()
    container.innerHTML = homePageString;
    document.head.appendChild(script)
  }
  const validPaths = new Set(['','add','update'])
  const [_,path,_id] = pathname.split('/') 
  if (validPaths.has(path)) loadContentForPath(path || 'home')
})()