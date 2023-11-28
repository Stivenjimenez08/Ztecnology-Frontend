import React, {useEffect, useState} from 'react'
import { Dialog, DialogActions, DialogTitle,Button } from "@mui/material"
import axios from 'axios';
import Swal from 'sweetalert2'

const DeleteCustomer = ({ idDelete , load , setLoad }) =>{
    
    const [open, setOpen] =  useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDetele =async() => {
        const response = await axios.delete(`${import.meta.env.VITE_URL_SERVER}api/Customer/deleteCustomer/${idDelete}`)
        setLoad(!load)
        setOpen(false)

        Swal.fire({
            tittle: "Info",
            text: response.data.msg,
            icon: "success"
        })
    }

    useEffect(()=>{
        setOpen(idDelete ? true : false)
    },[idDelete])

    return(
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"¿Está seguro de eliminar este Cliente?"}
            </DialogTitle>
            <DialogActions>
                <Button type='submit' variant='contained' color='error' onClick={handleDetele}>
                    Eliminar
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteCustomer