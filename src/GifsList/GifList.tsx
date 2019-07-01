import * as React from 'react';
import {GifBlock, IGifBlock} from "../GifBlock/GifBlock";
import './GifList.css'

interface IProps {
    gifs: Array<IGifBlock>;
    myGifs: Array<IGifBlock>;
    load: Function;
    save: Function;
    content_type: 'gifs' | 'myGifs'
}

const GifsList: React.FC<IProps> = ({gifs, load, save, content_type, myGifs}: IProps) => {
    let currentGifs = content_type === 'gifs' ? gifs : myGifs;
    const onLoad = () => load();
    return (
        <section className='GifList'>
            <ul className='GifList__ul'>
                {currentGifs.map(g =>
                    <li key={g.id}>
                        <GifBlock
                            id={g.id}
                            src={g.src}
                            title={g.title}
                            import_datetime={g.import_datetime}
                            saved={g.saved}
                            save={save}
                        />
                    </li>
                )}
            </ul>
            <button
                onClick={onLoad}
                className="GifList__button-load"
                hidden={content_type === 'myGifs'}>
                LOAD MORE
            </button>

        </section>
    );
};

export default GifsList;