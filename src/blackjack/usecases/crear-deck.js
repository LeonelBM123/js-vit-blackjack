import _ from 'underscore';
/**
 * 
 * @param {Array<string>} tipos 
 * @param {Array<string>} especiales 
 * @returns {Array<string>} retorna un nuevo deck de cartas
 */
export const create_deck = (tipos, especiales)=>{
    if (!tipos) {
        throw new Error('Tipos de carta es obligatorio');
    }
    let deck = [];
    for (let index = 2; index <= 10; index++) {
        for (const i of tipos) {
            deck.push(index+i);
        }
    }
    for (const iterator of tipos) {
        for (const index of especiales) {
            deck.push(index+iterator);
        }
    }
    return _.shuffle(deck);
}