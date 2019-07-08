import * as React from "react";
import './Search.css'
import {content_type} from "../types";

interface IProps {
    searchWithNewCondition: Function;
    loadMyGifs: Function;
    loadGifs: Function;
    content_type: content_type;
}

const Search: React.FC<IProps> = ({searchWithNewCondition, loadMyGifs, loadGifs, content_type}: IProps) => {
    let _condition: HTMLInputElement;

    const search = (e: React.SyntheticEvent) => {
        e.preventDefault();
        searchWithNewCondition(_condition.value);
    };
    const deleteCondition = () => {
        _condition.value = '';
        searchWithNewCondition('');
    };
    const onLoadMyGifs = () => loadMyGifs();
    const onLoadGifs = () => loadGifs();

    return (
        <header className="Search">
            <div className='Search__container App__container'>
                <div className="Search__left-block">
                    <h1 className="Search__h1">
                        <span className="Search__h1-first">Gifs</span>
                        <span className="Search__h1-second">HUB</span>
                    </h1>
                    <form onSubmit={search} className='Search__form'>
                        <div className='Search__input-container'>
                            <input
                                ref={(input: HTMLInputElement) => _condition = input}
                                type="text"
                                placeholder='Search over9000 gifs...'
                                required
                                className='Search__input'
                            />
                            <span onClick={deleteCondition} className='Search__span'>X</span>
                        </div>
                        <button className='Search__search-button'>search</button>
                    </form>
                </div>
                <button
                    onClick={onLoadMyGifs}
                    hidden={content_type === 'myGifs'}
                    className="Search__save-button"
                >saves
                </button>
                <button
                    onClick={onLoadGifs}
                    hidden={content_type === 'gifs'}
                    className="Search__save-button"
                >exit
                </button>
            </div>
        </header>
    );
};

export default Search;