const form = document.getElementById('form');
const userName = document.getElementById('userName');
const userSenha = document.getElementById('userPassword');
const userEmail = document.getElementById('userEmail');
const userCPF = document.getElementById('userCPF');
const userDataNasc = document.getElementById('userDataNasc');
const userContato = document.getElementById('userContato');
const btnValida = document.getElementById('btnValida');
const btnAtualizar = document.getElementById('btnAtualizar')
const iconSenha = document.getElementById('iconSenha');

function validaErro(input, message) {
    const controle = input.parentElement;
    const small = controle.querySelector('small');

    small.innerText = message;
    controle.className = 'input-box erro';
}

function validaSucesso(input) {
    const controle = input.parentElement;
    controle.className = 'input-box sucesso';
}

function validaNome() {
    var nome = userName.value.trim();
    var caracteres = "_-.@*";

    if (nome === '') {
        validaErro(userName, 'Preencha esse campo!');
        return false;
    } else if (!verificaChar(nome, caracteres)) {
        validaErro(userName, 'Contém dígitos restritos!');
        return false;
    } else {
        validaSucesso(userName);
        return true;
    }
}

function validaSenha() {
    var senha = userSenha.value.trim();

    if (senha === '') {
        validaErro(userSenha, 'Preencha esse campo!');
        return false;
    } else if (senha.length < 8) {
        validaErro(userSenha, 'Senha deve conter mais que 8 dígitos!');
        return false;
    } else if (!verificaNum(senha)) {
        validaErro(userSenha, 'Não contém um número!');
        return false;
    } else {
        validaSucesso(userSenha);
        return true;
    }
}

function validaEmail() {
    var email = userEmail.value.trim();

    if (email === '') {
        validaErro(userEmail, 'Preencha esse campo!');
        return false;
    } else if (!email.includes('@')) {
        validaErro(userEmail, 'Não contém @!');
        return false;
    } else {
        validaSucesso(userEmail);
        return true;
    }
}

function validaCPF() {
    var cpf = userCPF.value.trim();

    if (cpf === '') {
        validaErro(userCPF, 'Preencha esse campo!');
        return false;
    } else if (cpf[3] == "." || cpf[7] == "." || cpf[11] == "-" || cpf.length > 11) {
        validaErro(userCPF, 'Estrutura incorreta!');
        return false;
    } else if (!verificaCPF(cpf)) {
        validaErro(userCPF, 'CPF não é real!');
        return false;
    } else {
        validaSucesso(userCPF);
        return true;
    }
}

function validaData() {
    var dataNasc = userDataNasc.value.trim();

    if (dataNasc === '') {
        validaErro(userDataNasc, 'Preencha esse campo!');
        return false;
    } else if (!verificaData(dataNasc)) {
        validaErro(userDataNasc, 'Erro, data inválida!');
        return false;
    } else {
        validaSucesso(userDataNasc);
        return true;
    }
}

function validaTelefone() {
    var telefone = userContato.value.trim();

    if (telefone === '') {
        validaErro(userContato, 'Preencha esse campo!');
        return false;
    } else if (telefone[0] != '(' || telefone[3] != ')' || telefone[9] != '-' || telefone.length > 14) {
        validaErro(userContato, 'Estrutura incorreta!');
        return false;
    } else if (!verificaTel(telefone, "()-0123456789")) {
        validaErro(userContato, 'Digite apenas números conforme a estrutura!');
        return false;
    } else {
        validaSucesso(userContato);
        return true;
    }
}

function verValidacao() {
    validaNome();
    validaEmail();
    validaCPF();
    validaData();
    validaSenha();
    validaTelefone();
}

function verSenha() {
    const tipoAtual = userSenha.type;

    if (tipoAtual === 'password') {
        userSenha.type = 'text';
    } else {
        userSenha.type = 'password';
    }
}

function verificaChar(str, naoPode) {
    for (i = 0; i < naoPode.length; i++) {
        if (str.includes(naoPode[i])) return false;
    }
    return true;
}

function verificaNum(str) {
    var numeros = '0123456789';
    for (i = 0; i < numeros.length; i++) {
        if (str.includes(numeros[i])) return true;
    }
    return false;
}

function verificaTel(str, possui) {
    for (var i = 0; i < str.length; i++) {
        var contem = false;
        for (var j = 0; j < possui.length; j++) {
            if (str[i] === possui[j]) {
                contem = true;
                break;
            }
        }
        if (!contem) return false;
    }
    return true;
}

function verificaData(str) {

    var partes = str.split('/');

    if (partes.length < 3) {
        return false;
    } else {
        var dia = parseInt(partes[0], 10);
        var mes = parseInt(partes[1], 10) - 1;
        var ano = parseInt(partes[2], 10);

        if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
            return false;
        } else {
            var dataNasc = new Date(ano, mes, dia);
            var hoje = new Date();

            if (dataNasc > hoje) {
                return false;
            } else {
                return true;
            }
        }
    }
}

function verificaCPF(cpf) {
    var soma = 0;
    var resto;

    for (i = 1; i <= 9; i++) {
        soma = soma + (parseInt(cpf.substring(i - 1, i)) * (11 - i));
    }

    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (i = 1; i <= 10; i++) {
        soma = soma + (parseInt(cpf.substring(i - 1, i)) * (12 - i))
    };

    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(10, 11))) {
        return false;
    } else {
        return true;
    }
}

function atualiza() {
    window.location.reload();
}

function valida(e) {
    if (validaNome() == false || validaSenha() == false || validaEmail() == false || validaCPF() == false || validaData() == false || validaTelefone() == false) {
        e.preventDefault();
    }
}

form.addEventListener('submit', valida);
btnValida.addEventListener('click', verValidacao);
btnAtualizar.addEventListener('click', atualiza);
iconSenha.addEventListener('click', verSenha);