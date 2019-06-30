import * as React from 'react';
import {IGifBlock} from '../GifBlock/GifBlock';
import GifList from '../GifsList/GifList'
import Search from '../Search/Search'
import ResultInfo from '../ResultInfo/ResultInfo'

type search_type = 'gifs' | 'stickers';

interface IState {
    gifs: Array<IGifBlock>;
    myGifs: Array<IGifBlock>;
    search: { type: search_type, condition: string, offset: number }

}

class App extends React.PureComponent {
    public state: IState = {
        gifs: [],
        myGifs: [],
        search: {
            type: 'gifs',
            condition: '',
            offset: 0
        }
    };

    public key = 'wwD72OA0V6WC8mR1xMTVteOQO3VdR1LY';

    componentWillMount(): void {
        this.getMyGifs();
    }

    componentDidMount(){
        this.load();
    }

    load = (type = this.state.search.type, condition = this.state.search.condition) => {
        let gifs = this.state.gifs,
            myGifs=this.state.myGifs,
            offset = this.state.search.offset;

        if (type !== this.state.search.type || condition !== this.state.search.condition) {
            offset = 0;
            gifs = [];
        } else {
            offset = gifs.length;
        }

        let input: string;
        if (type === 'gifs' && condition === '')
            input = `http://api.giphy.com/v1/gifs/trending?key=${this.key}&offset=${offset}`;
        else if (type === 'stickers' && condition === '')
            input = `http://api.giphy.com/v1/stickers/trending?key=${this.key}&offset=${offset}`;
        else if (type === 'gifs' && condition !== '')
            input = `http://api.giphy.com/v1/gifs/search?key=${this.key}&offset=${offset}&q=${condition}`;
        else if (type === 'stickers' && condition !== '')
            input = `http://api.giphy.com/v1/stickers/search?key=${this.key}&offset=${offset}&q=${condition}`;

        const request = async () => {
            const response = await fetch(input);
            const json = await response.json();
            let newGifs = await json.data.map((g: any) => {
                const saved = myGifs.some(mg=>mg.id===g.id);
                console.log(g.id, myGifs);
                return {
                    id: g.id,
                    title: g.title,
                    src: g.images.fixed_height.url,
                    import_datetime: g.import_datetime,
                    saved: saved
                }
            });
            this.setState({
                ...this.state,
                gifs: [...gifs, ...newGifs],
                search: {
                    type: type,
                    condition: condition,
                    offset: offset,
                }
            });
        };
        request();
    };

    searchWithNewType = (type: search_type) => {
        this.load(type);
    };

    searchWithNewCondition = (condition: string) => {
        this.load(undefined, condition);
    };

    saveMyGifs = (id: string) => {
        const {gifs, myGifs} = this.state;

        const gif = this.state.gifs.filter(g => g.id === id)[0];
        let newMyGifs,newGifs: Array<IGifBlock>;

        console.log(gifs, myGifs);
        if (myGifs.some(g => g.id === gif.id)) {
            newMyGifs = myGifs.filter(g => g.id !== id);
            newGifs = gifs.map(g=>g.id === gif.id ? {...g, saved:false} : g);
        }
        else {
            newMyGifs = [...myGifs, gif];
            newGifs = gifs.map(g=>g.id === gif.id ? {...g, saved:true} : g);
        }

        localStorage.setItem('data', JSON.stringify({myGifs: newMyGifs}));
        this.setState({...this.state,gifs:newGifs, myGifs: newMyGifs});
    };

    getMyGifs = () =>{
        const json=localStorage.getItem('data') as string;
        const data=JSON.parse(json);
        this.setState({...this.state,myGifs:[...data.myGifs]})
    };

    render(): React.ReactNode {
        return (
            <>
                <Search searchWithNewCondition={this.searchWithNewCondition}/>
                <ResultInfo
                    condition={this.state.search.condition}
                    type={this.state.search.type}
                    searchWithNewType={this.searchWithNewType}
                />
                <GifList
                    gifs={this.state.gifs}
                    load={this.load}
                    save={this.saveMyGifs}
                />
            </>
        );
    }

}

export default App;
