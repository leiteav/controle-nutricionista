const btnAdicionaPaciente = document.querySelector("#adicionar-paciente");
btnAdicionaPaciente.addEventListener("click", function (event) {
    event.preventDefault();

    var msgErro = document.querySelector("#msgs-erro");
    msgErro.innerHTML = "";

    var form = document.querySelector("#form-adicionar");
    var paciente = obterpacienteform(form);

    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        exibeMsgErro(erros);
        return;
    }

    msgErro.innerHTML = "";
    adcionaPacienteTabela(paciente);
    form.reset();
});

function adcionaPacienteTabela(paciente){
    var pacienteTr = montaTr(paciente);

    const tabela = document.querySelector("#tabela-pacientes");

    tabela.appendChild(pacienteTr);

}

function obterpacienteform(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}

function validaPaciente(paciente) {
    var erros = [];
    if (paciente.nome == 0 || paciente.nome == "") {
        erros.push("Nome do paciente não pode ser igual a 0 ou em branco.");
    }
    if (paciente.peso == 0 || paciente.peso == "") {
        erros.push("Peso do paciente não pode ser igual a 0 ou em branco.");
    }
    if (paciente.altura == 0 || paciente.altura == "") {
        erros.push("Altura do paciente não pode ser igual a 0 ou em branco.");
    }  
    if (paciente.gordura == 0 || paciente.gordura == "") {
        erros.push("Gordura do paciente não pode ser igual a 0 ou em branco.");
    }
    if (!validaPeso(paciente.peso)) {
        erros.push("Peso inválido!");
    }
    if (!validaAltura(paciente.altura)) {
        erros.push("Altura inválida!");
    }

    return erros;
}

function exibeMsgErro(erros) {
    var ul = document.querySelector("#msgs-erro");
    erros.forEach(function (erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}