import * as React from 'react';
import './ResultInfo.css'
import {content_type} from "../types";

interface IProps {
    content_type: content_type;
    condition: string;
    type: string
    searchWithNewType: Function;
}

const GifsList: React.FC<IProps> = ({condition, type, searchWithNewType, content_type}: IProps) => {
    const onSearchWithNewType = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        searchWithNewType(target.value);
    };

    return (
        <section className="ResultInfo">
            <span className="ResultInfo__span">
                {content_type === 'myGifs' ? 'My Gifs' :
                    condition === '' ? 'Trending' : `Most Relevant Video Results:${condition}`}
            </span>
            <aside className="ResultInfo__aside" hidden={content_type === 'myGifs'}>
                <input
                    type="radio"
                    name="searchType"
                    value="gifs"
                    checked={type === 'gifs'}
                    onChange={onSearchWithNewType}
                    id="radio-gifs"
                    className="ResultInfo__radio"
                />
                <label htmlFor='radio-gifs' className="ResultInfo__label">
                    <span>gifs</span>
                </label>
                <input
                    type="radio"
                    name="searchType"
                    value="stickers"
                    checked={type === 'stickers'}
                    onChange={onSearchWithNewType}
                    id="radio-stickers"
                    className="ResultInfo__radio"
                />
                <label htmlFor="radio-stickers" className="ResultInfo__label">
                    <span>stickers</span>
                </label>
            </aside>
        </section>
    );
};

export default GifsList;