import htmlAdmin from '../view/admin.html';
import axios from 'axios'
import ordenArray from './funAdmin/ordenarArr'
import "./cssAdmin/admin.css"

const Admin = (socket)=>{

    let initialValue = {
        numCarrera: 0,
        nombre: '',
        puntaje: 0
    }
    let dataCpy = {}
    // let dataNow
       
    const divElement = document.createElement('div')
    divElement.innerHTML = htmlAdmin;

    const forName = divElement.querySelector('#btnClickSend')
    // const clickUpdate = divElement.querySelector('#btnClickUpdate')
    const valueName = divElement.querySelector('#name')
    const valueNumber =  divElement.querySelector('#number')
    const lstData = divElement.querySelector('#viewTable')
    // const valueCarrera = divElement.querySelector('#numCarrera') 


    //Event button edit 
    lstData.addEventListener('click', async(e)=>{

        if(e.target.innerHTML === 'EDITAR' ){
         try {
            const resp = await axios.get(`/update/${e.path[0].id}`);
            dataCpy = JSON.parse( JSON.stringify( resp.data ) );
            valueName.value =  dataCpy.nombre
            valueNumber.value = dataCpy.puntaje
            // valueCarrera.value = dataCpy.numCarrera
        } catch (err) {
            
            console.error(err);
        }
        }if(e.target.innerHTML === 'ELIMINAR'){

        }
        
    })

// Even listener inputs
    // valueCarrera.addEventListener('input', (e)=>{
    //     initialValue.numCarrera = e.target.value;
    // })
    valueNumber.addEventListener('input', (e)=>{
        initialValue.puntaje = e.target.value;
    })
    valueName.addEventListener('input', (e)=>{
        initialValue.nombre = e.target.value;
    })


// send Data
forName.addEventListener('click', async(e)=>{
    //   update data
        if(dataCpy._id){
            dataCpy.puntaje = parseInt(valueNumber.value)
            axios.put(`/${dataCpy._id}`, {
                numCarrera: dataCpy.numCarrera,
                nombre: dataCpy.nombre,
                puntaje: dataCpy.puntaje
            })
            .then(res =>
                {
                    socket.emit('message', dataCpy )
                    valueNumber.value = 0
                    valueName.value = ''
                    return console.log('exito')
                })
            .catch(err => console.log(err))
            lstData.innerHTML=''
            sendGetRequest()
            
            dataCpy = {
                nombre:'',
                puntaje: 0,
                _id: ''
            }
        }
        // create Data
        else{
            initialValue.puntaje = parseInt(initialValue.puntaje)
            try {
                const resp = await  axios.post('/postData', initialValue);

            } catch (err) {
                
                console.error(err);
            }
            lstData.innerHTML=''
            sendGetRequest()
        }
    });


    const sendGetRequest = async () => {
        let dataNowUp = {}
        try {
            const resp = await axios.get('/getData');
            dataNowUp = JSON.parse( JSON.stringify( resp.data ) );
            viewLst(dataNowUp)
        } catch (err) {
            console.error(err);
        }
    };
    sendGetRequest()

    function viewLst (res){
    
        ordenArray(res)

       return  res.map((dt, index)=>{
            
            return lstData.innerHTML += `
            <tr>
                <th scope="row">${index}</th>
                <td>${dt.nombre}</td>
                <td>${dt.puntaje}</td>
                <td><button id="${dt._id}"  style=color:blue; >EDITAR</button></td>
            </tr>
            `
        })
    }

    return divElement;
} 
export default Admin;