
const dados = (results) => {
    let table = ''

    table += ' <table border="1px">'
    table += `<tr id="main-line"><td>Código</td><td>Modelo</td></td><td>Placa</td><td>Deletar</td><td>Atualizar</td></tr>`
    for (let i in results.result) {
        table += `<tr>
        <td>${results.result[i].codigo}</td>
        <td>${results.result[i].descricao}</td>
        <td>${results.result[i].placa}</td>
        <td class="line-icon trash"><i class="fa-solid fa-trash" onclick='deletarDado(${results.result[i].codigo})'></i></td>
        <td class="line-icon update"><i class="fa-solid fa-pen-to-square" onclick='alterarDado(${results.result[i].codigo})'></i></td>
    </tr>`
    }

    table += '</table>'

    document.getElementById('field-table').innerHTML = table
}

const dado = (result) => {
    let table = ''

    table += ' <table border="1px">'
    table += '<tr id="main-line"><td>Código</td><td>Modelo</td><td>Placa</td><td>Deletar</td><td>Atualizar</td></tr>'
    table += `<tr>
        <td>${result.result.codigo}</td>
        <td>${result.result.modelo}</td>
        <td>${result.result.placa}</td>
        <td class="line-icon trash"><i class="fa-solid fa-trash" onclick='deletarDado(${result.result.codigo})'></i></td>
        <td class="line-icon update"><i class="fa-solid fa-pen-to-square" onclick='alterarDado(${result.result.codigo})'></i></td>
    </tr>`

    table += '</table>'

    document.getElementById('field-table').innerHTML = table

}

function buscarTodos() {
    fetch('api/carros', {
        method: 'get',
        cache: 'default'
    }).then(response => {
        response.json().then(data => {
            dados(data);
        }).catch(error => console.log(`Erro: ${error.message}`));
    })
}

function buscarUm() {
    let cod = document.querySelector('.input-cod').value
    fetch(`api/carro/${cod}`, {
        method: 'get',
        cache: 'default'
    }).then(response => {
        response.json().then(data => {
            dado(data);
        }).catch(error => console.log(`Erro: ${error.message}`));
    })
}

function deletarDado(id) {

    document.getElementById('container-popUp').style = 'display: flex;'
    let btn_Cacel = document.getElementById('cancel');
    let btn_Confir = document.getElementById('confir');

    btn_Cacel.addEventListener('click', ()=>{
        document.getElementById('container-popUp').style = 'display: none;'
        id = null;
    });

    btn_Confir.addEventListener('click', ()=>{
        
        document.getElementById('container-popUp').style = 'display: none;'
        fetch(`api/carro/${id}`, {
            method: 'delete',
            cache: 'default'
        }).catch(error => console.log(`Erro: ${error.message}`));

        if (document.getElementById('todos').checked) {
            buscarTodos();
        } else if (document.getElementById('cod').checked) {
            document.getElementById('field-table').innerHTML = '<table border="1px"><tr id = "main-line"> <td>Código</td><td>Modelo</td><td>Placa</td><td>Deletar</td><td>Atualizar</td></tr><tr><td>-</td><td>-</td><td>-</td><td class="line-icon trash"><i class="fa-solid fa-trash"></i></td><td class="line-icon update"><i class="fa-solid fa-pen-to-square"></i></td></tr></table>'
        }
    });
}

function alterarDado(id){

    document.getElementById('container-popUp-alter').style = 'display: flex;'

    let btn_Cacel = document.getElementById('cancelAlt');
    let btn_Confir = document.getElementById('confirAlt');

    btn_Cacel.addEventListener('click', ()=>{
        document.getElementById('container-popUp-alter').style = 'display: none;'
    })

    btn_Confir.addEventListener('click', ()=>{

        const modelo = document.getElementById('modeloAlt').value
        const placa = document.getElementById('placaAlt').value
        window.location.href =`/api/carro/${modelo}/${placa}/${id}`;
        
        document.getElementById('container-popUp-alter').style = 'display: none;'
      
    })
}


document.getElementById('buscar').addEventListener('click', () => {
    if (document.getElementById('todos').checked) {
        buscarTodos();
    } else if (document.getElementById('cod').checked) {
        buscarUm();
    }
});