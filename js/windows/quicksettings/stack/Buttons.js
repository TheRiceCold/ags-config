import { Widget } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { icons } from '../../../constants/main.js'

const buttons = [ 
  { 
    icon: FontIcon('󰂚'),
    title: 'notifications',
    tooltipText: 'Notifications',
  },
  {
    icon: FontIcon('󰤨'),
    title: 'wifi',
    tooltipText: 'Wi-Fi',
  },
  {
    icon: FontIcon('󰂯'),
    title: 'bluetooth',
    tooltipText: 'Bluetooth',
  },
  {
    icon: FontIcon(icons.audio.volume.high),
    title: 'audio',
    tooltipText: 'Audio',
  },
  {
    icon: FontIcon(icons.mpris.fallback),
    title: 'mpris',
    tooltipText: 'Media',
  },
  {
    icon: Widget.Icon(icons.ai.chatgpt),
    title: 'chatgpt',
    tooltipText: 'ChatGPT',
  }
]

const Button = ({ state, icon, title, ...props }) => Widget.Button({
  ...props,
  child: icon,
  className: 'sidebar-iconbutton',
  onClicked: () => state.value = title,
}).hook(state, btn => {
  btn.toggleClassName('active', title === state.value)
})

export default state => Widget.Box({
  hpack: 'center',
  className: 'sidebar-togglebox spacing-h-10',
  children: buttons.map(props => Button({ state, ...props }))
})
