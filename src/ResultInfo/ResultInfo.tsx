import * as React from 'react';

interface IProps {
    condition: string;
    type: string
    searchWithNewType: Function;
}

const GifsList: React.FC<IProps> = ({condition, type,searchWithNewType}: IProps) => {
    const onSearchWithNewType = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        searchWithNewType(target.value);
    };

    return (
        <section>
            <span>{condition === '' ? 'Trending' : `Most Relevant Video Results:${condition}`}</span>
            <aside>
                <label>
                    <input
                        type="radio"
                        name="searchType"
                        value="gifs"
                        checked={type==='gifs'}
                        onChange={onSearchWithNewType}
                    />
                    <span>gifs</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="searchType"
                        value="stickers"
                        checked={type==='stickers'}
                        onChange={onSearchWithNewType}
                    />
                    <span>stickers</span>
                </label>
            </aside>
        </section>
    );
};

export default GifsList;