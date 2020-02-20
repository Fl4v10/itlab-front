import { apiFactory } from "../factories/apiFactory";
import { IProductApi, ProductViewModel } from "../repositories/productApi";

export default class ProductService {
	constructor(private api: IProductApi = apiFactory()) {}

	public async saveProduct(model: ProductViewModel) {
		if (model && model.id) {
			await this.api.updateProduct(model.id, model);
		} else if (model) {
			await this.api.saveProduct(model);
		}
	}

	public async getProducts(term: string) {
		try {
			return await this.api.searchProducts(term);
		} catch (error) {
			// TODO: COLOCAR NUM ARQUIVO DE TRADUCAO
			alert("Erro ao recupertar lista de produtos!");
		}
	}

	public async getProduct(id: number) {
		try {
			return await this.api.getProduct(id);
		} catch (error) {
			alert("Erro ao recuerar produto selecionado!");
		}
	}

	public async deleteProduct(ids: number[]) {
		try {
			for (const id of ids) {
				await this.api.deleteProduct(id);
			}

			return;
		} catch (error) {
			alert("Erro ao remover o produto, tente novamente mais tarde!");
		}
	}
}
