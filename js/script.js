
let fvalidator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        fvalidator.clearErrors();

        for(let i=0; i<inputs.length; i++){
            let input = inputs[i];
            let check = fvalidator.checkInput(input);
            if(check !== true){
                send = false;
                fvalidator.showError(input, check);
            }
        }

        if(send){
            form.submit();
        }
    },
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split(',');
            for(let k in rules){
                let rDetails = rules[k].split('=');
                switch(rDetails[0]){
                    case 'required':
                        if(input.value==''){
                            return 'Campo obrigatório.';
                        }
                    break;
                    case 'min':
                        if(input.value.length< rDetails[1]){
                            return 'minimo '+rDetails[1]+' caracteres';
                        }
                    break;
                    case 'email':    
                        if(input.value != ''){
                            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'email não é valido!'
                            }
                        }
                    break;
                }
            }

        }
        return true;
    },
    showError:(input, error)=>{
        input.style.borderColor = '#FF0000'

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
        
    },
    clearErrors:()=>{
        let inputs = form.querySelectorAll('input');
        for(let i=0; i<inputs.length; i++){
            inputs[i].style = '';
        }

        let errorElement = document.querySelectorAll('.error');
        for(let i=0; i<errorElement.length; i++){
            errorElement[i].remove();
        }
    }
}
let form = document.querySelector('.validator');

form.addEventListener('submit', fvalidator.handleSubmit);