const { ipcRenderer } = window.electron

const ActionWindow = (): JSX.Element => {
  const handleWindowClose = (): void => {
    ipcRenderer.send('window-close')
  }

  const handleWindowMaxmize = (): void => {
    ipcRenderer.send('window-maxmize')
  }

  const handleWindowMinimize = (): void => {
    ipcRenderer.send('window-minimize')
  }

  return (
    <div className="button_actions flex gap-1 mb-2 bg-slate-300">
      <button
        onClick={handleWindowClose}
        className="button_close hover:bg-danger-500 nodragable"
      ></button>
      <button
        onClick={handleWindowMaxmize}
        className="button_maxmize hover:bg-warning-400 nodragable"
      ></button>
      <button
        onClick={handleWindowMinimize}
        className="button_minimize hover:bg-success-400 nodragable"
      ></button>

      <div>
        Web
      </div>
    </div>
  )
}

export default ActionWindow
