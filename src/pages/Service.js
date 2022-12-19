const ApiService = {
    async getMovie() {
        try {
          const response = await fetch(`https://flaapimidia.herokuapp.com/filme/`)
          return await response.json()
        } catch (error) {
          console.error(error)
        }
    }
}

export default ApiService;