import * as React from 'react';
import './GifBlock.css'

export interface IGifBlock {
    id: string
    src: string;
    title: string;
    import_datetime: string;
    saved: boolean;
}

interface IProps extends IGifBlock {
    save: Function;
}

export const GifBlock: React.FC<IProps> = (data: IProps) => {
    const {id, src, title, import_datetime, saved, save} = data;

    const onSave = () => save(id);
    return (
        <article className="GifBlock">
            <div className="GifBlock__img-container">
                <img src={src} alt={title}/>
            </div>
            <footer className="GifBlock__footer">
                <div className="GifBlock__info">
                    <span className="GifBlock__title">{title}</span>
                    <span className="GifBlock__date">{import_datetime}</span>
                </div>
                <aside>
                    <button
                        onClick={onSave}
                        className="GifBlock__save-button"
                    >
                        {saved ? 'remove' : 'save'}
                    </button>
                </aside>
            </footer>

        </article>
    );
};