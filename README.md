# Introduction

This react component will help you render or show or hide your components by some conditions as easy as good

## Install

Via Npm:

```s
npm i -s react-display-control
```

Via Yarn:

```s
yarn add react-display-control
```

## Demo

[Demo page](https://trunghongoc.github.io/react-display-control-demo/)

- Code: [See example <Fruits /> component here](https://github.com/trunghongoc/react-display-control/tree/main/example)

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

### Control display state of some components

Some file which you wanna control display: components/elements,

Example `src/pages/Home.tsx`

Default: show all `<Item />` if you don't pass `initialDisplay` object

```tsx
import {
  Group,
  Item,
  useDisplayControl,
  UseDisplayControlValue
} from 'react-display-control'
// Or import { DisplayControlGroup, DisplayControlItem, useDisplayControl, UseDisplayControlValue } from 'react-display-control'

const Header = () => <div>Header</div>
const Body = ({ children }: any) => <div>{children}</div>
const Footer = () => <div>Footer</div>

export const Home = () => {
  // Get control hooks (you can implement this hooks bellow in any components that you want to control display of a <Group />)
  const homePageDc: UseDisplayControlValue = useDisplayControl('homePageDc') // 'homePageDc' is 'id' of <Group />

  return (
    <div>
      <Group id="homePageDc">
        <Item id="header">
          <Header />
        </Item>

        <button
          onClick={() => {
            // You don't need to pass all ids as the parameter here. If you don't pass some ids, that ids will be not change display state
            homePageDc?.setDisplay({
              body: false, // 'body' is one of <Item /> id list
              footer: false // 'footer' is one of <Item /> id list
            })

            // You can see, all your <Item /> ids in Home.tsx component includes ('header', 'body', 'footer'). That code above say that, you just wanna change 'body' and 'footer' display and don't care about 'header'
          }}
        >
          Hide body + footer
        </button>

        <button
          onClick={() => {
            homePageDc?.setDisplay({
              header: true,
              body: true,
              footer: false
            })
          }}
        >
          Show header + body, hide footer
        </button>

        <button
          onClick={() => {
            // All <Item /> of 'homePageDc' will be hidden
            homePageDc?.hideAll()
          }}
        >
          Hide All
        </button>

        <button
          onClick={() => {
            // All <Item /> of 'homePageDc' will be show
            homePageDc?.displayAll()
          }}
        >
          Display All
        </button>

        <Item id="body">
          <Body>
            <h1>My Home Page</h1>
          </Body>
        </Item>

        <Item id="footer">
          <Footer />
        </Item>
      </Group>
    </div>
  )
}
```

### Init default display state

Example component `src/pages/Home.tsx`

`<Group />` this props bellow:

```
initialDisplay={{
  header: true,
  body: false
}}
```

It mean that: by default, header + footer will be show, body will be hidden.
(If you don't pass some `<Item /> id`, or missing some `<Item /> id` that `<Item /> id` will be show by default, like `footer` in this case)

That props `initialDisplay` above is equivalent to

```
initialDisplay={{
  header: true,
  body: false,
  footer: true
}}
```

```tsx
import {
  Group,
  Item,
  useDisplayControl,
  UseDisplayControlValue
} from 'react-display-control'

const Header = () => <div>Header</div>
const Body = ({ children }: any) => <div>{children}</div>
const Footer = () => <div>Footer</div>

export const Home = () => {
  return (
    <div>
      <Group
        id="homePageDc"
        initialDisplay={{
          header: true,
          body: false
        }}
      >
        <Item id="header">
          <Header />
        </Item>

        <Item id="body">
          <Body>
            <h1>My Home Page</h1>
          </Body>
        </Item>

        <Item id="footer">
          <Footer />
        </Item>
      </Group>
    </div>
  )
}
```

### Init default display mode

Example: `src/pages/Home.tsx`

```tsx
import {
  Group,
  Item,
  useDisplayControl,
  UseDisplayControlValue
} from 'react-display-control'

const Header = () => <div>Header</div>
const Body = ({ children }: any) => <div>{children}</div>
const Footer = () => <div>Footer</div>

export const Home = () => {
  return (
    <div>
      <Group
        id="homePageDc"
        defaultMode="render"
        initialDisplay={{
          header: true,
          body: false
        }}
      >
        <Item id="header">
          <Header />
        </Item>

        <Item id="body" mode="css">
          <Body>
            <h1>My Home Page</h1>
          </Body>
        </Item>

        <Item id="footer">
          <Footer />
        </Item>
      </Group>
    </div>
  )
}
```

These code bellow mean:
Default mode for all `<Item />` is `render`, except `body` is `css`

Different between `render` and `css`:

- If current `<Item />` mode is `render`, and it be not show to screen, it will not be rendered. This mode useful if you don't want render the `<Item />` as HTML code
- If current `<Item />` mode is `css`, and it be not show to screen, it will be added a css style (`display: none`) to hide itself. This mode is useful if you still wanna render `<Item />` as HTML code, and when it need to hide, we just add `display: none`

### Multiple display control

Example `src/pages/Home.tsx`

```tsx
import { useEffect } from 'react'

import {
  Group,
  Item,
  useDisplayControl,
  UseDisplayControlValue
} from 'react-display-control'

const Header = () => <div>Header</div>
const Body = ({ children }: any) => <div>{children}</div>
const Footer = () => <div>Footer</div>

export const Home = () => {
  const homePageDc: UseDisplayControlValue = useDisplayControl('homePageDc')
  const postDc: UseDisplayControlValue = useDisplayControl('post')

  useEffect(() => {
    // Hide <Item id="post2" />
    if (postDc.state.post2) {
      postDc?.setDisplay({
        post2: false
      })
    }
  }, [postDc])

  return (
    <div>
      <Group
        id="homePageDc"
        defaultMode="render"
        initialDisplay={{
          header: true,
          body: false
        }}
      >
        <Item id="header">
          <Header />
        </Item>

        <Item id="body" mode="css">
          <Body>
            <h1>My Home Page</h1>
          </Body>
        </Item>

        <Item id="footer">
          <Footer />
        </Item>
      </Group>

      <button
        onClick={() => {
          // All <Item /> of 'homePageDc' will be show
          homePageDc?.displayAll()
        }}
      >
        Display All Items of homePageDc
      </button>

      <button
        onClick={() => {
          // All <Item /> of 'postDc' will be show
          postDc?.displayAll()
        }}
      >
        Display All Items of postDc
      </button>

      <Group id="post" mode="css">
        <Item id="post1">Post 1</Item>
        <Item id="post2">Post 2</Item>
        <Item id="post3">Post 3</Item>
      </Group>
    </div>
  )
}
```

### Nesting display control

Example `src/pages/Home.tsx`

```tsx
import { useEffect } from 'react'

import {
  Group,
  Item,
  useDisplayControl,
  UseDisplayControlValue
} from 'react-display-control'

const Header = () => <div>Header</div>
const Body = ({ children }: any) => <div>{children}</div>
const Footer = () => <div>Footer</div>

const MyNestingDc1 = () => {
  return (
    <div>
      <Group id="nestingDc1">
        <Item id="nesting1">Nesting 1</Item>
        <Item id="nesting2">Nesting 2</Item>
      </Group>
    </div>
  )
}

const MyNestingDc2 = () => {
  return (
    <div>
      <Group id="nestingDc2">
        <Item id="nesting1">Nesting 1</Item>
        <Item id="nesting2">Nesting 2</Item>
      </Group>
    </div>
  )
}

export const Home = () => {
  const homePageDc: UseDisplayControlValue = useDisplayControl('homePageDc')
  const postDc: UseDisplayControlValue = useDisplayControl('post')

  return (
    <div>
      <Group
        id="homePageDc"
        defaultMode="render"
        initialDisplay={{
          header: true,
          body: false
        }}
      >
        <Item id="header">
          <Header />
        </Item>

        <Item id="body" mode="css">
          <Body>
            <h1>My Home Page</h1>
          </Body>
        </Item>

        <Item id="footer">
          <Footer />
        </Item>

        <MyNestingDc1 />
      </Group>

      <MyNestingDc1 />

      <Group id="post" mode="css">
        <Item id="post1">Post 1</Item>
        <Item id="post2">Post 2</Item>
        <Item id="post3">
          <p>Post 3</p>

          <MyNestingDc2 />
        </Item>
      </Group>
    </div>
  )
}
```

## API

### Root provider (`<DisplayControlProvider />`)

This component don't receive any props

```tsx
import { DisplayControlProvider } from 'react-display-control'
```

### Display control group (`<Group />`) props

`<Group />` is an alias of `<DisplayControlGroup />`

```tsx
import { Group } from 'react-display-control'
// Or
import { DisplayControlGroup } from 'react-display-control'
```

| #   | Field          | Type                                | Required | Default  | Example                       | Note                                                                                                                                                                                                           |
| --- | -------------- | ----------------------------------- | -------- | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | id             | string \| number                    | true     |          | 'homePageDc'                  | Id of group                                                                                                                                                                                                    |
| 2   | defaultMode    | 'render' \| 'css'                   | false    | 'render' | 'css'                         | `render` mode: If <Item /> need to hide, it will be not rendered as HTML code. <Item /> will be rendered as undefined `css` mode: If <Item /> need to hide, it will be has display: none css style attributes. |
| 3   | initialDisplay | { [id: string \| number]: boolean } | false    | {}       | { header: true, body: false } | Set default display state. If some `<Item /> id` is not listed to `initialDisplay`, It will be have `true` value. The next to example is equivalent to: { header: true, body: false, footer: true }            |

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

| #   | Hooks             | Type                                                                                                                                                                                                                   | Required | Default | Example                                            | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | useDisplayControl | (groupId: string \| number) => ({ state: { [itemId: string \| number]: boolean }, setDisplay: (displayConfig: { [itemId: string \| number]: boolean }) => void, displayAll: () => void, hideAll: () => void }) \| null | true     |         | const homePageDc = useDisplayControl('homePageDc') | useDisplayControl(`groupId`) will return null if it cant not find the `<Group />` It's because you passed wrong `groupId`, or at the time component don't complete setup all necessary. Therefore always use `homePageDc?.state`, `homePageDc?.setDisplay(...)` `homePageDc.hideAll()`, `homePageDc.displayAll()` to avoid some unnecessary errors `homePageDc.state`: all current display state of current `<Group />`, example: `{ header: true, body: false }` `homePageDc.setDisplay({ header: false, footer: true })`: set display state for `header` and `footer` `homePageDc.displayAll()`: display all `<Item />` of current `<Group />` `homePageDc.hideAll()`: hide all `<Item />` of current `<Group />` |
