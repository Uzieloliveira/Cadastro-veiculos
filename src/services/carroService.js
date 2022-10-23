const db = require('../db');

module.exports = {
    buscarTodos: () =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT* FROM carros', (error, results)=>{
                if(error){ 
                    rejeitado(error); 
                    return; 
                }
                aceito(results);
            });
        });
    },

    buscarUm: (codigo)=> {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT* FROM carros WHERE codigo= ?', [codigo], (error, results)=>{
                if(error){
                    rejeitado(error); 
                    return;
                }
                if(results.length > 0){
                    aceito(results[0]);
                }
                else{
                    aceito(false);
                }
            });
        })
    },

    inserir: (modelo, placa)=> {
        return new Promise((aceito, rejeitado)=>{

            db.query('insert into carros (modelo, placa) values (?, ?)', 
                [modelo, placa], 
                (error, results)=> {
                    if(error){ 
                        rejeitado(error); 
                        return; 
                    }
                          
                    aceito(results.inserirCodigo); 
                    
                }
            );
        });
    },

    alterar: (codigo, modelo, placa)=> {
        return new Promise((aceito, rejeitado)=>{

            db.query('update carros set modelo = ?, placa = ? where codigo = ? ', 
                [modelo, placa, codigo], 
                (error, results)=> {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir: (codigo) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('delete FROM carros where codigo = ?', [codigo], (error, results)=>{
                if(error){ 
                    rejeitado(error); 
                    return; 
                }
                
                aceito(results);           
            
            });
        });
    },
};