import { opt } from 'lib/option'
import { showWidget } from 'lib/variables'

const { datemenu, quicksettings } = showWidget

export default {
  tray: {
    ignore: opt([ 'KDE Connect Indicator', 'gromit-mpx' ]),
  },
  media: {
    length: opt(40),
    visualizer: { width: opt(8), height: opt(24) },
  },
  datemenu: {
    interval: 5000,
    // DOCS: https://docs.gtk.org/glib/method.DateTime.format.html
    format: opt('%a %b %d  %I:%M'),
    action: opt(() => datemenu.value = !datemenu.value),
  },
  settings: {
    colored: opt(false),
    action: opt(() => quicksettings.value = !quicksettings.value),
  },
  power: {
    action: opt(() => App.toggleWindow('powermenu')),
  },
  profilemenu: {
    action: opt(() => App.toggleWindow('profilemenu')),
  },
}
