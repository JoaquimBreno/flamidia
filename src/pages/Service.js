const ApiService = {
    async get(endpoint) {
        try {
          const response = await fetch(`https://minha-api.com${endpoint}`)
          return await response.json()
        } catch (error) {
          console.error(error)
        }
    }
}

export default ApiService;