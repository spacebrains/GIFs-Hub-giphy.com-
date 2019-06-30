import * as React from 'react';

export interface IGifBlock {
    id: string
    src: string;
    title: string;
    import_datetime: string;
    saved:boolean;
}

interface IProps extends IGifBlock{
    save:Function;
}

export const GifBlock: React.FC<IProps> = (data: IProps) => {
    const {id, src, title, import_datetime,saved,save} = data;

    const onSave=()=>save(id);
    return (
        <article>
            <img src={src} alt={title}/>
            <footer>
                <div>
                    <span>{title}</span>
                    <span>{import_datetime}</span>
                </div>
                <aside>
                    <button onClick={onSave}>Save</button>
                    <span>{saved ? 'true' : 'false'}</span>
                </aside>
            </footer>

        </article>
    );
};