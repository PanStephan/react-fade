## Installation

`npm install react-fade-ts`

or

`yarn add react-fade-ts`

## Usage

```
import { FadeIn } from 'react-fade-ts';

<FadeIn >
  <div>Element 1</div>
  <div>Element 2</div>
</FadeIn>
```


Props

* `delay`:  Default: 300. Delay between animation.
* `transitionDuration`:  Default: 800. Duration of each child's animation in milliseconds.
* `className`:  Adds a `className` prop to the container div.
* `childClassName`:  Adds a `className` prop to each child div, allowing you to style the direct children of the `FadeIn` component.

****inspired by

* https://github.com/gkaemmer/react-fade-in
* https://github.com/rnosov/react-reveal
