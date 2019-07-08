import {IGifBlock, search_type} from './types'

const request = async (type: search_type,
                       condition: string,
                       offset: number,
                       myGifs: Array<IGifBlock>,
                       setAnswer: Function) => {

    const input = createInput(type, condition, offset);

    const response = await fetch(input);
    const json = await response.json();
    let newGifs = await json.data.map((g: any) => {
        const saved = myGifs.find(mg => mg.id === g.id);
        return {
            id: g.id,
            title: g.title,
            src: g.images.fixed_height.url,
            import_datetime: g.import_datetime,
            saved: saved
        }
    });
    await setAnswer(newGifs);
};

const createInput = (type: search_type, condition: string, offset: number,) => {
    const key = 'wwD72OA0V6WC8mR1xMTVteOQO3VdR1LY';

    let input;
    if (type === 'stickers' && condition === '')
        input = `http://api.giphy.com/v1/stickers/trending?key=${key}&offset=${offset}`;
    else if (type === 'gifs' && condition !== '')
        input = `http://api.giphy.com/v1/gifs/search?key=${key}&offset=${offset}&q=${condition}`;
    else if (type === 'stickers' && condition !== '')
        input = `http://api.giphy.com/v1/stickers/search?key=${key}&offset=${offset}&q=${condition}`;
    else
        input = `http://api.giphy.com/v1/gifs/trending?key=${key}&offset=${offset}`;

    return input;
};

export default request;