import React from 'react'
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize,
  Minimize2,
  Sidebar,
  RotateCcw
} from 'react-feather'
import Button from './Button'

const { ipcRenderer } = window.electron

export interface ActionWindowProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode
  sidebarEvent(): void
  reloadEvent(): void
  backEvent(): void
  forwardEvent(): void
}

const ActionWindow: React.FC<ActionWindowProps> = (props): JSX.Element => {
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
    <div className="button_actions flex justify-between gap-1 mb-2 items-center">
      <div className="flex gap-1 window_action nodragable">
        <Button
          className="rounded-full p-2 bg-primary-100 hover:bg-primary-50"
          onClick={handleWindowClose}
        >
          <X size={16} />
        </Button>
        <Button
          className="rounded-full p-2 bg-primary-100 hover:bg-primary-50"
          onClick={handleWindowMaxmize}
        >
          <Maximize size={16} />
        </Button>
        <Button
          className="rounded-full p-2 bg-primary-100 hover:bg-primary-50"
          onClick={handleWindowMinimize}
        >
          <Minimize2 size={16} />
        </Button>
        <Button
          className="rounded-full p-2 bg-primary-100 hover:bg-primary-50"
          onClick={props.sidebarEvent}
        >
          <Sidebar size={16} />
        </Button>
      </div>

      <div className="flex gap-2 nodragable">
        <Button>
          <ChevronLeft onClick={props.backEvent} size={16} />
        </Button>
        <Button>
          <ChevronRight onClick={props.forwardEvent} size={16} />
        </Button>
        <Button onClick={props.reloadEvent}>
          <RotateCcw size={16} />
        </Button>
      </div>
    </div>
  )
}

export default ActionWindow
