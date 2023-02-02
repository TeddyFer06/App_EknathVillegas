import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrahAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const url = 'http://localhost:8080/examen/'
class App extends Component {

  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      id:'',
      email:'',
      mailPass:'',
      phone:'',
      countryPhone:'',
      tag:'',
      createdAt:'',
      active:'',
      tipoModal:''
    }
  }

  peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionPost= async()=>{
    delete this.state.form.id;
    await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionPut=()=>{
    axios.put(url+this.state.form.id, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
    
  }

  peticionDelete=()=>{
    axios.delete(url+this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  seleccionarExamen=(examen)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: examen.id,
        email: examen.email,
        mailPass: examen.mailPass,
        phone: examen.phone,
        countryPhone: examen.countryPhone,
        tag: examen.tag,
        createdAt: examen.createdAt,
        active: examen.active
      }
    })
  }

  handleChange= async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

    componentDidMount(){
      this.peticionGet()
    }
  



  render () {
    const {form}=this.state;
    return(
      <div className='App'>
        <br />
        <button className='btn btn-success' onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}> INSERTAR REGISTRO </button>
        <br /><br />
          <table className='table'>
            <thead>
              <tr>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>COUNTRY</th>
                <th>TAG</th>
                <th>createdAt</th>
                <th>ACTIVE</th>
              </tr>
            </thead>
            <tbody>
            {this.state.data.map(examen=>{
              return(
                <tr>
                <td>{examen.id}</td>
                <td>{examen.email}</td>
                <td>{examen.phone}</td>
                <td>{examen.countryPhone}</td>
                <td>{examen.tag}</td>
                <td>{examen.createdAt}</td>
                <td>{examen.active} </td>
                <td>
                  <button className='btn btn-primary' onClick={()=>{this.seleccionarExamen(examen); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"    "}
                  <button className='btn btn-danger' onClick={()=>{this.seleccionarExamen(examen); this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
                </tr>
              )
            })}
            </tbody>
          </table>


          <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className='form-group'>
                    
                    <label htmlFor='email'>Email</label>
                    <input className='form-control' type='text' name='email' id='email' onChange={(this.handleChange)} value={form?form.email: ''}/>
                    <br />
                    <label htmlFor='mailPass'>Password</label>
                    <input className='form-control' type='text' name='mailPass' id='mailPass' onChange={(this.handleChange)} value={form?form.mailPass: ''}/>
                    <br />
                    <label htmlFor='phone'>Phone</label>
                    <input className='form-control' type='text' name='phone' id='phone' onChange={(this.handleChange)} value={form?form.phone: ''}/>
                    <br />
                    <label htmlFor='countryPhone'>Country</label>
                    <input className='form-control' type='text' name='countryPhone' id='countryPhone' onChange={(this.handleChange)} value={form?form.countryPhone: ''}/>
                    <br />
                    <label htmlFor='tag'>TAG</label>
                    <input className='form-control' type='tag' name='tag' id='countryPhone' onChange={(this.handleChange)} value={form?form.tag: ''}/>
                    <br />
                    <label htmlFor='createdAt'>createdAt</label>
                    <input className='form-control' type='tag' name='createdAt' id='createdAt' onChange={(this.handleChange)} value={form?form.createdAt: ''}/>
                    <br />
                    <label htmlFor='active'>Active</label>
                    <input className='form-control' type='checkbox' checked={true}  name='active' id='active' onChange={(this.handleChange)} value={form?form.active:''}/>
                    <br />
                    
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                  <button className='btn btn-success' onClick={()=>this.peticionPost()}>
                    Agregar
                    </button>:
                  <button className='btn btn-primary' onClick={()=>this.peticionPut()}>
                    Actualizar
                    </button>
                  }

                  <button className='btn btn-danger' onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
              Estas seguro de eliminar el Siguiente Registro: {form && form.email}
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-danger' onClick={()=>this.peticionDelete()}>SI</button>
              <button className='btn btn-secundary' onClick={()=>this.setState({modalEliminar:false})}>NO</button>
            </ModalFooter>
          </Modal>
      </div>
    );
  }
}

export default App;