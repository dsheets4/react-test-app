import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import { QueryControl } from './controls/QueryControl';
import { HeaderChart } from './charts/HeaderChart';
import { MainChart } from './charts/MainChart';
import { FooterChart } from './charts/FooterChart';


const ResponsiveGridLayout = WidthProvider(Responsive);

function stopPropagation(evt) {
  console.log(evt.type)
  evt.stopPropagation();
  evt.preventDefault();
}
function stopPropagationMap(evt, test) {
  console.log(evt)
  evt.stopPropagation();
}

var defaultLayouts = {
  lg: [
    {i: 'header', x: 2, y: 1, w: 10, h: 1, minW: 2},
    {i: 'footer', x: 2, y: 3, w: 10, h: 1, minW: 2},
    {i: 'main',   x: 7, y: 3, w: 10, h: 2, minW: 2},
    {i: 'query',  x: 0, y: 0, w:  2, h: 4},
  ]
};
const originalLayouts = getFromLS('layouts') || defaultLayouts;


var report_items = [
  {
    item_class: QueryControl,
    item_props: {
      key: 'query',
      data: 'Some key or object for getting data',
    }
  },
  {
    item_class: MainChart,
    item_props: {
      key: 'main',
      data: 'Some key or object for getting data',
    }
  },
  {
    item_class: HeaderChart,
    item_props: {
      key: 'header',
      data: 'Some key or object for getting data',
    }
  },
  {
    item_class: FooterChart,
    item_props: {
      key: 'footer',
      data: 'Some key or object for getting data',
    }
  },
]


class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      updateCount: 0,
      items: report_items.map((x) => {
        // return React.createElement(ReportComponent, x, null);
        return React.createElement(
          'div', {key: x.item_props.key},
          React.createElement(x.item_class, x.item_props)
        );
      })
    };
    console.log(this.state.items)

    // Ensure the event handlers are using this this.
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
  }
  
  resetLayout() {
    this.setState({ layouts: defaultLayouts });
  }
  
  onDrag(layout, oldItem, newItem, placeholder, e, element) {
    console.log('dragging')
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }
  
  onTimeUpdate(extents) {
    this.setState({extents: [extents]});
  }

  componentDidMount() {
    // When called, this means that React has injected the component into the HTML document.
    // Query the data API at this point when it's important that the elements already exist before the data.
  }
  
  render() {
    // TODO: Add button to insert specific report objects, then this render will dynamically create divs with those objects
    return (
      <div>
        <ResponsiveGridLayout
            className="layout" layouts={this.state.layouts} onLayoutChange={this.onLayoutChange}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>

            {this.state.items}
            
        </ResponsiveGridLayout>
        <button onClick={this.resetLayout}>Reset Layout</button>
      </div>
    )
  }
};
export default App;


function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      // Getting from localStorage only works with string directly in method call.
      ls = JSON.parse(global.localStorage.getItem('beeralytics')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'beeralytics',
      JSON.stringify({
        [key]: value
      })
    );
  }
}
