export enum STATUS {
  IN_STORAGE = 'На складі',
  NOT_AVAILABLE = 'Немає',
  AVAILABLE = 'В наявності',
  EXPECTED = 'Очікуємо'
}

export interface ProductDTO {
  id: number,
  name: string,
  image: string[],
  previewImage: string,
  status: STATUS | string,
  price: number
  description?: string,
  oldPrice?: number;
  amount?: number;
  userAmount?: number;
}
