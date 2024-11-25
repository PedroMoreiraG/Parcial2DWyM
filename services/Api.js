const Api_url = 'http://10.0.2.2:8000/destinations';

export const getDestinations = async () => {
    try  {
        const response = await fetch (Api_url);
        if (!response.ok) {
            throw new Error('Error al obtener los destinos');
        }
        return await response.json();
    } catch(error) {
        console.error("Error: ", error);
        throw error;
    }

};

export const addDestination = async (destination) => {
    try {
        const response = await fetch (Api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(destination),
        });
        if (!response.ok){
            throw new Error('Error al agregar destino');
        }
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};

export const deleteDestination = async (id) => {
    try {
      const response = await fetch(`${Api_url}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el destino');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const editDestination = async (id, updatedDestination) => {
    try {
      const response = await fetch(`${Api_url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDestination),
      });
      if (!response.ok) {
        throw new Error('Error al editar el destino');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  
