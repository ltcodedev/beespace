import { ChevronsLeft, ChevronsRight } from 'react-feather'
import ActionWindow from './components/Action-window'
import { useEffect, useRef, useState } from 'react'
const { ipcRenderer } = window.electron

function App(): JSX.Element {
  const browserRef = useRef<Electron.WebviewTag>(null)
  const urlRef = useRef<HTMLInputElement>(null)
  const [showSidebar, setShowSidebar] = useState(true)
  const [isMaximized, setIsMaximized] = useState(false)

  const headleGoUrl = (): void => {
    const urlTest = new RegExp(/(\..*)/gi)
    const urlTestHttp = new RegExp(/(http(s?):\/\/)/gi)
    console.log(browserRef)
    console.log(urlRef)
    if (urlRef.current != null && urlTest.test(urlRef.current.value)) {
      if (urlTestHttp.test(urlRef.current?.value)) {
        if (browserRef.current != null) browserRef.current.loadURL(urlRef.current?.value)
      } else {
        if (browserRef.current != null)
          browserRef.current.loadURL(`http://${urlRef.current?.value}`)
      }
    } else {
      if (browserRef.current != null)
        browserRef.current.loadURL(
          `https://duckduckgo.com/?q=${urlRef.current?.value}&kae=d&kbc=1&kl=br-pt&k7=2a2a2a&kj=ffcc66&k18=1&k8=aaaaaa&kaa=ffcc66&t=h_&ia=web`
        )
    }
  }

  const headleUpdateUrl = (event): void => {
    if (urlRef.current != null) urlRef.current.value = event.url
  }

  const handleWindowMaxmized = (status): void => {
    setIsMaximized(status)
    console.log('window', status)
  }

  useEffect(() => {
    if (browserRef.current != null)
      browserRef.current.addEventListener('did-navigate-in-page', headleUpdateUrl)
    if (browserRef.current != null)
      browserRef.current.addEventListener('will-navigate', headleUpdateUrl)
    ipcRenderer.on('window-maximized', () => handleWindowMaxmized(true))
    ipcRenderer.on('window-unmaximized', () => handleWindowMaxmized(false))
  }, [])

  const handleSidebar = (): void => {
    setShowSidebar(!showSidebar)
    console.log('sidebar false')
  }

  return (
    <div
      className={`appcontainer flex flex-1 bg-gradient-to-br from-primary-300 to-primary-800 transition-all first-letter duration-300 ${
        isMaximized ? 'rounded-none' : 'rounded-lg'
      }`}
    >
      <div
        className={`nodragable flex flex-col transition-all m-2 mr-0 duration-300 overflow-visible ease-in-out visible ${
          showSidebar == true ? 'w-[300px]' : 'w-[0px] invisible overflow-hidden'
        }`}
      >
        <div className="header_sidebar dragable mb-3 mr-2 min-w-[280px]">
          <ActionWindow />
          <div className="url_window w-full nodragable">
            <input
              type="text"
              className="rounded-full p-2 px-4 text-secondary-600 bg-primary-50 bg-opacity-80 shadow-md w-full"
              ref={urlRef}
              onKeyDown={(e): void => {
                e.key == 'Enter' && headleGoUrl()
              }}
            />
          </div>
        </div>
        <div className="content_sidebar flex flex-1"></div>
        <div className="footer_sidebar"></div>
      </div>
      <div className="basis-full bg-primary-50 m-2 ml-0 rounded-lg shadow-md flex overflow-hidden">
        <webview
          ref={browserRef}
          id="foo"
          src="https://duckduckgo.com/"
          className="flex-1 rounded-lg nodragable"
        ></webview>
      </div>
      <button
        onClick={handleSidebar}
        className={`nodragable bg-primary-50 w-10 h-10 flex justify-center items-center shadow-md absolute transition-all delay-75 ${
          showSidebar == true
            ? 'rounded-lg bottom-2 left-2'
            : 'bg-opacity-30 hover:bg-opacity-100 rounded-full bottom-5 left-5'
        }`}
      >
        {showSidebar ? (
          <ChevronsLeft className="text-secondary-700" />
        ) : (
          <ChevronsRight className="text-secondary-700" />
        )}
      </button>
    </div>
  )
}

export default App
