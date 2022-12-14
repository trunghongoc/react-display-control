# Introduction

This react component will help you render or show or hide your components by some conditions as easy as good

Features:

- Show/Hide components/elements from any where
  - For example 1: you are staying at `<Footer>` component and wanna hide some items at `<Header />`
  - For example 2: you are rendering a list items, and wanna show some items, hide some others
  - For example 3: you are render many components and wanna show/hide some one by your condition
- Multiple display control
  - You can create many control by wrap `<Item />` inside a `<Group />`, then use `useDisplayControl` to control (show/hide) all `<Item />`
- Nesting display control
  - `<Group />` can be nesting

Notice:

- Don't forget wrap your app with `<DisplayControlProvider />`, let's implement it in `src/App.tsx` or `src/index.tsx`
  - Regarding nextjs, you can implement `<DisplayControlProvider />` in `pages/_app.tsx`
- Use `<SingleItem />` if you only wanna control a single element/component
- User `<Group />` and `<Item />` if you wanna control many `<Item />` inside a `<Group />`
- `useDisplayControl`:
  - You can check `display state` of some `<Group />` or `<SingleItem />`
  - You can excute some methods like `setDisplay`, `displayAll`, `hideAll`
  - For more detail please read [API](#api)

## Install

Via Npm:

```s
npm i -s react-display-control
```

Via Yarn:

```s
yarn add react-display-control
```

## Demo, sample

- [See the demo + sample code here](https://codesandbox.io/s/nesting-display-control-react-display-control-7nk4xw)

## Content

- [Introduction](#introduction)
  - [Install](#install)
  - [Demo, sample](#demo-sample)
  - [Content](#content)
  - [Usuage](#usuage)
    - [Import Display Control Provider to App.tsx](#import-display-control-provider-to-apptsx)
    - [Show/hide for single item `<SingleItem />`](#showhide-for-single-item-singleitem-)
    - [Basic show/hide some components or some elements in a `<Group />`](#basic-showhide-some-components-or-some-elements-in-a-group-)
    - [Init a default display state for `<Group />`](#init-a-default-display-state-for-group-)
    - [Init default display mode for `<Group />`](#init-default-display-mode-for-group-)
    - [Multiple display control (create many `<Group />`)](#multiple-display-control-create-many-group-)
    - [Nesting display control](#nesting-display-control)
  - [API](#api)
    - [Root provider (`<DisplayControlProvider />`)](#root-provider-displaycontrolprovider-)
    - [Display control for single item `<SingleItem />`](#display-control-for-single-item-singleitem-)
    - [Display control group (`<Group />`) props](#display-control-group-group--props)
    - [Display control item (`<Item />`) props](#display-control-item-item--props)
    - [Get current display state of a `<Group />`, and excute some methods to show/hide `<Item />`](#get-current-display-state-of-a-group--and-excute-some-methods-to-showhide-item-)

## Usuage

### Import Display Control Provider to App.tsx

File: `src/App.tsx`

```tsx
import { DisplayControlProvider } from 'react-display-control'

export const App = () => {
  return (
    <SomeReduxOrSomethingsProvider>
      <DisplayControlProvider>
        // ... your app content here
        <div>...</div>
        <div>... </div>
      </DisplayControlProvider>
    </SomeReduxOrSomethingsProvider>
  )
}
```

### Show/hide for single item `<SingleItem />`

`<SingleItem />` is an alias of `<DisplayControlSingleItem />`

[Example code + preview: Show/hide for single item `<SingleItem />`](https://codesandbox.io/s/show-hide-for-single-item-react-display-control-738u8f?file=/src/App.tsx)

### Basic show/hide some components or some elements in a `<Group />`

[Example code + preview: Basic show/hide components/elements](https://codesandbox.io/s/basic-show-hide-react-display-control-x1t49v)

Default: show all `<Item />` if you don't pass `initialDisplay` props

### Init a default display state for `<Group />`

Some components/elements will be showed or be hidden by default if you provide `initialDisplay` props to `<Group />`

Example props:

```
initialDisplay={{
  header: true, // show 'header' by default
  body: false   // hide 'body' by default
}}
```

It mean that: by default, header + footer will be show, body will be hidden.
(If you don't pass some `<Item /> id`, or missing some `<Item /> id` that `<Item /> id` will be show by default, like `footer` in this case)

That props `initialDisplay` above is equivalent to

```
initialDisplay={{
  header: true,
  body: false,
  footer: true // we did not pass the 'footer' above, and it mean `footer = true`
}}
```

[Example code + preview: init default show/hide state of some components/elements](https://codesandbox.io/s/init-default-show-hide-state-react-display-control-g1fqtb?file=/src/App.tsx)

### Init default display mode for `<Group />`

[Example code + preview: init default display mode ('render' or 'css')](https://codesandbox.io/s/init-render-mode-react-display-control-5bhcxb?file=/src/App.tsx)

These code bellow mean:
Default mode for all `<Item />` is `render`, except `body` is `css`

Different between `render` and `css`:

- If current `<Item />` mode is `render`, and it be not show to screen, it will not be rendered. This mode useful if you don't want render the `<Item />` as HTML code
- If current `<Item />` mode is `css`, and it be not show to screen, it will be added a css style (`display: none`) to hide itself. This mode is useful if you still wanna render `<Item />` as HTML code, and when it need to hide, we just add `display: none`

### Multiple display control (create many `<Group />`)

[Example code + preview: multiple display control (create many `<Group />`)](https://codesandbox.io/s/multiple-display-control-create-many-group-react-display-control-g59x67?file=/src/App.tsx)

### Nesting display control

[Example code + preview: nesting display control (Nesting `<Group />`)](https://codesandbox.io/s/nesting-display-control-react-display-control-7nk4xw?file=/src/App.tsx)

## API

### Root provider (`<DisplayControlProvider />`)

This component don't receive any props
Importance: you should render this component only one time, and should render `<DisplayControlProvider />` in `root` file (such as `src/App.tsx` or `src/index.tsx`)

```tsx
import { DisplayControlProvider } from 'react-display-control'

export const App = () => {
  return (
    <SomeReduxOrSomethingsProvider>
      <DisplayControlProvider>
        // ... your app content here
        <div>...</div>
        <div>... </div>
      </DisplayControlProvider>
    </SomeReduxOrSomethingsProvider>
  )
}
```

### Display control for single item `<SingleItem />`

`<SingleItem />` is an alias of `<DisplayControlSingleItem />`

```tsx
import {
  SingleItem,
  useDisplayControl,
  UseDisplayControlValue
} from 'react-display-control'
// Or
/*
import {
  DisplayControlSingleItem,
  useDisplayControl,
  UseDisplayControlValue
} from 'react-display-control'
*/

const Home = () => {
  const mySingleItemDc: UseDisplayControlValue =
    useDisplayControl('mySingleItemDc')

  return (
    <div>
      <button onClick={() => mySingleItemDc?.setDisplay(true)}>Show</button>
      <button onClick={() => mySingleItemDc?.setDisplay(false)}>Hide</button>

      <SingleItem id="mySingleItemDc" mode="render" initialDisplay={true}>
        <p>My content inside</p>
      </SingleItem>
    </div>
  )
}
```

Props:
| # | Field | Type | Required | Default | Example | Note |
|---|----------------|-------------------|----------|----------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | id | string \| number | true | | 'mySingleDc' | Id of <SingleItem /> |
| 2 | mode | 'render' \| 'css' | false | 'render' | 'css' | `render` mode: If need to hide, it will be not rendered as HTML code. will be rendered as undefined `css` mode: If need to hide, it will be has display: none css style attributes. |
| 3 | initialDisplay | boolean | false | true | true | Show or hide <SingleItem /> at the first time render |

### Display control group (`<Group />`) props

`<Group />` is an alias of `<DisplayControlGroup />`

```tsx
import { Group } from 'react-display-control'
// Or
import { DisplayControlGroup } from 'react-display-control'
```

| #   | Field          | Type                                | Required | Default  | Example                       | Note                                                                                                                                                                                                          |
| --- | -------------- | ----------------------------------- | -------- | -------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | id             | string \| number                    | true     |          | 'homePageDc'                  | Id of group                                                                                                                                                                                                   |
| 2   | defaultMode    | 'render' \| 'css'                   | false    | 'render' | 'css'                         | `render` mode: If <Item /> need to hide, it will be not rendered as HTML code. <Item /> will be rendered as undefined`css` mode: If <Item /> need to hide, it will be has display: none css style attributes. |
| 3   | initialDisplay | { [id: string \| number]: boolean } | false    | {}       | { header: true, body: false } | Set default display state. If some `<Item /> id` is not listed to `initialDisplay`, It will be have `true` value. The next to example is equivalent to: { header: true, body: false, footer: true }           |

### Display control item (`<Item />`) props

`<Item />` is an alias of `<DisplayControlItem />`

```tsx
import { Item } from 'react-display-control'
// Or
import { DisplayControlItem } from 'react-display-control'
```

| #   | Field | Type              | Required | Default  | Example  | Note                                                                                                                                                                                                                                                                                                                                                              |
| --- | ----- | ----------------- | -------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | id    | string \| number  | true     |          | 'header' | Id of `<Item />`                                                                                                                                                                                                                                                                                                                                                  |
| 2   | mode  | 'render' \| 'css' | false    | 'render' | 'css'    | - `render` mode: If <Item /> need to hide, it will be not rendered as HTML code. <Item /> will be rendered as undefined - `css` mode: If <Item /> need to hide, it will be has display: none css style attributes. - If you don't pass `mode` to `<Item />` as a props. It will get the default mode (`defaultMode`) from `<Group />` and treat it as itself mode |

### Get current display state of a `<Group />`, and excute some methods to show/hide `<Item />`

Hooks name: `useDisplayControl`

```tsx
import {
  useDisplayControl,
  UseDisplayControlValue
} from 'react-display-control'

const MyComponent = () => {
  const myDc: UseDisplayControlValue = useDisplayControl('myGroupId')

  return <div>My component</div>
}
```

Usuage:

```tsx
// Get control hooks (you can implement this hooks bellow in any components that you want to control display of a <Group />)
const homePageDc: UseDisplayControlValue = useDisplayControl('homePageDc') // 'homePageDc' is 'id' of <Group />
```

Or

```tsx
// Get control hooks (you can implement this hooks bellow in any components that you want to control display of a <Group />)
const { state, setDisplay, displayAll, hideAll }: UseDisplayControlValue =
  useDisplayControl('homePageDc') // 'homePageDc' is 'id' of <Group />
```

- `UseDisplayControlValue`:

  - Description: return value type of `useDisplayControl`
  - Type:
    - state: { [itemId: string | number]: boolean }
    - setDisplay: (displayConfig: { [itemId: string | number]: boolean } | boolean) => void
      - If displayConfig === true (boolean), it is equivalent to display all
      - If displayConfig === false (boolean), it is equivalent to hide all
    - displayAll: () => void
    - hideAll: () => void
  - Meaning:
    - state: all display state infomation of `<Item />` inside a `<Group />`
    - setDisplay: set show/hide some `<Item />`
      - Example 1: `setDisplay({ header: true, body: false })`
      - Example 2: `setDisplay(true)` (show all)
      - Example 3: `setDisplay(false)` (hide all)
    - displayAll: show all `<Item />` inside a `<Group />`
    - hideAll: hide all `<Item />` inside a `<Group />`

- `useDisplayControl`:
  - Type: `(groupId: string | number) => UseDisplayControlValue`
