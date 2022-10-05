import { con } from "./connection.js";

export async function CadastroUsuario(novoUsuario) {
    const comando = `
        insert into tb_usuario(nm_usuario, ds_email, dt_nascimento, dt_registro)
            values(?, ?, ?, ?);
    `
    const data = new Date();
    const [linhas] = con.query(comando, [novoUsuario.nome, novoUsuario.email, novoUsuario.dtNascimento, data])
    novoUsuario.id = linhas.insertId;
    return linhas;
}

export async function CadastrarLogin(idUsuario, senha) {
    const comando = `
        insert into tb_login(id_usuario, ds_senha)
             values(?, ?, ?);
    `
    const [linhas] = await con.query(comando, [idUsuario, senha])
    novoLogin.id = linhas.insertId;
    return linhas
}



export async function LoginUsuario(email, senha) {
    const comando = `
        select tb_usuario.id_usuario  as id,
            tb_usuario.nm_usuario     as nome
        from tb_usuario
        inner join tb_login
            on tb_login.id_usuario = tb_usuario.id_usuario
        where tb_usuario.ds_email = ?
        and tb_login.ds_senha = ?;
    `;
    const [linhas] = await con.query(comando, [email, senha]);
    return linhas[0];
}

    export async function editarPerfil(id, usuario) {
        const comando = `
        update tb_usuario 
                set  nm_usuario      = ?,
                     ds_sobre        = ?,
                     ds_email        = ?, 
                     nr_celular     = ?,
                     ds_genero       = ?
                where id_usuario = ? 
        `;
        const linhas = await con.query(comando, [usuario.nome, usuario.descricao, usuario.email, usuario.celular, usuario.genero, id]);
        return linhas.affectedRows;      
}


    export async function AlterarFoto(usuario, id) {
        const comando = `
            update tb_usuario
                set img_usuario = ?
            where id_usuario = ?;
        `;
    const [linhas] = await con.query(comando, [usuario.imagem, id]);
    return linhas.affectedRows; 

    }

    export async function ListarUsuario() {
        const comando = `
                     select id_usuario   id,
                            nm_usuario   nome,
                            img_usuario  img,
                            ds_sobre     sobre
                    from tb_usuario
        `;
        const [linhas] = await con.query(comando);
        return linhas;
    }

    export async function PesquisarUsuario(nome) {
        const comando = `
                     select id_usuario   id,
                            nm_usuario   nome,
                            img_usuario  img,
                            ds_sobre     sobre
                    from tb_usuario
                    where nm_usuario like ?
        `;
        const [linhas] = await con.query(comando, [`%${nome}%`]);
        return linhas;
    }

    export async function DeletarUsuario(id) {
        const comando = `
            delete from tb_usuario
                where id_usuario = ?;
        `;

        const linhas = await con.query(comando, [id]);
        return linhas.affectedRows;
}
    
    export async function DeletarLogin(id) {
        const comando = `
            delete from tb_login
                where id_usuario = ?;
        `;

        const linhas = await con.query(comando, [id]);
        return linhas.affectedRows;
    }