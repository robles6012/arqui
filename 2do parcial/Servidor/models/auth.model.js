import pgService from "../services/pg.service.js";

export const getUsuario = async (username,password)=>{
    const  pg = new pgService();
    return await  pg.connection.oneOrNone('select username from public.usuario where username =$1 and password = $2', [username,password]);
}
export const createUser = async (username, password) => {
    const  pg = new pgService();
    return await  pg.connection.oneOrNone('INSERT INTO public.usuario(username, password) VALUES ($1,$2)', [username,password]);

};


export const updateUser = async (username, password,id) => {
    const  pg = new pgService();
    return await  pg.connection.oneOrNone('UPDATE public.usuario SET username = $1, password = $2 WHERE id = $3', [username,password,id]);
};

export const deleteUser = async (id) => {
    const pg = new pgService();
    return await pg.connection.oneOrNone('DELETE FROM public.usuario WHERE id = $1', [id]);
};
