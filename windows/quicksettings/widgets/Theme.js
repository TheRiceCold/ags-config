import { Widget } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { ArrowToggleButton, Menu, opened } from '../ToggleButton.js'

import icons from '../../../icons.js'
import themes from '../../../themes.js'
import options from '../../../options.js'
import { setTheme, openSettings } from '../../../settings/theme.js'

export const ThemeToggle = () => ArrowToggleButton({
  name: 'theme',
  icon: Widget.Label({ binds: [['label', options.theme.icon]] }),
  label: Widget.Label({ binds: [['label', options.theme.name]] }),
  connection: [opened, () => opened.value === 'theme'],
  activate: () => opened.setValue('theme'),
  activateOnArrow: false,
  deactivate: () => { },
})

export const ThemeSelector = () => Menu({
  name: 'theme',
  icon: Widget.Label({ binds: [['label', options.theme.icon]] }),
  title: Widget.Label('Theme Selector'),
  content: [
    ...themes.map(({ name, icon }) => Widget.Button({
      onClicked: () => setTheme(name),
      child: Widget.Box({
        children: [
          Widget.Label(icon),
          Widget.Label(name),
          FontIcon({
            icon: icons.ui.tick,
            hexpand: true,
            hpack: 'end',
            binds: [['visible', options.theme.name, 'value', v => v === name]],
          }),
        ],
      }),
    })),
    Widget.Separator(),
    Widget.Button({
      onClicked: openSettings,
      child: Widget.Box({
        children: [ FontIcon(icons.ui.settings), Widget.Label('Theme Settings') ],
      }),
    }),
  ],
})
