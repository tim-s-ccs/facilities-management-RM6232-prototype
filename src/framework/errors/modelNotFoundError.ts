class ModelNotFoundError extends Error {
  constructor(id: number, tableName: string) {
    super(`A model of type ${tableName} could not be found with the ID ${id}`)

    this.name = 'ModelNotFoundError'
  }
}

export default ModelNotFoundError