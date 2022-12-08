import * as React from 'react';
import './style.css';

import { DisplayControl, useDisplayControl } from 'react-display-control';

import { Apple } from '../icons/Apple';
import { Orange } from '../icons/Orange';
import { Banana } from '../icons/Banana';
import { Grape } from '../icons/Grape';
import { Mango } from '../icons/Mango';

const Item = () => <span className="html-tag">&lt;Item/&gt;</span>;
const PurpleColor = () => <span className="purple" />;

export function Fruits() {
  const control = useDisplayControl({
    mode: 'render',
    initialShowList: ['a1', 'a4'],
  });

  return (
    <div className="App">
      <h1>Fruits:</h1>

      <div className="btns">
        <button onClick={() => control.showAll()}>
          Show all <Item />
        </button>

        <button onClick={() => control.hideAll()}>
          Hide all <Item />
        </button>

        <button onClick={() => control.showOnlyItems(['a1', 'a4'])}>
          Reset to default
        </button>

        <button onClick={() => control.showItem('a3')}>
          Show <Banana />, <Item /> (id = a3)
        </button>

        <button onClick={() => control.showItem('a4')}>
          Show <Grape />, <Item /> (id = a4)
        </button>

        <button onClick={() => control.showItem('a2')}>
          Show <Orange />, <Item /> (id = a2)
        </button>

        <button onClick={() => control.showOnlyItem('a2')}>
          Only show <Orange />, <Item /> (id = a2)
        </button>

        <button onClick={() => control.showOnlyItem('a3')}>
          Only show <Banana />, <Item /> (id = a3)
        </button>

        <button onClick={() => control.showOnlyItems(['a4', 'a5'])}>
          Only show <Grape /> + <Mango />, <Item /> (id = a4, a5)
        </button>

        <button onClick={() => control.hideItem('a4')}>
          Hide <Grape />, <Item /> (id = a4)
        </button>

        <button onClick={() => control.hideItems(['a4', 'a2'])}>
          Hide <Grape /> + <Orange />, <Item /> (id = a4, a2)
        </button>
      </div>

      <div className="fruits">
        <p className="description">
          You can control displays state of all <Item />, All element (
          <PurpleColor />) is not wrapped by <Item /> so they will be always
          render to the screen
        </p>

        <p className="description">
          Each <Item /> require an <strong>id</strong> props, you can make the
          duplicated <strong>id</strong> if they are the same logic
        </p>

        <DisplayControl control={control}>
          <ul>
            <DisplayControl.Item id="a1">
              <li>
                [a1] <Apple /> Apple
              </li>
            </DisplayControl.Item>

            <DisplayControl.Item id="a2">
              <li>
                [a2] <Orange /> Orange
              </li>
            </DisplayControl.Item>

            <li className="always-display-style">
              Alway display item number 1
            </li>

            <DisplayControl.Item id="a3">
              <li>
                [a3] <Banana /> Banana
              </li>
            </DisplayControl.Item>

            <DisplayControl.Item id="a4">
              <li>
                [a4] <Grape /> Grape
              </li>
            </DisplayControl.Item>

            <li className="always-display-style">
              Alway display item number 2
            </li>

            <DisplayControl.Item id="a5">
              <li>
                [a5] <Mango /> Mango Việt Nam
              </li>
            </DisplayControl.Item>

            <DisplayControl.Item id="a5">
              <li>
                [a5] <Mango /> Mango ThaiLand
              </li>
            </DisplayControl.Item>
          </ul>
        </DisplayControl>
      </div>
    </div>
  );
}

export default Fruits;
