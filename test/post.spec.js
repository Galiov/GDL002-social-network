import { post } from '../src/main.js';

describe('post', () => {
    it('Deberia retornar un post del usuario', () => {
        return post('Nota nueva').then((data) => {
            expect(data).toBe('La nota nueva');
        })
    })
})