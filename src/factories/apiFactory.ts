import { ProductApi, IProductApi } from "../repositories/productApi";
import { AbortableHttp } from "../utils/abortableHttp";

const apiUrl = "http://localhost:5000";

export const apiFactory = (signal?: AbortSignal): IProductApi =>
	new ProductApi(apiUrl, new AbortableHttp(signal)!);
