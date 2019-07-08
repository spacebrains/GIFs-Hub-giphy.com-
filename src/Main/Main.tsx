import * as React from 'react';
import Loadable from 'react-loadable';
import App from '../App/App'
import './Main.css'

const LoadableApp = Loadable({
    loader: () => import('../App/App'),
    loading: <div>LOADING</div>,
    timeout: 10000,
    delay: 500
});

class Main extends React.PureComponent {
    public state = {
        isEnter: false
    };
    onEnter = () => {
        this.setState({isEnter: true});
    };

    render(): React.ReactNode {
        return (
            <>
                {this.state.isEnter ?
                    LoadableApp :
                    <main className='Main'>
                        <h1 className="Main__h1">
                            <span className="Main__h1-first">Gifs</span>
                            <span className="Main__h1-second">HUB</span>
                        </h1>
                        <button
                            className="Main__button"
                            onClick={this.onEnter}
                        >ENTER
                        </button>
                    </main>}
            </>
        );
    }
}

export default Main;
