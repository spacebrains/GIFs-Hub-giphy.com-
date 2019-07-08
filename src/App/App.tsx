import * as React from 'react';
import {search_type, content_type, IGifBlock} from "../types";
import request from '../request'
import GifList from '../GifsList/GifList'
import Search from '../Search/Search'
import ResultInfo from '../ResultInfo/ResultInfo'
import './App.css'


interface IState {
    gifs: Array<IGifBlock>;
    myGifs: Array<IGifBlock>;
    content_type: content_type;
    search: { type: search_type, condition: string, offset: number }

}

class App extends React.PureComponent {
    public state: IState = {
        gifs: [],
        myGifs: [],
        content_type: 'gifs',
        search: {
            type: 'gifs',
            condition: '',
            offset: 0
        }
    };

    componentWillMount(): void {
        this.getMyGifs();
    }

    componentDidMount() {
        this.load();
    }

    load = (type = this.state.search.type, condition = this.state.search.condition) => {

        let gifs = this.state.gifs,
            myGifs = this.state.myGifs,
            offset = this.state.search.offset;

        if (type !== this.state.search.type || condition !== this.state.search.condition) {
            offset = 0;
            gifs = [];
        } else {
            offset = gifs.length;
        }

        const setAnswer = (newGifs: Array<IGifBlock>) => {
            this.setState({
                ...this.state,
                gifs: [...gifs, ...newGifs],
                content_type: 'gifs',
                search: {
                    type: type,
                    condition: condition,
                    offset: offset,
                }
            });
        };

        request(type, condition, offset, myGifs, setAnswer);
    };

    loadGifs = () => {
        this.setState({...this.state, content_type: 'gifs'});
    };

    searchWithNewType = (type: search_type) => {
        this.load(type, this.state.search.condition);
    };

    searchWithNewCondition = (condition: string) => {
        this.load(this.state.search.type, condition);
    };

    saveMyGifs = (id: string) => {
        const {gifs, myGifs} = this.state;

        const gif = this.state.gifs.find(g => g.id === id)!;
        const isMyGif = myGifs.some(g => g.id === id);
        let newMyGifs, newGifs: Array<IGifBlock>;

        if (gif && !isMyGif) {
            newMyGifs = [...myGifs, {...gif, saved: true}];
            newGifs = gifs.map(g => g.id === gif.id ? {...g, saved: true} : g);
        } else if (!gif && isMyGif) {
            newMyGifs = myGifs.filter(g => g.id !== id);
            newGifs = gifs;
        } else {
            newMyGifs = myGifs.filter(g => g.id !== id);
            newGifs = gifs.map(g => g.id === gif.id ? {...g, saved: false} : g);
        }

        localStorage.setItem('data', JSON.stringify({myGifs: newMyGifs}));
        this.setState({...this.state, gifs: newGifs, myGifs: newMyGifs});
    };

    getMyGifs = () => {
        if (!localStorage.getItem('data')) return null;
        const json = localStorage.getItem('data') as string;
        const data = JSON.parse(json);
        this.setState({...this.state, myGifs: [...data.myGifs]})
    };

    loadMyGifs = () => {
        this.setState({
            ...this.state,
            content_type: 'myGifs',
        })
    };

    render(): React.ReactNode {
        return (
            <div className='App'>
                <Search
                    searchWithNewCondition={this.searchWithNewCondition}
                    loadMyGifs={this.loadMyGifs}
                    loadGifs={this.loadGifs}
                    content_type={this.state.content_type}
                />
                <div className='App__container'>
                    <ResultInfo
                        condition={this.state.search.condition}
                        type={this.state.search.type}
                        searchWithNewType={this.searchWithNewType}
                        content_type={this.state.content_type}
                    />
                    <GifList
                        gifs={this.state.gifs}
                        myGifs={this.state.myGifs}
                        load={this.load}
                        save={this.saveMyGifs}
                        content_type={this.state.content_type}
                    />
                </div>
            </div>
        );
    }

}

export default App;
