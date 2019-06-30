import * as React from 'react';
import {GifBlock,IGifBlock} from "../GifBlock/GifBlock";

interface IProps {
    gifs:Array<IGifBlock>;
    load:Function;
    save:Function;
}

const GifsList: React.FC<IProps> = ({gifs,load,save}: IProps) => {
    const onLoad=()=>load();
    return (
        <section>
            <ul>
                {gifs.map(g=>
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
            <button onClick={onLoad}>LOAD MORE</button>
        </section>
    );
};

export default GifsList;