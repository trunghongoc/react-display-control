# Introduction

This react component will help you render or show or hide your components by some conditions as easy as good

## Install

Via Npm:

```s
npm i -s react-display-control
```

Via Yarn:

```s
yarn add -s react-display-control
```

## Demo

[Demo page](https://trunghongoc.github.io/react-display-control-demo/)

## Usuage

Render `<Item />` id = `id_1` and `id_3` at the first time render. Others `<Item />` will be not rendered.

```tsx
import { DisplayControl, useDisplayControl } from 'react-display-control'

function App() {
  const control = useDisplayControl({
    mode: 'render',
    initialShowList: ['id_1', 'id_3']
  })

  const showOnlyComponent3 = () => {
    control.showOnlyItem('id_3')
  }

  return (
    <>
      <button onClick={showOnlyComponent3}>Show only component 3</button>

      <DisplayControl control={control}>
        <DisplayControl.Item id="id_1">
          <p>My component 1</p>
        </DisplayControl.Item>

        <DisplayControl.Item id="id_2">
          <p>My component 2</p>
        </DisplayControl.Item>

        <DisplayControl.Item id="id_3">
          <p>My component 3</p>
        </DisplayControl.Item>

        <DisplayControl.Item id="id_4">
          <p>My component 4</p>
        </DisplayControl.Item>

        <p>
          This component will be always render, because it was wrapped in
          `&lt;DisplayControl.Item /&gt;`
        </p>

        <DisplayControl.Item id="id_5">
          <p>My component 5</p>
        </DisplayControl.Item>
      </DisplayControl>
    </>
  )
}
```

## Some properties

Get current mode

```tsx
control.mode
```

Get all id of `<Item />`

```tsx
control.ids
```

Get all showing id list

```tsx
control.showingIds
```

Get initial showing list

```tsx
control.initialShowList
```

## Some methods

Show 1 more `<Item />` with `showItem = (id: string | number) => void`

- Note: if your current showing includes: `id_2`, `id_3`. After run this code bellow, your screen will be render: `id_1` + `id_2` + `id_3`

```tsx
control.showItem('id_1')
```

Only show 1 `<Item />` to screen by id

- Note: if your current showing includes: `id_2`, `id_3`. After run this code bellow, your screen will be render only: `id_1`

```tsx
control.showOnlyItem('id_1')
```

Show more many `<Item />`

- Note: if your current showing includes: `id_2`, `id_3`. After run this code bellow, your screen will be render: `id_1` + `id_2` + `id_3` + `id_4`

```tsx
control.showItems(['id_1', 'id_4'])
```

Show only accurate list `<Item />`

- Note: if your current showing includes: `id_2`, `id_3`. After run this code bellow, your screen will be render: `id_1` + `id_3` + `id_4`

```tsx
control.showOnlyItems(['id_1', 'id_3', 'id_4'])
```

Hide 1 `<Item />`

```tsx
control.hideItem('id_1')
```

Hide many `<Item />`

```tsx
control.hideItems(['id_1', 'id_2', 'id_3'])
```

Show all `<Item />`

```tsx
control.showAll()
```

Hide all `<Item />`

```tsx
control.hideAll()
```

## API

### Props of `useDisplayControl` hooks

```tsx
const control = useDisplayControl({
  mode: 'render',
  initialShowList: ['id_1', 'id_3']
})
```

| #   | Field           | Type                  | Required | Default          | Note                                                                                                                                                                                                                       |
| --- | --------------- | --------------------- | -------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | mode            | 'render' \| 'display' | true     | No default value | `render` mode: If `<Item />` need to hide, it will be not rendered as HTML code. `<Item />` will be rendered as undefined `display` mode: If `<Item />` need to hide, it will be has `display: none` css style attributes. |
|     | initialShowList | (string \| number)[]  | false    | []               | Initial showing list                                                                                                                                                                                                       |

### Data of `control` instance

| #   | Field           | Type                  | Avaiable to Access | Example value            | Note                                                                                                                                                                                                                       |
| --- | --------------- | --------------------- | ------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | mode            | 'render' \| 'display' | true               | 'render'                 | `render` mode: If `<Item />` need to hide, it will be not rendered as HTML code. `<Item />` will be rendered as undefined `display` mode: If `<Item />` need to hide, it will be has `display: none` css style attributes. |
| 2   | ids             | (string \| number)[]  | true               | ['id_1', 'id_2', 'id_3'] | All unique `id` of `<Item />`                                                                                                                                                                                              |
| 3   | showingIds      | (string \| number)[]  | true               | ['id_1', 'id_3']         | All id of showing `<Item />`                                                                                                                                                                                               |
| 4   | initialShowList | (string \| number)[]  | true               | ['id_1']                 | Your first initial config list `id` default to show                                                                                                                                                                        |

### Methods

| #   | Method name   | Type                                | Example                                         | Note                                                                                                                                                                              |
| --- | ------------- | ----------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | showItem      | (id: string \| number) => void      | control.showItem('id_2')                        | Show 1 more `<Item />` with `showItem` - Note: if your current showing includes: `id_2`, `id_3`. After run this code bellow, your screen will be render: `id_1` + `id_2` + `id_3` |
| 2   | showOnlyItem  | (id: string \| number) => void      | control.showItem('id_2')                        | Only show 1 `<Item />`to screen by id - Note: if your current showing includes: `id_2`, `id_3`. After run this code bellow, your screen will be render only: `id_1`               |
| 3   | showItems     | (ids: (string \| number)[]) => void | control.showItems(['id_1', 'id_4'])             | Show more many `<Item />` - Note: if your current showing includes: `id_2`, `id_3`. After run this code bellow, your screen will be render: `id_1` + `id_2` + `id_3` + `id_4`     |
| 4   | showOnlyItems | (ids: (string \| number)[]) => void | control.showOnlyItems(['id_1', 'id_3', 'id_4']) | Show only accurate list `<Item />` - Note: if your current showing includes: `id_2`, `id_3`. After run this code bellow, your screen will be render: `id_1` + `id_3` + `id_4`     |
| 5   | hideItem      | (id: string \| number) => void      | control.hideItem('id_1')                        | Hide 1 `<Item />`                                                                                                                                                                 |
| 6   | hideItems     | (ids: (string \| number)[]) => void | control.hideItems(['id_1', 'id_2', 'id_3'])     | Hide many `<Item />`                                                                                                                                                              |
| 7   | showAll       | () => void                          | control.showAll()                               | Show all `<Item />`                                                                                                                                                               |
| 8   | hideAll       | () => void                          | control.hideAll()                               | Hide all `<Item />`                                                                                                                                                               |
