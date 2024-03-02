import { setupCursorHover } from 'misc/cursorhover'
import { ButtonProps } from 'types/widgets/button'

type PanelButtonProps = ButtonProps & {
  window?: string,
}

export default ({
  window = '',
  child,
  setup,
  ...props
}: PanelButtonProps) => Widget.Button({
  child: Widget.Box({ child }),
  setup: self => {
    setupCursorHover(self)
    let open = false

    self.toggleClassName('panel-button')
    self.toggleClassName(window)
    self.toggleClassName('flat')

    self.hook(App, (_, win, visible) => {
      if (win !== window) return

      if (open && !visible) {
        open = false
        self.toggleClassName('active', false)
      }

      if (visible) {
        open = true
        self.toggleClassName('active')
      }
    })

    if (setup) setup(self)
  },
  ...props,
})
