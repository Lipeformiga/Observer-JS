
const machinesContainer = document.getElementById("container-machines")
const quantidadeMaquinasLabel = document.getElementById("quantidade-maquinas")
const notificacaoFuncionario = document.getElementById("container-notifications")
let id = 0

quantidadeMaquinasLabel.innerText = `0 Maquinas`
const buildElement = (machine) =>{

    const divContainerMachine = document.createElement("div")

    if(machine.temperatura > 100){
        divContainerMachine.classList.add("machine-container-red")
        
    }
    else{
        divContainerMachine.classList.add("machine-container-green")
    }

    const status = document.createElement("h2")

    status.classList.add("mt-6")
    status.classList.add("mb-10")
    status.classList.add("text-xl")

    if(machine.temperatura > 100){
        status.innerText = "SUPERAQUECIDA"
        status.classList.add("text-red-custom") 
    }
    else{
        status.innerText ="NORMAL"
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

class Funcionario{

    constructor(nome){
        this.nome = nome
        this.notificacoes = []
    }

    update(id){
       const text = document.createElement("p")
       text.innerText = `A maquina de ${id} está superaquecida`
       text.classList.add("border","text-xl","border-red-500","p-4","rounded-md")
       this.notificacoes.push(text)
       notificacaoFuncionario.appendChild(text)
    }
    

}

class Maquina {
    
    constructor(nome,painel){
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

    addFuncionario(funcionario){
        this.funcionarios.push(funcionario)
    }
    atualizar(){
        this.info = buildElement(this)
        this.painel.atualizarPainel(this)
        if(this.temperatura > 100 ){
            this.notifySubscribers()
        }
    }

    notifySubscribers(){
        this.funcionarios.map((funcionario) =>{
            funcionario.update(this.id)
        })
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
m5 = new Maquina("MAquina5", p1)

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







