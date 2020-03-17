import React, { Component } from 'react';
import { Popover, Button } from 'antd';

export default class hoverInfo extends Component {

    
      
      



    render() {
        // function renderTooltip (props) {
        //     return <Tooltip {...props}>Simple tooltip</Tooltip>;
        //   }

        // const Example = () => (
        //     <OverlayTrigger
        //       placement="right"
        //       delay={{ show: 250, hide: 400 }}
        //       overlay={renderTooltip}
        //     >
        //       <Button variant="success">Hover me to see</Button>
        //     </OverlayTrigger>
        //   );

        const content = (
            <div>
              <p>Content</p>
              <p>Content</p>
            </div>
        )

        return (
            <div>
                <Popover content={content} placement="right" title="Title">
                    <Button type="primary">Hover me</Button>
                </Popover>
            </div>
        )
    }
}
