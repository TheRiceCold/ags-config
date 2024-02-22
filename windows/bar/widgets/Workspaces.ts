import PanelButton from './PanelButton'
import options from 'options'
import { sh, range } from 'lib/utils'

const hyprland = await Service.import('hyprland')
const { workspaces } = options.bar.workspaces

const dispatch = (arg: string | number) => sh(`hyprctl dispatch workspace ${arg}`)

const Workspaces = (ws: number) => Widget.Box({
  children: range(ws || 20).map(i => Widget.Label({
    attribute: i,
    vpack: 'center',
    label: `${i}`,
    setup: self => self.hook(hyprland, () => {
      self.toggleClassName('active', hyprland.active.workspace.id === i)
      self.toggleClassName('occupied', (hyprland.getWorkspace(i)?.windows || 0) > 0)
    }),
  })),
  setup: box => {
    if (ws === 0) box.hook(
        hyprland.active.workspace,
        () => box.children.map(btn => btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute))
      )
  },
})

export default () => PanelButton({
  window: 'overview',
  className: 'workspaces',
  child: workspaces.bind().as(Workspaces),
  onScrollUp: () => dispatch('m+1'),
  onScrollDown: () => dispatch('m-1'),
  onClicked: () => App.toggleWindow('overview'),
})
