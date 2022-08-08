class BookController {
    
    //Método de inicialização
    constructor(formIdCreate, formIdUpdate, tableId){

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);


        this.onSubmit();
        this.onEdit();

    }

    //Btn editar
    onEdit(){

        document.querySelector("#box-book-update .btn-cancel").addEventListener("click", e=>{
       
            this.showPanelCreate();

        });

        //Form do Update
        this.formUpdateEl.addEventListener("submit", event=>{

            //Cancelando o comportamento padrão da pagina
            event.preventDefault();

            //Botão desabilitado
            let btn = this.formUpdateEl.querySelector("[type=submit]");
                        
            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex 

            let tr = this.tableEl.rows[index];

            tr.dataset.book = JSON.stringify(values);

            tr.innerHTML = `
                <tr>
                    <td>${values.title}</td>
                    <td>${values.author}</td>
                    <td>${values.company}</td>
                    <td>${values.category}</td>
                    <td>
                        <button type="button" class="btn btn-warning btn-edit btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
                    </td>
                </tr>`;
        });

        this.addEventsTr(tr);

        this.tableEl.appendChild(tr);

        this.updateCount();
    }


    //Evento de edição
    addEventsTr(tr){

        //Selecionando o btn-editar 
        tr.querySelector(".btn-edit").addEventListener("click", e=>{

            //Interpretando a String e transformando em Obj JSON
            let json = JSON.parse(tr.dataset.book);
            let form = document.querySelector("#form-book-update");

            //pegando o index atual
            form.dataset.trIndex = tr.sectionRowIndex

            for (let name in json) {

                //procurando o campo, o nome do campo que começa com o mesmo nome do Json
                let field = form.querySelector("[name=" + name.replace("_"," ") + "]")
                
                console.log(name, field)
                //Verificando se o campo existe, ele atribuíra ao value
                if(field){
                    
                    field.value = json[name];
                    console.log("Teste",json[name])
                }; 
            }

            this.showPanelUpdate();
            
        });


        //Selecionando o btn-excluir 
        tr.querySelector(".btn-delete").addEventListener("click", e=>{

            //Confimando com o usuario / removendo os dados do formulário (tr)
            if(confirm("Deseja realmente excluir ?")){

                tr.remove();

                this.updateCount();
            }
        });


    }

    //Atualizando a contagem de livros
    updateCount(){

        let  numberBook = 0;

        //Pegando as informações do formulário
        [...this.tableEl.children].forEach(tr=> {

            numberBook++;

        });

        document.querySelector("#number-books").innerHTML = numberBook;

    }

    
    //botão Submit
    onSubmit(){

            //Pegando o formulario pelo evento 
           this.formEl.addEventListener("submit", event =>{
            
            //Cancelando o comportamento padrão do JS
            event.preventDefault();

            //Botão desabilitado
            let btn = this.formEl.querySelector("[type=submit]");
            
            btn.disabled = true;

            this.addLine(this.getValues(this.formEl));

            //Resetando o formulário
            this.formEl.reset()

            //Habilitando o btn
            btn.disabled = false;

        });

    }


    //Adicionando linha de informçaões do livro na tabela
    addLine(dataBook){

        let tr = document.createElement('tr');

        //Convertendo o objeto para texto
        tr.dataset.book = JSON.stringify(dataBook);

        console.log('Aqui', tr)

        tr.innerHTML = `
        <tr>
            <td>${dataBook.title}</td>
            <td>${dataBook.author}</td>
            <td>${dataBook.company}</td>
            <td>${dataBook.category}</td>
            <td>
                <button type="button" class="btn btn-warning btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
        </tr>`;

        this.addEventsTr(tr);
        
        //Adicionando o elemento filho do elemento atual (tr)
        this.tableEl.appendChild(tr); 

        this.updateCount()

    };

    //Mostrando os painéis/formulários de criação
    showPanelCreate(){

        //Escondendo o formulário de edição e mostrando o formulário de criação
        document.querySelector("#box-book-create").style.display = "block";
        document.querySelector("#box-book-update").style.display = "none";
    }

    //Mostrando os painés/formulário de ediçao
    showPanelUpdate(){

        //Escondendo o formulário de criação e mostrando o formulário de edição
        document.querySelector("#box-book-create").style.display = "none";
        document.querySelector("#box-book-update").style.display = "block";
    }

    //Pegando os valores do formulário 
    getValues(formEl) {

        let book ={};
        let isValid = true;
        

        //Tratando o dados do formulario como array e pra cada valor cada valor é adicionado ao  array "book"
        [...formEl.elements].forEach(function (field, index) {
            

            //Verficando se os campos estão vazios
            if (['title', 'author', 'company','category'].indexOf(field.name) > -1 && !field.value){

                //Pegando os elemento pai e add a classe 'has-error'
                field.parentElement.classList.add('has-error');
                isValid = false;

            }
            
            book[field.name] = field.value;

        });

        
        if(!isValid){
            return false;
        }

        //retornando a classe "Book{}"
        return new Book(
            book.title, 
            book.author, 
            book.company, 
            book.category
        
        );
    } 

}