
const machinesContainer = document.getElementById("container-machines")
const quantidadeMaquinasLabel = document.getElementById("quantidade-maquinas")
const notificacaoFuncionario = document.getElementById("container-notifications")
let id = 0

quantidadeMaquinasLabel.innerText = `0 Maquinas`
const buildElement = (machine) =>{

    const divContainerMachine = document.createElement("div")

    const status = document.createElement("h2")

    function yellow(){
        divContainerMachine.style.backgroundColor = '#F7FAD0';
        divContainerMachine.style.width = '25%';
        divContainerMachine.style.textAlign = 'center'; 
        divContainerMachine.style.borderRadius = '0.5rem';
        divContainerMachine.style.boxShadow = '7px 7px 10px 0px rgba(0, 0, 0, 0.25)';
    }

    status.classList.add("mt-6")
    status.classList.add("mb-10")
    status.classList.add("text-xl")

    if(machine.temperatura > 100 && machine.umidade > 70){
        status.innerText = "SUPERAQUECIDA e MOLHADA"
        status.classList.add("text-red-custom") 
        divContainerMachine.classList.add("machine-container-red")
    }
    else if(machine.temperatura > 100 && machine.umidade > 50){
        status.innerText = "SUPERAQUECIDA e UMIDA"
        status.classList.add("text-red-custom") 
        divContainerMachine.classList.add("machine-container-red")
    }
    else if(machine.temperatura > 70 && machine.umidade > 70){
        status.innerText = "AQUECIDA e MOLHADA"
        status.classList.add("text-red-custom") 
        divContainerMachine.classList.add("machine-container-red")
    }
    else if (machine.umidade > 70){
        status.innerText ="MOLHADA"
        status.classList.add("text-red-custom")
        divContainerMachine.classList.add("machine-container-red") 
    }   
    else if(machine.temperatura > 100){
        status.innerText ="SUPERAQUECIDA"
        status.classList.add("text-red-custom")
        divContainerMachine.classList.add("machine-container-red") 
    }
    else if(machine.temperatura > 70 && machine.umidade > 50){
        status.innerText = "AQUECIDA e UMIDA"
        status.classList.add("text-red-custom") 
        yellow()
    }
    else if(machine.temperatura > 70){
        status.innerText = "AQUECIDA"
        status.classList.add("text-red-custom") 
        yellow()
    }
    else if(machine.umidade > 50){
        status.innerText = "UMIDA"
        status.classList.add("text-red-custom") 
        yellow()
    }

    else{   
        status.innerText = "NORMAL"
        divContainerMachine.classList.add("machine-container-green")
    }
    
    const title = document.createElement("h2")

    title.classList.add("mb-20")
    title.classList.add("text-xl")
    title.innerText = `Maquina #00${machine.id}`

    divContainerMachine.appendChild(status)
    divContainerMachine.appendChild(title)

    const divContainerStatus = document.createElement("div")

    divContainerStatus.classList.add("text-start")
    divContainerStatus.classList.add("ml-8")
    divContainerStatus.classList.add("mr-28")
    divContainerStatus.classList.add("mb-24")
    
    const estado = document.createElement("p");

    estado.classList.add("text-xl")

    estado.innerText = `Estado: ${machine.ligada ? "Ligado" : "Desligado"}`

    divContainerStatus.appendChild(estado)
    
    const temperaturaText = document.createElement("p")
    temperaturaText.classList.add("text-xl")
    temperaturaText.classList.add("my-4")

    temperaturaText.innerText = `Temperatura: ${machine.temperatura}°C`

    divContainerStatus.appendChild(temperaturaText)

    const umidadeText = document.createElement("p")

    umidadeText.classList.add("text-xl")

    umidadeText.innerText = `Umidade: ${machine.umidade}%`

    divContainerStatus.appendChild(umidadeText)
    
    divContainerMachine.appendChild(divContainerStatus)
    
    return divContainerMachine;
}
const idGenerator = () => {
   
        id++;
        return id;
}

class Funcionario {
    constructor(nome) {
        this.nome = nome;
        this.notificacoes = [];
    }

    update(id, state) {
        const notificationContainer = document.createElement("div");
    
        if (state === "aquecida" || state === "umida" || state === "aquecida e umida") {
            notificationContainer.classList.add("bg-yellow-100", "border-l-4","border-yellow-500","p-4","mb-2","rounded-lg","shadow-md");
        } 
        else {
            notificationContainer.classList.add("bg-red-100","border-l-4","border-red-500","p-4","mb-2","rounded-lg","shadow-md");
        }
    
        const message = document.createElement("p");
        let messageText;
    
        switch (state) {
            case "superaquecida e molhada":
                messageText = `A máquina ${id} está superaquecida e molhada!`;
                break;
            case "superaquecida e umida":
                messageText = `A máquina ${id} está superaquecida e umida!`;
                break;
            case "aquecida e molhada":
                messageText = `A máquina ${id} está aquecida e molhada!`;
                break;
            case "superaquecida":
                messageText = `A máquina ${id} está superaquecida!`;
                break;
            case "aquecida":
                messageText = `A máquina ${id} está aquecida!`;
                break;
            case "umida":
                messageText = `A máquina ${id} está úmida!`;
                break;
            case "molhada":
                messageText = `A máquina ${id} está molhada!`;
                break;
            case "aquecida e umida":
                messageText = `A máquina ${id} está aquecida e umida!`;
                break;
            default:
                messageText = `A máquina ${id} está em estado desconhecido.`;
        }
    
        message.innerText = messageText;
        message.classList.add(
            "text-xl",
            "text-red-700",
            "font-semibold",
            "text-center"
        );
    
        notificationContainer.appendChild(message);
        notificacaoFuncionario.appendChild(notificationContainer);
        this.notificacoes.push(notificationContainer);
    }
    
    
}


class Maquina {
    constructor(nome, painel) {
        this.id = idGenerator(),
        this.nome = nome,
        this.temperatura = 60,
        this.umidade = 20,
        this.ligada = true,
        this.status = "",
        this.funcionarios = [],
        this.painel = painel,
        this.info = buildElement(this)
        this.painel.adicionarMaquina(this)
    }

    addFuncionario(funcionario) {
        this.funcionarios.push(funcionario)
    }

    atualizar() {
        this.info = buildElement(this);
        this.painel.atualizarPainel(this);
        
        if (this.temperatura > 100 && this.umidade > 70) {
            this.notifySubscribers("superaquecida e molhada");
        } 
        else if (this.temperatura > 100 && this.umidade > 50) {
            this.notifySubscribers("superaquecida e umida");
        } 
        else if (this.temperatura > 70 && this.umidade > 70) {
            this.notifySubscribers("aquecida e molhada");
        } 
        else if (this.temperatura > 100) {
            this.notifySubscribers("superaquecida");
        } 
        else if (this.umidade > 70) {
            this.notifySubscribers("molhada");
        } 
        else if (this.temperatura > 70 && this.umidade > 50) {
            this.notifySubscribers("aquecida e umida");
        } 
        else if (this.umidade > 50) {
            this.notifySubscribers("umida");
        } 
        else if (this.temperatura > 70) {
            this.notifySubscribers("aquecida");
        }
    }
    

    notifySubscribers(state) {
        this.funcionarios.forEach((funcionario) => {
            funcionario.update(this.id, state);
        });
    }
}

class Operador extends Funcionario{
}
class Gerente extends Funcionario{
}
class Painel {

    constructor(){
        this.exibicoes = []
    }
    adicionarMaquina(machine){
        this.exibicoes.push({
             id : machine.id, 
             content : machine.info
        })
        this.adicionarNaTela()
        quantidadeMaquinasLabel.innerText = `${this.exibicoes.length} Maquinas`
    }

    atualizarPainel(machine){
        this.exibicoes.map( (exibicao) =>{
            if (machine.id === exibicao.id){
                exibicao.content = machine.info
            }
        })
        this.adicionarNaTela()
    }
    adicionarNaTela(){
        while (machinesContainer.firstChild) {
            machinesContainer.removeChild(machinesContainer.firstChild);
        }
        
        this.exibicoes.forEach((exibicao) => {
            machinesContainer.appendChild(exibicao.content)
        })
    }
}
p1 = new Painel()

m1 = new Maquina("Maquina1",p1)
m2 = new Maquina("Maquina2", p1)
m3 = new Maquina("Maquina3",p1)
m4 = new Maquina("Maquina3",p1)
m5 = new Maquina("Maquina5", p1)

op1 = new Operador()
op2 = new Operador()

m1.addFuncionario(op1)
m2.addFuncionario(op2)

const machines = []

machines.push(m1,m2,m3,m4,m5)

const btnTeste = document.querySelector("button")

btnTeste.addEventListener("click", () =>{
    machines.forEach((machine) => {
        machine.temperatura = Math.floor(Math.random() * 201)
        machine.umidade = Math.floor(Math.random() * 101)
        machine.atualizar()

    })
})

const botaozadaAdd = document.getElementById("add-machine")

botaozadaAdd.addEventListener("click", () => {
    id--; // pq eu fiz isso ( ta criando de 2 em 2 trapaça criativa )
    const newMachine = new Maquina(`Maquina${idGenerator()}`, p1)
    machines.push(newMachine)
    console.log(`Total de máquinas criadas: ${id}`);    
})