buscarPaciente = document.querySelector("#buscar-pacientes");

buscarPaciente.addEventListener("click", function () {
    var msgErro = document.querySelector("#erro-requisicao");
    msgErro.classList.add("invisivel");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    xhr.addEventListener("load", function () {

        if (xhr.status == 200) {
            var pacientes = JSON.parse(xhr.responseText);
            pacientes.forEach(function (paciente) {
                adcionaPacienteTabela(paciente);
            });
        } else {
            msgErro.classList.remove("invisivel");
        }
    })

    xhr.send();
});
