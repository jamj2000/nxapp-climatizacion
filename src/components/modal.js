'use client'
import { useRef } from 'react'
// https://medium.com/@bomber.marek/how-to-use-dialog-in-react-easy-modals-tooltips-81e44d570c8a



const Modal = ({ children, icon, text, className }) => {
    const dialogRef = useRef(null);


    const openDialog = () => {
        if (dialogRef.current) dialogRef.current.showModal();
    };

    const closeDialog = () => {
        if (dialogRef.current) dialogRef.current.close();
    };


    const handleClickOutside = () => {
        if (dialogRef.current)
            dialogRef.current.addEventListener('click', function (event) {
                var rect = dialogRef.current.getBoundingClientRect();
                var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                    rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
                if (!isInDialog) {
                    dialogRef.current.close();
                }
            })
    }
    //  fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
    return (
        <>
            <div onClick={openDialog} className={className}>
                {icon} {text}
            </div>


            <dialog ref={dialogRef} id='modal' onClick={handleClickOutside}
                className={`backdrop:bg-black/50 backdrop:backdrop-blur-sm py-12 px-8 rounded-md
                       absolute top-10 mx-auto
                       w-[98%] md:w-[95%] lg:w-[90%] xl:w-[80%] 2xl:w-[70%]`}>

                {children}

                <div onClick={closeDialog} className="absolute top-4 right-4 cursor-pointer" >
                    ❌
                </div>
            </dialog>


        </>
    );
};

export default Modal;