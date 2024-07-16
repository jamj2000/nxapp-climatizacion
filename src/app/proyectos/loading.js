import React from "react";
import Tarjeta from "@/components/tarjetas/contenedor";
import Skeeleton from "@/components/skeletons/proyectoSkeeleton";


function loading() {
  return (
    <Tarjeta>
      <Skeeleton />
    </Tarjeta>
  );
}

export default loading;
