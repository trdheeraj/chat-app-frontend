# React Multi-list Selector

## Install
```sh
$ npm i --save react-multiselect-list
```

## Use it in any component
```js
import React, {Component} from 'react';
import Multiselect from 'react-multiselect-list';

class <your_componenet> extends Component {
    your_function (selectedValues) {
        // 'selectedValues' contains your selected values
        // You can set state here
    }
    
    render () {
        return(
            <Multiselect list=['item1', 'item2', 'item3'] title='title' onSelectItem={this.your_function.bind(this)} />
        )
    }
}
```

## Props

| Name         | Type     | Required  | Description                                    |
| :----------: | :------: | :-------: | :--------------------------------------------: |
| list         | Array    | Yes       | The List of items you'll be selecting from     |
| title        | string   | Yes       | Title of your list                             |
| onSelectItem | Function | Yes       | Callback from your component                   |
| selected     | Array    | No        | Pass values that you want selected by default  |
| theme        | String   | No        | Choose from ('red', 'green', 'lightblue', 'yellow', 'blue') to match with your theme. Blue is the default theme |
<br/>

## Development

```sh
$ git clone https://github.com/hkureshy/react-multiselect-list.git
$ cd react-multiselect-list
$ npm install
$ npm start
```  

**Feel free to contact if you find any problem using this package.**  
Email: `hassnainkureshy@gmail.com`
