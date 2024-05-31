import { ChevronsLeft, ChevronsRight, Globe, Plus, X } from 'react-feather'
import ActionWindow from './components/Action-window'
import { MutableRefObject, createRef, useEffect, useRef, useState } from 'react'
const { ipcRenderer } = window.electron
// const device_size = {
//   width: window.screen.width,
//   height: window.screen.height
// }

function App(): JSX.Element {
  const browserRef = useRef<Electron.WebviewTag>(null)
  const urlRef = useRef<HTMLInputElement>(null)
  const tabsWebViewRef = useRef<Array<MutableRefObject<Electron.WebviewTag>>>([])
  const [showSidebar, setShowSidebar] = useState(true)
  const [isMaximized, setIsMaximized] = useState(false)
  const [tabs, setTabs] = useState([
    {
      id: 0,
      title: 'DockDockGo',
      url: 'https://duckduckgo.com/?q=&kae=d&kbc=1&kl=br-pt&k7=2a2a2a&kj=ffcc66&k18=1&k8=aaaaaa&kaa=ffcc66&t=h_&ia=web',
      favicon: ''
    }
  ])
  const [tabActive, setTabActive] = useState(0)

  tabsWebViewRef.current = tabs.map((item, i) => tabsWebViewRef.current[i] ?? createRef())

  const headleGoUrl = (id): void => {
    const urlTest = new RegExp(/(\..*)/gi)
    const urlTestHttp = new RegExp(/(http(s?):\/\/)/gi)
    console.log(tabsWebViewRef)
    console.log(urlRef)
    if (urlRef.current != null && urlTest.test(urlRef.current.value)) {
      if (urlTestHttp.test(urlRef.current?.value)) {
        if (tabsWebViewRef.current[id].current != null)
          tabsWebViewRef.current[id].current.loadURL(urlRef.current?.value)
      } else {
        if (tabsWebViewRef.current[id].current != null)
          tabsWebViewRef.current[id].current.loadURL(`http://${urlRef.current?.value}`)
      }
    } else {
      if (tabsWebViewRef.current[id] != null)
        tabsWebViewRef.current[id].current.loadURL(
          `https://duckduckgo.com/?q=${urlRef.current?.value}&kae=d&kbc=1&kl=br-pt&k7=2a2a2a&kj=ffcc66&k18=1&k8=aaaaaa&kaa=ffcc66&t=h_&ia=web`
        )
    }
  }

  const headleUpdateUrl = (event): void => {
    if (urlRef.current != null)
      urlRef.current.value = tabsWebViewRef.current[tabActive].current.getURL()
    setTabs((old) => {
      old[tabActive].title = tabsWebViewRef.current[tabActive].current.getTitle()
      return [...old]
    })
  }

  const handleWindowMaxmized = (status): void => {
    setIsMaximized(status)
  }

  const handleAddNewTab = (): void => {
    setTabs((old) => {
      return [
        ...old,
        {
          id: old.length,
          title: 'Pagina em branco' + (old.length + 1),
          url: 'about:blank',
          favicon: ''
        }
      ]
    })
  }

  useEffect(() => {
    ipcRenderer.on('window-maximized', () => handleWindowMaxmized(true))
    ipcRenderer.on('window-unmaximized', () => handleWindowMaxmized(false))
  }, [])

  useEffect(() => {
    console.log(tabsWebViewRef.current[0].current)
    tabsWebViewRef.current.map((element, i) => {
      if (element.current != null) {
        element.current.addEventListener('did-navigate-in-page', headleUpdateUrl)
        element.current.addEventListener('will-navigate', headleUpdateUrl)
        element.current.addEventListener('page-favicon-updated', (fav): void => {
          setTabs((old) => {
            old[tabActive].favicon = fav.favicons[0]
            return [...old]
          })
        })
      }
    })
    if (tabsWebViewRef.current[tabs.length - 1].current != null) {
      tabsWebViewRef.current[tabs.length - 1].current.addEventListener(
        'did-navigate-in-page',
        headleUpdateUrl
      )
      tabsWebViewRef.current[tabs.length - 1].current.addEventListener(
        'will-navigate',
        headleUpdateUrl
      )
      tabsWebViewRef.current[tabs.length - 1].current.addEventListener(
        'did-finish-load',
        headleUpdateUrl
      )
      tabsWebViewRef.current[tabs.length - 1].current.addEventListener('dom-ready', headleUpdateUrl)
    }
  }, [tabs])

  const handleSidebar = (): void => {
    setShowSidebar(!showSidebar)
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
                e.key == 'Enter' && headleGoUrl(tabActive)
              }}
            />
          </div>
        </div>
        <div className="content_sidebar flex flex-1 flex-col items-start mr-2 min-w-[280px]">
          <button onClick={handleAddNewTab} className="px-3 py-2 flex gap-2">
            <Plus />
            Add new tab
          </button>
          <div className="flex flex-col items-start gap-2 w-full overflow-x-auto bg-secondary-950 bg-opacity-5 p-2 rounded-lg">
            {tabs.map((tab, i) => {
              return (
                <div key={i} className="flex gap-2 w-full">
                  <button
                    onClick={(): void => setTabActive(tab.id)}
                    className={`${
                      tabActive == tab.id
                        ? 'bg-primary-50 bg-opacity-100 shadow-md'
                        : 'bg-secondary-950 bg-opacity-30 text-primary-50 hover:text-secondary-950 hover:bg-primary-50 hover:bg-opacity-50'
                    } px-3 py-2 rounded-lg flex gap-1 flex-1 items-center`}
                  >
                    <i>
                      {tab.favicon != null && tab.favicon != '' ? (
                        <img
                          src={`${tab.favicon}`}
                          className="min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px]"
                          width="32px"
                          height="32px"
                        />
                      ) : (
                        <Globe size={19} />
                      )}
                    </i>
                    <span className="text-left line-clamp-1">{tab.title}</span>
                  </button>
                  <button
                    className={`${
                      tabActive == tab.id
                        ? 'bg-primary-50 bg-opacity-100'
                        : 'bg-secondary-950 bg-opacity-30 text-primary-50 hover:text-secondary-950 hover:bg-primary-50 hover:bg-opacity-50'
                    } px-3 py-2 rounded-lg`}
                  >
                    <X size={16} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        <div className="footer_sidebar"></div>
      </div>
      <div className="basis-full bg-primary-50 m-2 ml-0 rounded-lg shadow-md flex overflow-hidden">
        {tabs.map((tab, i) => {
          return (
            <webview
              key={tab.id}
              ref={tabsWebViewRef.current[i]}
              id={`tab${tab.id}`}
              src={tab.url}
              className={`flex-1 rounded-lg nodragable ${tabActive == tab.id ? 'flex' : 'hidden'}`}
            ></webview>
          )
        })}
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
