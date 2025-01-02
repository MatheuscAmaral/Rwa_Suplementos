export const formatCep = (cep: string) => {
  return String(cep).replace(/(\d{5})(\d{3})/, "$1-$2");
}