import {validateEmptyAndEmail, validateEmptyAndLength3} from "../validators"

describe("validators utils", () => {
  it("Validando se o campo está vazio",() =>{
    expect(validateEmptyAndLength3()).toBe("*Este campo é obrigatório.")
  })

  it("Validando a quantidade de caracteres",() =>{
    expect(validateEmptyAndLength3("di")).toBe("*Este campo precisa no mínimo 3 caracteres.")
  })

  it("Sem erros na validação",() =>{
    expect(validateEmptyAndLength3("Diogo")).toBe(true)
  })

  it("Validando se o campo está vazio",() =>{
    expect(validateEmptyAndEmail()).toBe("*Este campo é obrigatório.")
  })

  it("Informando e-mail inválido",() =>{
    expect(validateEmptyAndEmail("diogo")).toBe("*Informe um e-mail válido.")
  })

  it("Informando e-mail inválido",() =>{
    expect(validateEmptyAndEmail("diogo@")).toBe("*Informe um e-mail válido.")
  })

  it("Informando e-mail inválido",() =>{
    expect(validateEmptyAndEmail("diogo@desdiogo")).toBe("*Informe um e-mail válido.")
  })

  it("Sem erros na validação",() =>{
    expect(validateEmptyAndEmail("diogo@desdiogo.com")).toBe(true)
  })
})
