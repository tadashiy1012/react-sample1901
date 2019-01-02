import React, {Fragment} from 'react';
import {render} from 'react-dom';

const Entry = (props) => (
    <li>{props.tenki}</li>
);

const Entries = (props) => {
    return <ul>{props.entries}</ul>;
};

class App extends React.Component {
    constructor(props) {
        super(props);
        fetch('/tenki').then((resp) => {
            return resp.json();
        }).then((json) => {
            this.setState({
                title: json.rss.channel.description._text,
                entries: json.rss.channel.item
            });
        });
        this.state = {
            title: '',
            entries: []
        };
    }
    render() {
        const ary = this.state.entries.map((elm, idx) => {
            return <Entry key={idx} tenki={elm.title._text} />;
        });
        return <Fragment>
            <p>{this.state.title}</p>
            <Entries entries={ary} />
        </Fragment>;
    }
}

render(<App/>, document.getElementById('app'));